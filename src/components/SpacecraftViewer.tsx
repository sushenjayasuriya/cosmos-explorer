import { useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { RotateCw, Maximize, Minimize, Info, Compass } from 'lucide-react';
import { type SpacecraftModelConfig, type SpacecraftComponent } from '../data/missions';

interface SpacecraftViewerProps {
  config: SpacecraftModelConfig;
  missionName: string;
}

// Procedural high-fidelity model for Voyager
function VoyagerModel() {
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f59e0b', metalness: 0.95, roughness: 0.2 }), []);
  const whiteDishMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.35, metalness: 0.1 }), []);
  const metallicMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.8, roughness: 0.3 }), []);
  const darkBusMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.6 }), []);
  const rtgMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.7, roughness: 0.4 }), []);

  return (
    <group>
      {/* Central Equipment Bus */}
      <mesh material={darkBusMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 10]} />
      </mesh>

      {/* 3.7m High-Gain Cassegrain Antenna Dish */}
      <group position={[0, 0.75, 0]} rotation={[0, 0, 0]}>
        <mesh material={whiteDishMaterial}>
          <cylinderGeometry args={[1.8, 0.4, 0.45, 48, 1, true]} />
        </mesh>
        {/* Antenna Feed Horn / Sub-reflector Tripod */}
        <mesh position={[0, 0.5, 0]} material={metallicMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        </mesh>
        <mesh position={[0, 0.8, 0]} material={metallicMaterial}>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
      </group>

      {/* Golden Record on the side */}
      <group position={[0.72, -0.1, 0.35]} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <mesh material={goldMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.02, 32]} />
        </mesh>
      </group>

      {/* RTG Power Boom */}
      <group position={[-1.3, -0.2, 0]}>
        <mesh material={metallicMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
        </mesh>
        {/* 3 RTG Canisters */}
        <mesh material={rtgMaterial} position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.7, 16]} />
        </mesh>
      </group>

      {/* Magnetometer Boom */}
      <group position={[0, -0.1, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={metallicMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 2.0, 8]} />
        </mesh>
        {/* Dual Magnetometer Sensors */}
        <mesh position={[0, 0.9, 0]} material={goldMaterial}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
        </mesh>
      </group>
    </group>
  );
}

// Procedural high-fidelity model for Cassini
function CassiniModel() {
  const goldFoilMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d97706', metalness: 0.85, roughness: 0.35 }), []);
  const whiteDishMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f1f5f9', roughness: 0.3, metalness: 0.1 }), []);
  const metallicMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.75, roughness: 0.3 }), []);
  const engineMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e293b', metalness: 0.9, roughness: 0.4 }), []);

  return (
    <group>
      {/* Main Bus (Tall cylindrical-conic spacecraft body wrapped in golden MLI foil) */}
      <mesh material={goldFoilMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.85, 2.1, 24]} />
      </mesh>

      {/* 4-meter High-Gain Antenna Dish */}
      <group position={[0, 1.15, 0]}>
        <mesh material={whiteDishMaterial}>
          <cylinderGeometry args={[1.9, 0.35, 0.5, 48, 1, true]} />
        </mesh>
        <mesh position={[0, 0.55, 0]} material={metallicMaterial}>
          <cylinderGeometry args={[0.06, 0.06, 0.7, 12]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={metallicMaterial}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>
      </group>

      {/* Huygens Titan Probe (Attached to port side) */}
      <group position={[0.95, 0.1, 0.3]} rotation={[0, 0, Math.PI / 3]}>
        {/* Heat shield saucer shape */}
        <mesh material={goldFoilMaterial}>
          <coneGeometry args={[0.65, 0.35, 32]} />
        </mesh>
      </group>

      {/* 11m Magnetometer Boom */}
      <group position={[-1.1, 0.3, -0.4]} rotation={[0, 0, Math.PI / 2.5]}>
        <mesh material={metallicMaterial}>
          <cylinderGeometry args={[0.035, 0.035, 1.8, 8]} />
        </mesh>
      </group>

      {/* Main Rocket Engine Bell (Bottom) */}
      <group position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
        <mesh material={engineMaterial}>
          <cylinderGeometry args={[0.4, 0.15, 0.5, 24]} />
        </mesh>
      </group>
    </group>
  );
}

