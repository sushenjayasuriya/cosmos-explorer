import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type CelestialBody } from '../data/planets';
import { getSafeTexture } from '../utils/safeTexture';

interface MoonMeshProps {
  moon: CelestialBody;
  index: number;
  parentWorldPosition: THREE.Vector3;
  isSelected: boolean;
  onSelect: (id: string) => void;
  paused: boolean;
  speed: number;
  reverse: boolean;
  quality: 'high' | 'eco';
  onUpdatePosition: (id: string, pos: THREE.Vector3) => void;
  showOrbits: boolean;
}

export const MoonMesh: React.FC<MoonMeshProps> = ({
  moon,
  index,
  parentWorldPosition,
  isSelected,
  onSelect,
  paused,
  speed,
  reverse,
  quality,
  onUpdatePosition,
  showOrbits,
}) => {
  const moonGroupRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => getSafeTexture(moon.texturePath, moon.color), [moon.texturePath, moon.color]);

  // Stagger initial orbital angle around parent planet
  const initialAngle = useMemo(() => {
    return (index * 1.57 + 0.8) % (Math.PI * 2);
  }, [index]);

  const currentAngleRef = useRef(initialAngle);

  // Orbit speed factor around parent planet
  const orbitalSpeedFactor = useMemo(() => {
    return 0.45 / Math.sqrt(moon.visualDistance);
  }, [moon.visualDistance]);

  const segments = quality === 'high' ? 32 : 20;
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  // Subtle circular orbit trail around parent
  const orbitGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segs = 64;
    for (let i = 0; i <= segs; i++) {
      const theta = (i / segs) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * moon.visualDistance, 0, Math.sin(theta) * moon.visualDistance));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [moon.visualDistance]);

  useFrame((_, delta) => {
    if (!paused) {
      const dir = reverse ? -1 : 1;
      currentAngleRef.current += delta * speed * dir * orbitalSpeedFactor;
    }

    const relX = Math.cos(currentAngleRef.current) * moon.visualDistance;
    const relZ = Math.sin(currentAngleRef.current) * moon.visualDistance;

    if (moonGroupRef.current) {
      // Anchored to parent planet's live position
      moonGroupRef.current.position.set(
        parentWorldPosition.x + relX,
        parentWorldPosition.y,
        parentWorldPosition.z + relZ
      );

      moonGroupRef.current.getWorldPosition(tempPos);
      onUpdatePosition(moon.id, tempPos);
    }

    // Synchronous / axial rotation
    if (!paused && moonMeshRef.current) {
      moonMeshRef.current.rotation.y += delta * speed * 0.3;
    }
  });

  return (
    <>
      {/* Subtle Moon Orbit Path around parent */}
      {showOrbits && (
        <group position={[parentWorldPosition.x, parentWorldPosition.y, parentWorldPosition.z]}>
          <lineLoop geometry={orbitGeometry}>
            <lineBasicMaterial
              color={isSelected ? '#38bdf8' : moon.color}
              transparent
              opacity={isSelected ? 0.45 : 0.12}
            />
          </lineLoop>
        </group>
      )}

      {/* Moon Body Anchor Group */}
      <group ref={moonGroupRef}>
        <mesh
          ref={moonMeshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(moon.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[moon.visualRadius, segments, segments]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Ethereal selection rim glow */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[moon.visualRadius * 1.12, 24, 24]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.22}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>
    </>
  );
};
