import React, { useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { 
  PLANETS_DATA, 
  MOONS_DATA, 
  ALL_CELESTIAL_BODIES, 
  getInitialBodyPositions 
} from '../data/planets';
import { SunMesh } from './SunMesh';
import { PlanetMesh } from './PlanetMesh';
import { MoonMesh } from './MoonMesh';
import { OrbitLine } from './OrbitLine';
import { Starfield } from './Starfield';
import { CameraRig } from './CameraRig';
import { ErrorBoundary } from './ErrorBoundary';

interface SolarSystemProps {
  selectedId: string;
  onSelect: (id: string) => void;
  paused: boolean;
  speed: number;
  reverse: boolean;
  showOrbits: boolean;
  quality: 'high' | 'eco';
  isOverview: boolean;
  showHero: boolean;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl glass-panel text-white">
        <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-space text-xs tracking-widest text-sky-300 uppercase">Loading Astronomical Models...</p>
      </div>
    </Html>
  );
}

/**
 * Screen-space selection tracker running synchronously inside the WebGL render loop.
 * Updates DOM label coordinates without subpixel phase lag or 60Hz React re-renders.
 */
function ScreenSpaceLabelTracker({
  selectedId,
  isOverview,
  bodyPositionsRef,
  showHero,
}: {
  selectedId: string;
  isOverview: boolean;
  bodyPositionsRef: React.MutableRefObject<Record<string, THREE.Vector3>>;
  showHero: boolean;
}) {
  const { camera, gl } = useThree();
  const tempPos = useRef(new THREE.Vector3());
  const tempTopPos = useRef(new THREE.Vector3());
  const tempBottomPos = useRef(new THREE.Vector3());

  useFrame(() => {
    const labelEl = document.getElementById('cosmos-screen-selection-label');
    if (!labelEl) return;

    if (isOverview || !selectedId) {
      labelEl.style.opacity = '0';
      return;
    }

    const worldPos = selectedId === 'sun'
      ? tempPos.current.set(0, 0, 0)
      : bodyPositionsRef.current[selectedId];

    if (!worldPos) {
      labelEl.style.opacity = '0';
      return;
    }

    const body = ALL_CELESTIAL_BODIES.find((b) => b.id === selectedId);
    const visualRadius = body ? (body.ring ? body.ring.outerRadius : body.visualRadius) : 1;

    // Check if planet center is in front of camera
    tempPos.current.copy(worldPos);
    tempPos.current.project(camera);
    if (tempPos.current.z > 1.0) {
      labelEl.style.opacity = '0';
      return;
    }

    const rect = gl.domElement.getBoundingClientRect();
    const screenX = (tempPos.current.x * 0.5 + 0.5) * rect.width + rect.left;

    // Project top of the celestial sphere as seen along camera's up direction
    tempTopPos.current.copy(worldPos).addScaledVector(camera.up, visualRadius * 1.05);
    tempTopPos.current.project(camera);
    const topScreenY = (-(tempTopPos.current.y * 0.5) + 0.5) * rect.height + rect.top;

    // Project bottom of the celestial sphere
    tempBottomPos.current.copy(worldPos).addScaledVector(camera.up, -visualRadius * 1.05);
    tempBottomPos.current.project(camera);
    const bottomScreenY = (-(tempBottomPos.current.y * 0.5) + 0.5) * rect.height + rect.top;

    // Safe zone margins to prevent overlap with UI panels
    // Header height is up to 80px, so topSafeMargin is 105px to guarantee complete clearance
    const topSafeMargin = 105;
    const bottomSafeMargin = rect.height - 120; // Above bottom controls
    const leftSafeMargin = showHero ? 430 : 28; // Avoid hero card on left
    const rightSafeMargin = rect.width - 400; // Avoid side telemetry panel on right

    // Position comfortably above the planet with consistent visual gap
    let targetY = topScreenY - 26;
    let targetX = screenX;

    // If placing above would hit or disappear behind the top header:
    if (targetY < topSafeMargin) {
      // Reposition comfortably below the planet
      targetY = bottomScreenY + 26;
    }

    // Clamp within safe viewport area
    targetY = THREE.MathUtils.clamp(targetY, topSafeMargin + 4, bottomSafeMargin - 16);
    targetX = THREE.MathUtils.clamp(targetX, leftSafeMargin + 64, rightSafeMargin - 64);

    // Apply smooth hardware-accelerated transform without subpixel jitter
    labelEl.style.transform = `translate3d(${Math.round(targetX)}px, ${Math.round(targetY)}px, 0px) translate(-50%, -50%)`;
    labelEl.style.opacity = '1';
  });

  return null;
}

