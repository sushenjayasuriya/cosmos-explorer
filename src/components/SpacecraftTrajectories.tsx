import React, { useMemo } from 'react';
import * as THREE from 'three';

interface SpacecraftTrajectoriesProps {
  visible: boolean;
}

interface TrajectoryData {
  id: string;
  name: string;
  color: string;
  points: THREE.Vector3[];
}

export const SpacecraftTrajectories: React.FC<SpacecraftTrajectoriesProps> = ({ visible }) => {
  if (!visible) return null;

  // Real-inspired trajectory paths calibrated to COSMOS visual distances:
  // Earth (18.5), Mars (24.5), Jupiter (38.0), Saturn (48.0), Uranus (58.0), Neptune (68.0), Pluto (76.0)
  const trajectories = useMemo<TrajectoryData[]>(() => {
    // Voyager 1: Earth -> Jupiter -> Saturn -> Northward Ecliptic Exit (Interstellar)
    const v1Points: THREE.Vector3[] = [];
    const v1Spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(18.5, 0, 0),         // Earth launch
      new THREE.Vector3(26.0, 0.4, 18.0),    // Mid-course
      new THREE.Vector3(22.0, 1.2, 31.0),    // Jupiter flyby (gravity assist)
      new THREE.Vector3(0.0, 4.5, 48.0),     // Saturn flyby
      new THREE.Vector3(-25.0, 16.0, 60.0),  // Deflected ~35 deg north of ecliptic
      new THREE.Vector3(-55.0, 36.0, 78.0),  // Deep interstellar space
      new THREE.Vector3(-85.0, 58.0, 102.0)
    ]);
    v1Points.push(...v1Spline.getPoints(80));

    // Voyager 2: Earth -> Jupiter -> Saturn -> Uranus -> Neptune -> Southward Ecliptic Exit
    const v2Points: THREE.Vector3[] = [];
    const v2Spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(18.5, 0, 0),         // Earth launch
      new THREE.Vector3(30.0, -0.2, 23.0),   // Jupiter flyby
      new THREE.Vector3(15.0, -0.8, 45.0),   // Saturn flyby
      new THREE.Vector3(-22.0, -2.5, 53.0),  // Uranus flyby
      new THREE.Vector3(-48.0, -8.0, 48.0),  // Neptune flyby
      new THREE.Vector3(-82.0, -26.0, 38.0), // Deflected south of ecliptic into interstellar space
      new THREE.Vector3(-110.0, -42.0, 26.0)
    ]);
    v2Points.push(...v2Spline.getPoints(90));

    // New Horizons: Earth -> Jupiter -> Pluto & Kuiper Belt
    const nhPoints: THREE.Vector3[] = [];
    const nhSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(18.5, 0, 0),         // Earth launch (fastest launch speed)
      new THREE.Vector3(12.0, 0.6, 36.0),    // Jupiter gravity boost
      new THREE.Vector3(-18.0, 1.8, 54.0),   // Cruise
      new THREE.Vector3(-46.0, 3.2, 60.0),   // Pluto flyby (July 2015)
      new THREE.Vector3(-72.0, 4.5, 68.0),   // Planetesimal Arrokoth (Jan 2019)
      new THREE.Vector3(-102.0, 6.0, 78.0)   // Outer Kuiper Belt
    ]);
    nhPoints.push(...nhSpline.getPoints(80));

    return [
      { id: 'v1', name: 'Voyager 1 (Interstellar)', color: '#38bdf8', points: v1Points },
      { id: 'v2', name: 'Voyager 2 (Grand Tour)', color: '#34d399', points: v2Points },
      { id: 'nh', name: 'New Horizons (Pluto)', color: '#fbbf24', points: nhPoints }
    ];
  }, []);

  return (
    <group>
      {trajectories.map((traj) => {
        const lineGeo = new THREE.BufferGeometry().setFromPoints(traj.points);
        return (
          <group key={traj.id}>
            {/* Trajectory Tube/Line */}
            <primitive object={new THREE.Line(lineGeo, new THREE.LineDashedMaterial({
              color: traj.color,
              dashSize: 1.5,
              gapSize: 0.8,
              linewidth: 2,
              transparent: true,
              opacity: 0.65,
              depthWrite: false
            }))} onUpdate={(line: THREE.Line) => line.computeLineDistances()} />

            {/* Glowing trajectory start beacon at Earth */}
            <mesh position={traj.points[0]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshBasicMaterial color={traj.color} />
            </mesh>

            {/* Trajectory exit tip */}
            <mesh position={traj.points[traj.points.length - 1]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial color={traj.color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
