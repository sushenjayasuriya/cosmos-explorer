import React, { useMemo } from 'react';
import * as THREE from 'three';

interface OrbitLineProps {
  distance: number;
  isSelected: boolean;
  color?: string;
  visible: boolean;
}

export const OrbitLine: React.FC<OrbitLineProps> = ({
  distance,
  isSelected,
  color = '#38bdf8',
  visible,
}) => {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * distance, 0, Math.sin(theta) * distance));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [distance]);

  if (!visible) return null;

  return (
    <lineLoop geometry={lineGeometry}>
      <lineBasicMaterial
        color={isSelected ? '#38bdf8' : color}
        transparent
        opacity={isSelected ? 0.65 : 0.22}
        linewidth={1}
      />
    </lineLoop>
  );
};
