import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { ALL_CELESTIAL_BODIES } from '../data/planets';

interface CameraRigProps {
  selectedId: string | null;
  planetPositions?: Record<string, THREE.Vector3>;
  bodyPositionsRef?: React.MutableRefObject<Record<string, THREE.Vector3>>;
  controlsRef: React.RefObject<OrbitControlsImpl>;
  isOverview: boolean;
  onTransitionComplete?: () => void;
}

// Smooth quintic / smoothstep easing for cinematic acceleration and deceleration
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  selectedId,
  planetPositions = {},
  bodyPositionsRef,
  controlsRef,
  isOverview,
  onTransitionComplete,
}) => {
  const { camera } = useThree();

  // Transition flight state refs
  const isFlyingRef = useRef(false);
  const flightStartTimeRef = useRef(0);
  const flightDurationRef = useRef(2.8);
  const flightStartCamPosRef = useRef(new THREE.Vector3());
  const flightStartTargetRef = useRef(new THREE.Vector3());
  const flightArcHeightRef = useRef(0);
  const isInitialMount = useRef(true);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Helper to get live position synchronously from ref or prop
  const getLivePosition = (id: string | null): THREE.Vector3 => {
    if (!id || id === 'sun') return new THREE.Vector3(0, 0, 0);
    if (bodyPositionsRef && bodyPositionsRef.current[id]) {
      return bodyPositionsRef.current[id];
    }
    return planetPositions[id] || new THREE.Vector3(0, 0, 0);
  };

  // Trigger interplanetary flight whenever destination target changes
  useEffect(() => {
    if (!controlsRef.current) return;

    const destPos = getLivePosition(selectedId);

    // On initial mount, start already stabilized at destination without jump/flight
    if (isInitialMount.current) {
      isInitialMount.current = false;
      isFlyingRef.current = false;
      if (!isOverview && selectedId) {
        const body = ALL_CELESTIAL_BODIES.find((b) => b.id === selectedId);
        const visualRadius = body ? (body.ring ? body.ring.outerRadius : body.visualRadius) : 1;
        const initialLookAt = destPos.clone().add(new THREE.Vector3(0, -visualRadius * 0.08, 0));
        controlsRef.current.target.copy(initialLookAt);
      }
      return;
    }

    if (prefersReducedMotion.current) {
      // Instant transition for accessibility
      isFlyingRef.current = false;
      const body = ALL_CELESTIAL_BODIES.find((b) => b.id === selectedId);
      const visualRadius = body ? (body.ring ? body.ring.outerRadius : body.visualRadius) : 1;
      const initialLookAt = destPos.clone().add(new THREE.Vector3(0, -visualRadius * 0.08, 0));
      controlsRef.current.target.copy(initialLookAt);
      return;
    }

    // Capture starting state
    flightStartCamPosRef.current.copy(camera.position);
    flightStartTargetRef.current.copy(controlsRef.current.target);

    const dist = flightStartCamPosRef.current.distanceTo(destPos);
    
    // Configurable duration (2.0 to 4.2 seconds based on spatial distance)
    flightDurationRef.current = THREE.MathUtils.clamp(1.8 + dist * 0.028, 2.0, 4.2);
    
    // Elevated arc height to prevent cutting through the Sun or inner planets
    flightArcHeightRef.current = Math.min(dist * 0.22, 18);

    flightStartTimeRef.current = performance.now();
    isFlyingRef.current = true;
  }, [selectedId, isOverview]); // triggered on target change

  // Allow skipping active transition on user interaction
  useEffect(() => {
    const handleSkip = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape') {
        if (isFlyingRef.current) {
          isFlyingRef.current = false;
          onTransitionComplete?.();
        }
      }
    };
    window.addEventListener('keydown', handleSkip);
    return () => window.removeEventListener('keydown', handleSkip);
  }, [onTransitionComplete]);

  useFrame(() => {
    if (!controlsRef.current) return;

    const now = performance.now();

    if (isOverview || !selectedId) {
      // Overview Mode: smoothly frame the complete solar system
      const overviewTarget = new THREE.Vector3(0, 0, 0);
      const overviewCamGoal = new THREE.Vector3(0, 52, 78);

      if (isFlyingRef.current) {
        const elapsed = (now - flightStartTimeRef.current) / 1000;
        const rawProgress = Math.min(elapsed / flightDurationRef.current, 1);
        const t = easeInOutCubic(rawProgress);

        // Arc interpolate camera position
        camera.position.lerpVectors(flightStartCamPosRef.current, overviewCamGoal, t);
        camera.position.y += Math.sin(t * Math.PI) * (flightArcHeightRef.current * 0.5);

        // Interpolate look-at target
        controlsRef.current.target.lerpVectors(flightStartTargetRef.current, overviewTarget, t);

        if (rawProgress >= 1) {
          isFlyingRef.current = false;
          camera.position.copy(overviewCamGoal);
          controlsRef.current.target.copy(overviewTarget);
          onTransitionComplete?.();
        }
      }
    } else {
      // Celestial Target Focus Mode (Planet, Moon, or Sun)
      const body = ALL_CELESTIAL_BODIES.find((b) => b.id === selectedId);
      const liveTargetPos = getLivePosition(selectedId);

      // Determine ideal framing distance based on body's radius
      const visualRadius = body ? (body.ring ? body.ring.outerRadius : body.visualRadius) : 1;
      
      // Calibrated framing distances providing clear headroom below top header:
      // Moons: ~2.4-3.2 units
      // Terrestrial planets: ~5.0-5.8 units
      // Gas/Ice giants: ~11.0-18.0 units (Saturn with rings handled via outerRadius)
      // The Sun: ~23 units
      let framingDist: number;
      if (body?.category === 'Moon') {
        framingDist = Math.max(visualRadius * 4.4, 2.5);
      } else if (body?.id === 'sun') {
        framingDist = Math.max(visualRadius * 4.8, 23.0);
      } else if (body?.category === 'Gas Giant' || body?.category === 'Ice Giant') {
        framingDist = Math.max(visualRadius * 4.4, 11.0);
      } else {
        // Terrestrial planets (Earth, Mars, Venus, Mercury)
        framingDist = Math.max(visualRadius * 5.0, 5.0);
      }

      // Slightly lower the camera target so the planet sits comfortably below the header
      const targetLookAt = liveTargetPos.clone().add(new THREE.Vector3(0, -visualRadius * 0.08, 0));

      const offsetDirection = new THREE.Vector3(0.7, 0.4, 0.9).normalize();
      const idealCamPos = targetLookAt.clone().add(offsetDirection.multiplyScalar(framingDist));

      if (isFlyingRef.current) {
        const elapsed = (now - flightStartTimeRef.current) / 1000;
        const rawProgress = Math.min(elapsed / flightDurationRef.current, 1);
        const t = easeInOutCubic(rawProgress);

        // Smooth flight path with anti-clipping arc elevation
        camera.position.lerpVectors(flightStartCamPosRef.current, idealCamPos, t);
        camera.position.y += Math.sin(t * Math.PI) * flightArcHeightRef.current;

        controlsRef.current.target.lerpVectors(flightStartTargetRef.current, targetLookAt, t);

        if (rawProgress >= 1) {
          isFlyingRef.current = false;
          camera.position.copy(idealCamPos);
          controlsRef.current.target.copy(targetLookAt);
          onTransitionComplete?.();
        }
      } else {
        // Once arrived, follow the target's orbital translation while preserving user's manual orbit rotation/zoom
        const delta = targetLookAt.clone().sub(controlsRef.current.target);
        if (delta.lengthSq() > 0.00001) {
          controlsRef.current.target.add(delta);
          camera.position.add(delta);
        }
      }
    }

    controlsRef.current.update();
  });

  return null;
};