export const SolarSystem: React.FC<SolarSystemProps> = ({
  selectedId,
  onSelect,
  paused,
  speed,
  reverse,
  showOrbits,
  quality,
  isOverview,
  showHero,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Pre-calculate initial planetary & moon coordinates synchronously
  const initialMap = useMemo(() => {
    const raw = getInitialBodyPositions();
    const map: Record<string, THREE.Vector3> = {};
    for (const [k, v] of Object.entries(raw)) {
      map[k] = new THREE.Vector3(v[0], v[1], v[2]);
    }
    return map;
  }, []);

  // Frame-accurate position registry (zero React state latency)
  const bodyPositionsRef = useRef<Record<string, THREE.Vector3>>(initialMap);

  const handleUpdatePosition = useCallback((id: string, pos: THREE.Vector3) => {
    if (!bodyPositionsRef.current[id]) {
      bodyPositionsRef.current[id] = pos.clone();
    } else {
      bodyPositionsRef.current[id].copy(pos);
    }
  }, []);

  // Compute stable initial camera setup framed directly on Earth
  const initialEarthPos = initialMap['earth'] || new THREE.Vector3(1.57, 0, -17.93);
  const initialCamPos: [number, number, number] = useMemo(() => {
    const offset = new THREE.Vector3(0.7, 0.4, 0.9).normalize().multiplyScalar(5.0);
    return [
      initialEarthPos.x + offset.x,
      initialEarthPos.y - 0.08 + offset.y,
      initialEarthPos.z + offset.z,
    ];
  }, [initialEarthPos]);

  return (
    <Canvas
      camera={{ position: initialCamPos, fov: 48, near: 0.1, far: 1200 }}
      dpr={quality === 'high' ? [1, 1.75] : 1}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      className="w-full h-full"
    >
      <color attach="background" args={['#030712']} />

      {/* Balanced ambient fill light so planet shadows retain subtle relief */}
      <ambientLight intensity={0.42} />

      {/* Subtle deep-space directional rim light */}
      <directionalLight position={[30, 20, -30]} intensity={0.15} color="#88aaff" />

      <Suspense fallback={<Loader />}>
        {/* Stellar Background Starfield */}
        <Starfield quality={quality} />

        {/* The Central Sun */}
        <SunMesh
          onSelect={onSelect}
          isSelected={selectedId === 'sun'}
          quality={quality}
        />

        {/* Orbit Lines for all 8 planets */}
        {PLANETS_DATA.map((planet) => (
          <OrbitLine
            key={`orbit-${planet.id}`}
            distance={planet.visualDistance}
            isSelected={selectedId === planet.id}
            color={planet.glowColor}
            visible={showOrbits}
          />
        ))}

        {/* Planetary Bodies */}
        {PLANETS_DATA.map((planet, index) => (
          <PlanetMesh
            key={planet.id}
            planet={planet}
            index={index}
            isSelected={selectedId === planet.id}
            onSelect={onSelect}
            paused={paused}
            speed={speed}
            reverse={reverse}
            quality={quality}
            onUpdatePosition={handleUpdatePosition}
          />
        ))}

        {/* Interactive Moons (Earth, Jupiter, Saturn) */}
        {MOONS_DATA.map((moon, index) => {
          const parentPos = bodyPositionsRef.current[moon.parentId!] || new THREE.Vector3(0, 0, 0);
          return (
            <ErrorBoundary key={moon.id} fallback={null}>
              <MoonMesh
                moon={moon}
                index={index}
                parentWorldPosition={parentPos}
                isSelected={selectedId === moon.id}
                onSelect={onSelect}
                paused={paused}
                speed={speed}
                reverse={reverse}
                quality={quality}
                onUpdatePosition={handleUpdatePosition}
                showOrbits={showOrbits}
              />
            </ErrorBoundary>
          );
        })}

        {/* Cinematic Camera Controller */}
        <CameraRig
          selectedId={selectedId}
          bodyPositionsRef={bodyPositionsRef}
          controlsRef={controlsRef}
          isOverview={isOverview}
        />

        {/* Synchronous Screen-Space Selection Tracker */}
        <ScreenSpaceLabelTracker
          selectedId={selectedId}
          isOverview={isOverview}
          bodyPositionsRef={bodyPositionsRef}
          showHero={showHero}
        />
      </Suspense>

      {/* Interactive OrbitControls */}
      <OrbitControls
        ref={controlsRef}
        target={[initialEarthPos.x, initialEarthPos.y - 0.08, initialEarthPos.z]}
        enableDamping
        dampingFactor={0.06}
        minDistance={1.8}
        maxDistance={240}
        rotateSpeed={0.7}
        zoomSpeed={0.85}
      />
    </Canvas>
  );
};

export default SolarSystem;
