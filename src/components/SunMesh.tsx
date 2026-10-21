import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { SUN_DATA } from '../data/planets';

interface SunMeshProps {
  onSelect: (id: string) => void;
  isSelected: boolean;
  quality: 'high' | 'eco';
}

export const SunMesh: React.FC<SunMeshProps> = ({ onSelect, isSelected, quality }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerCoronaRef = useRef<THREE.Mesh>(null);
  const outerCoronaRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(SUN_DATA.texturePath);

  // Smooth rotation and organic solar breathing
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04;
    }
    const t = state.clock.elapsedTime;
    if (innerCoronaRef.current) {
      const s = 1 + Math.sin(t * 1.8) * 0.02;
      innerCoronaRef.current.scale.set(s, s, s);
    }
    if (outerCoronaRef.current) {
      const s = 1 + Math.cos(t * 1.2) * 0.03;
      outerCoronaRef.current.scale.set(s, s, s);
      outerCoronaRef.current.rotation.z += delta * 0.015;
    }
  });

  const segments = quality === 'high' ? 64 : 32;

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Solar Light - Warm omnidirectional illumination */}
      <pointLight
        position={[0, 0, 0]}
        intensity={quality === 'high' ? 95 : 75}
        distance={160}
        decay={1.15}
        color="#fff6e8"
      />

      {/* Sun Photosphere Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect('sun');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[SUN_DATA.visualRadius, segments, segments]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Transparent Inner Solar Corona Glow */}
      <mesh ref={innerCoronaRef}>
        <sphereGeometry args={[SUN_DATA.visualRadius * 1.045, 32, 32]} />
        <meshBasicMaterial
          color="#ffb833"
          transparent
          opacity={0.22}
          blending={2} // THREE.AdditiveBlending
          depthWrite={false}
        />
      </mesh>

      {/* Soft Outer Golden Corona Halo */}
      <mesh ref={outerCoronaRef}>
        <sphereGeometry args={[SUN_DATA.visualRadius * 1.12, 32, 32]} />
        <meshBasicMaterial
          color="#ff8811"
          transparent
          opacity={0.075}
          blending={2} // THREE.AdditiveBlending
          depthWrite={false}
        />
      </mesh>
      {/* Outer subtle selection indicator glow when Sun is selected */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[SUN_DATA.visualRadius * 1.08, 32, 32]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
};
