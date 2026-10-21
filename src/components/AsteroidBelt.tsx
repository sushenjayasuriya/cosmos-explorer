import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  paused: boolean;
  speed: number;
  reverse: boolean;
  quality: 'high' | 'eco';
}

/**
 * High-performance GPU-instanced Asteroid Belts:
 * 1. Main Asteroid Belt (Between Mars and Jupiter, r = 28 to 34)
 * 2. Trans-Neptunian Kuiper Belt (Beyond Neptune, r = 73 to 85)
 */
export const AsteroidBelt: React.FC<AsteroidBeltProps> = ({
  paused,
  speed,
  reverse,
  quality,
}) => {
  const mainBeltRef = useRef<THREE.Points>(null);
  const kuiperBeltRef = useRef<THREE.Points>(null);

  // Main Asteroid Belt particle geometry
  const mainBeltCount = quality === 'high' ? 1800 : 800;
  const mainBeltPositions = useMemo(() => {
    const pos = new Float32Array(mainBeltCount * 3);
    const colors = new Float32Array(mainBeltCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < mainBeltCount; i++) {
      // Golden ratio distribution within radial band 28.5 to 33.5
      const angle = (i * 2.39996) + Math.random() * 0.1;
      const radius = 28.5 + Math.pow(Math.random(), 0.7) * 5.0;
      const height = (Math.random() - 0.5) * 1.2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color variation between silicate grey, carbonaceous brown, and metallic tones
      const tint = 0.55 + Math.random() * 0.35;
      color.setRGB(tint * 0.95, tint * 0.9, tint * 0.82);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors };
  }, [mainBeltCount]);

  // Kuiper Belt particle geometry
  const kuiperCount = quality === 'high' ? 1200 : 500;
  const kuiperPositions = useMemo(() => {
    const pos = new Float32Array(kuiperCount * 3);
    const colors = new Float32Array(kuiperCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < kuiperCount; i++) {
      const angle = (i * 2.39996) + Math.random() * 0.15;
      const radius = 73.0 + Math.random() * 14.0;
      const height = (Math.random() - 0.5) * 3.2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Icy blue-grey tones for Kuiper belt objects
      const tint = 0.45 + Math.random() * 0.4;
      color.setRGB(tint * 0.85, tint * 0.95, tint * 1.05);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors };
  }, [kuiperCount]);

  // Orbital revolution of asteroid fields
  useFrame((_, delta) => {
    if (!paused) {
      const dir = reverse ? -1 : 1;
      if (mainBeltRef.current) {
        // Main belt Keplerian average speed factor
        mainBeltRef.current.rotation.y += delta * speed * dir * 0.022;
      }
      if (kuiperBeltRef.current) {
        // Kuiper belt slow orbital motion
        kuiperBeltRef.current.rotation.y += delta * speed * dir * 0.007;
      }
    }
  });

  return (
    <group>
      {/* Main Asteroid Belt (Mars - Jupiter) */}
      <points ref={mainBeltRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[mainBeltPositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[mainBeltPositions.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={quality === 'high' ? 0.22 : 0.28}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Outer Kuiper Belt (Beyond Neptune) */}
      <points ref={kuiperBeltRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[kuiperPositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[kuiperPositions.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={quality === 'high' ? 0.35 : 0.42}
          vertexColors
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};