// Procedural high-fidelity model for JWST
function JWSTModel() {
  const goldMirrorMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fbbf24', metalness: 0.98, roughness: 0.12 }), []);
  const sunshieldMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 0.65, roughness: 0.45, side: THREE.DoubleSide }), []);
  const blackStrutMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.8 }), []);
  const solarPanelMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1d4ed8', metalness: 0.8, roughness: 0.2 }), []);

  // Compute hexagonal mirror segment coordinates (18 hexagons)
  const hexPositions: [number, number][] = useMemo(() => {
    const list: [number, number][] = [];
    const r = 0.26;
    const dx = r * Math.sqrt(3);

    // Ring 1 (6 hexes)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      list.push([Math.cos(angle) * dx, Math.sin(angle) * dx]);
    }
    // Ring 2 (12 hexes)
    for (let i = 0; i < 6; i++) {
      const angle1 = (i * Math.PI) / 3;
      list.push([Math.cos(angle1) * (2 * dx), Math.sin(angle1) * (2 * dx)]);
      const angle2 = ((i + 0.5) * Math.PI) / 3;
      list.push([Math.cos(angle2) * (Math.sqrt(3) * dx), Math.sin(angle2) * (Math.sqrt(3) * dx)]);
    }
    return list;
  }, []);

  return (
    <group>
      {/* 5-Layer Tennis Court-Sized Sunshield (Kite/Diamond membrane) */}
      <group position={[0, -0.5, 0]} rotation={[-Math.PI / 14, 0, 0]}>
        {[-0.08, -0.04, 0, 0.04, 0.08].map((layerY, idx) => (
          <mesh key={idx} material={sunshieldMaterial} position={[0, layerY, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.2, 2.2, 1, 1]} />
          </mesh>
        ))}
      </group>

      {/* 18 Segmented Primary Hexagonal Mirrors */}
      <group position={[0, 0.4, 0.15]} rotation={[-Math.PI / 14, 0, 0]}>
        {hexPositions.map(([hx, hy], idx) => (
          <mesh key={idx} material={goldMirrorMaterial} position={[hx, hy, 0]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.24, 0.24, 0.03, 6]} />
          </mesh>
        ))}

        {/* Secondary Mirror Tripod Boom */}
        <mesh position={[0, 0.5, 1.2]} rotation={[0, 0, 0]} material={blackStrutMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
        </mesh>
        <mesh position={[0, 0.5, 1.8]} material={goldMirrorMaterial}>
          <cylinderGeometry args={[0.16, 0.16, 0.03, 24]} />
        </mesh>
      </group>

      {/* Spacecraft Bus & Solar Wing underneath */}
      <group position={[0, -0.9, -0.4]}>
        <mesh material={blackStrutMaterial}>
          <boxGeometry args={[0.7, 0.5, 0.8]} />
        </mesh>
        {/* Deployed Solar Array Panel */}
        <mesh material={solarPanelMaterial} position={[0, -0.4, -0.5]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.4, 0.03, 0.6]} />
        </mesh>
      </group>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-6, -4, -5]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#fbbf24" />
    </>
  );
}

export const SpacecraftViewer: React.FC<SpacecraftViewerProps> = ({ config, missionName }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState<'high' | 'eco'>('high');
  const [selectedComponent, setSelectedComponent] = useState<SpacecraftComponent | null>(
    config.components[0] || null
  );
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden glass-panel border border-white/10 ${
        isFullscreen ? 'h-screen w-screen fixed inset-0 z-50 rounded-none' : 'h-[460px] sm:h-[540px]'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [2.8, 1.8, 3.2], fov: 45, near: 0.1, far: 100 }}
        dpr={quality === 'high' ? [1, 2] : 1}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full bg-gradient-to-b from-slate-950 via-[#030712] to-slate-950"
      >
        <SceneLights />

        {/* Spacecraft Procedural 3D Model */}
        {config.modelType === 'voyager' && <VoyagerModel />}
        {config.modelType === 'cassini' && <CassiniModel />}
        {config.modelType === 'jwst' && <JWSTModel />}

        {/* 3D Component Annotation Pins */}
        {config.components.map((c, i) => {
          const isSelected = selectedComponent?.name === c.name;
          return (
            <group key={i} position={c.position}>
              <Html center distanceFactor={8}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent(c);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-lg ${
                    isSelected
                      ? 'bg-sky-500 text-white font-bold border border-white shadow-sky-500/50 scale-110'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-sky-400/40 hover:border-sky-400 hover:scale-105'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>{c.name}</span>
                </button>
              </Html>
            </group>
          );
        })}

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minDistance={1.2}
          maxDistance={8}
        />
      </Canvas>

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1 rounded-xl glass-panel border border-sky-400/30 text-xs font-mono text-sky-300 flex items-center gap-2">
          <Compass size={13} className="text-sky-400" />
          <span className="font-semibold uppercase">{missionName} 3D Spacecraft Explorer</span>
        </div>
      </div>

      {/* Top Right Control Actions */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setAutoRotate((a) => !a)}
          className={`p-2 rounded-xl text-xs font-mono border transition-all ${
            autoRotate
              ? 'bg-sky-500/25 border-sky-400 text-sky-300'
              : 'border-white/10 glass-button text-slate-400 hover:text-white'
          }`}
          title={autoRotate ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
        >
          <RotateCw size={14} className={autoRotate ? 'animate-spin-slow' : ''} />
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl text-xs font-mono border border-white/10 glass-button text-slate-400 hover:text-white"
          title="Reset Camera View"
        >
          <Compass size={14} />
        </button>

        <button
          onClick={() => setQuality((q) => (q === 'high' ? 'eco' : 'high'))}
          className="px-2.5 py-1.5 rounded-xl text-[10px] font-mono border border-white/10 glass-button text-slate-400 hover:text-white"
          title="Toggle Rendering Quality"
        >
          {quality === 'high' ? 'HIGH' : 'ECO'}
        </button>

        <button
          onClick={handleToggleFullscreen}
          className="p-2 rounded-xl text-xs font-mono border border-white/10 glass-button text-slate-400 hover:text-white"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </button>
      </div>

      {/* Bottom Component Details Card */}
      {selectedComponent && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="p-4 rounded-xl glass-panel border border-sky-400/40 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                Key Subsystem Specification
              </span>
              <Info size={13} className="text-sky-400" />
            </div>
            <h4 className="font-space font-bold text-sm text-white">{selectedComponent.name}</h4>
            <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
              {selectedComponent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
