import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type CelestialBody } from '../data/planets';
import { getSafeTexture } from '../utils/safeTexture';

interface PlanetMeshProps {
  planet: CelestialBody;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  paused: boolean;
  speed: number;
  reverse: boolean;
  quality: 'high' | 'eco';
  onUpdatePosition: (id: string, pos: THREE.Vector3) => void;
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  planet,
  index,
  isSelected,
  onSelect,
  paused,
  speed,
  reverse,
  quality,
  onUpdatePosition,
}) => {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const tiltGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);

  // Primary surface texture (cached, resilient, graceful canvas fallback)
  const texture = useMemo(() => {
    return getSafeTexture(planet.texturePath, planet.color);
  }, [planet.texturePath, planet.color]);
  
  // Earth clouds texture (only loaded when cloudsPath is present)
  const cloudsTexture = useMemo(() => {
    return planet.cloudsPath ? getSafeTexture(planet.cloudsPath, '#ffffff', true) : null;
  }, [planet.cloudsPath]);

  // Earth night lights texture (only loaded when nightMapPath is present)
  const nightTexture = useMemo(() => {
    return planet.nightMapPath ? getSafeTexture(planet.nightMapPath, '#000000', true) : null;
  }, [planet.nightMapPath]);

  // Saturn rings texture (only loaded when ring is present)
  const ringTexture = useMemo(() => {
    return planet.ring ? getSafeTexture(planet.ring.texturePath, '#d6b885', true) : null;
  }, [planet.ring]);

  // Initial orbital angle staggered by golden ratio angle
  const initialAngle = useMemo(() => {
    return (index * 2.39996) % (Math.PI * 2);
  }, [index]);

  const currentAngleRef = useRef(initialAngle);

  // Axial tilt in radians
  const axialTiltRad = useMemo(() => {
    return THREE.MathUtils.degToRad(planet.axialTiltDeg);
  }, [planet.axialTiltDeg]);

  // Orbit speed factor derived from Kepler's 3rd Law approximation
  const orbitalSpeedFactor = useMemo(() => {
    return 0.12 / Math.sqrt(planet.visualDistance);
  }, [planet.visualDistance]);

  // Self rotation speed
  const spinSpeedFactor = useMemo(() => {
    const base = 0.25;
    return planet.rotationPeriodVisual < 0 ? -base : base;
  }, [planet.rotationPeriodVisual]);

  // Geometry segments
  const segments = quality === 'high' ? 48 : 28;
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!paused) {
      const direction = reverse ? -1 : 1;
      currentAngleRef.current += delta * speed * direction * orbitalSpeedFactor;
    }

    const x = Math.cos(currentAngleRef.current) * planet.visualDistance;
    const z = Math.sin(currentAngleRef.current) * planet.visualDistance;

    if (tiltGroupRef.current) {
      tiltGroupRef.current.position.set(x, 0, z);

      // Report live world position for smooth camera tracking
      tiltGroupRef.current.getWorldPosition(tempPos);
      onUpdatePosition(planet.id, tempPos);
    }

    // Self-spin on tilted axis
    if (!paused && planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * speed * spinSpeedFactor;
    }

    // Earth cloud layer differential rotation
    if (!paused && cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y += delta * speed * (spinSpeedFactor * 1.15);
    }
  });

  return (
    <group ref={orbitGroupRef}>
      {/* Tilted Anchor Group at the orbital position */}
      <group ref={tiltGroupRef} rotation={[0, 0, axialTiltRad]}>
        {/* Planet Sphere Mesh */}
        <mesh
          ref={planetMeshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(planet.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[planet.visualRadius, segments, segments]} />
          <meshStandardMaterial
            map={texture}
            roughness={planet.id === 'earth' ? 0.65 : 0.72}
            metalness={0.08}
            emissiveMap={planet.id === 'earth' && quality === 'high' ? nightTexture : undefined}
            emissive={planet.id === 'earth' && quality === 'high' ? '#ffdfa0' : '#000000'}
            emissiveIntensity={planet.id === 'earth' && quality === 'high' ? 0.55 : 0}
          />
        </mesh>

        {/* Earth Clouds Layer */}
        {planet.cloudsPath && quality === 'high' && (
          <mesh ref={cloudsMeshRef}>
            <sphereGeometry args={[planet.visualRadius * 1.018, segments, segments]} />
            <meshStandardMaterial
              map={cloudsTexture}
              transparent
              opacity={0.42}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Earth Realistic Atmospheric Rim Glow */}
        {planet.id === 'earth' && (
          <mesh>
            <sphereGeometry args={[planet.visualRadius * 1.028, segments, segments]} />
            <meshBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.16}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Saturn's Rings (Refined transparency & anti-aliasing) */}
        {planet.ring && (
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(planet.id);
            }}
          >
            <ringGeometry
              args={[planet.ring.innerRadius, planet.ring.outerRadius, quality === 'high' ? 96 : 48]}
            />
            <meshStandardMaterial
              map={ringTexture}
              side={THREE.DoubleSide}
              transparent
              opacity={0.94}
              roughness={0.6}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Ethereal Silhouette Rim Glow (Outer BackSide shell, never intersects surface) */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[planet.visualRadius * 1.06, 32, 32]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.18}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};
