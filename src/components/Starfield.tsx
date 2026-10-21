import React, { useMemo } from 'react';
import * as THREE from 'three';

interface StarfieldProps {
  quality: 'high' | 'eco';
}

export const Starfield: React.FC<StarfieldProps> = ({ quality }) => {
  const count = quality === 'high' ? 3600 : 1600;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Realistic stellar spectrum colors (BV index approximations)
    const starPalette = [
      new THREE.Color('#9bb0ff'), // O/B Deep blue-white
      new THREE.Color('#bbccff'), // A White-blue
      new THREE.Color('#f8f9ff'), // F Pure white
      new THREE.Color('#fff4e8'), // G Solar yellow
      new THREE.Color('#ffd2a1'), // K Orange giant
      new THREE.Color('#ffb56c'), // M Red dwarf
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars on a large sphere surrounding the solar system
      const radius = THREE.MathUtils.randFloat(180, 420);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = starPalette[Math.floor(Math.random() * starPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.6}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation={false}
      />
    </points>
  );
};
