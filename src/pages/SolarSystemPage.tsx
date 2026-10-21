import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SolarSystem from '../components/SolarSystem';
import { ControlBar } from '../components/ControlBar';
import { PlanetInfoPanel } from '../components/PlanetInfoPanel';
import { HeroOverlay } from '../components/HeroOverlay';
import { AttributionModal } from '../components/AttributionModal';
import { ShortcutsModal } from '../components/ShortcutsModal';
import { GuidedTourOverlay } from '../components/GuidedTourOverlay';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ScreenSpaceSelectionLabel } from '../components/ScreenSpaceSelectionLabel';
import { ALL_CELESTIAL_BODIES, GUIDED_TOUR_STEPS, type CelestialBody } from '../data/planets';
import { Minimize2 } from 'lucide-react';

interface SolarSystemPageProps {
  quality: 'high' | 'eco';
  onToggleQuality: () => void;
  audioActive?: boolean;
  onToggleAudio: () => void;
  showHero: boolean;
  onToggleHero?: () => void;
  onCloseHero: () => void;
  isTourActive: boolean;
  onStartTour: () => void;
  onCloseTour: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  showAttribution: boolean;
  onCloseAttribution: () => void;
  showShortcuts: boolean;
  onCloseShortcuts: () => void;
}

export const SolarSystemPage: React.FC<SolarSystemPageProps> = ({
  quality,
  onToggleQuality,
  onToggleAudio,
  showHero,
  onCloseHero,
  isTourActive,
  onStartTour,
  onCloseTour,
  isFocusMode,
  onToggleFocusMode,
  showAttribution,
  onCloseAttribution,
  showShortcuts,
  onCloseShortcuts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialBodyParam = searchParams.get('body') || searchParams.get('target');

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (initialBodyParam && ALL_CELESTIAL_BODIES.some((b) => b.id === initialBodyParam)) {
      return initialBodyParam;
    }
    return 'earth';
  });

  const [isOverview, setIsOverview] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [reverse, setReverse] = useState<boolean>(false);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);
  const [isTourPaused, setIsTourPaused] = useState<boolean>(false);

  // Sync when URL query param changes
  useEffect(() => {
    const bodyParam = searchParams.get('body') || searchParams.get('target');
    if (bodyParam && ALL_CELESTIAL_BODIES.some((b) => b.id === bodyParam)) {
      setSelectedId(bodyParam);
      setIsOverview(false);
      onCloseHero();
    }
  }, [searchParams, onCloseHero]);

  // Active celestial body object
  const activeBody: CelestialBody | undefined = ALL_CELESTIAL_BODIES.find(
    (b) => b.id === selectedId
  );

  // Select a celestial body (planet, Sun, or moon)
  const handleSelectBody = useCallback((id: string) => {
    setSelectedId(id);
    setIsOverview(false);
    onCloseHero();
    setSearchParams({ body: id }, { replace: true });
    if (isTourActive) {
      onCloseTour();
    }
  }, [isTourActive, onCloseTour, onCloseHero, setSearchParams]);

  // Reset to solar system overview
  const handleResetOverview = useCallback(() => {
    setIsOverview(true);
    setSelectedId('');
    setSearchParams({}, { replace: true });
    if (isTourActive) {
      onCloseTour();
    }
  }, [isTourActive, onCloseTour, setSearchParams]);

  const handleNextTourStep = useCallback(() => {
    setTourStepIndex((prev) => {
      const nextIndex = (prev + 1) % GUIDED_TOUR_STEPS.length;
      setSelectedId(GUIDED_TOUR_STEPS[nextIndex].id);
      return nextIndex;
    });
  }, []);

  const handlePrevTourStep = useCallback(() => {
    setTourStepIndex((prev) => {
      const prevIndex = Math.max(0, prev - 1);
      setSelectedId(GUIDED_TOUR_STEPS[prevIndex].id);
      return prevIndex;
    });
  }, []);

  // Page Visibility API: pause simulation when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setPaused((p) => !p);
      } else if (e.code === 'KeyF') {
        onToggleFocusMode();
      } else if (e.code === 'KeyO') {
        handleResetOverview();
      } else if (e.code === 'Escape') {
        if (isFocusMode) {
          onToggleFocusMode();
        } else if (isTourActive) {
          onCloseTour();
        } else if (!showAttribution && !showShortcuts) {
          handleResetOverview();
        }
      } else if (e.code === 'KeyT') {
        setShowOrbits((o) => !o);
      } else if (e.code === 'KeyP') {
        onToggleQuality();
      } else if (e.code === 'KeyM') {
        onToggleAudio();
      } else if (e.code === 'KeyR') {
        setReverse((r) => !r);
      } else if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key, 10) - 1;
        if (index < ALL_CELESTIAL_BODIES.length) {
          handleSelectBody(ALL_CELESTIAL_BODIES[index].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleResetOverview,
    handleSelectBody,
    onToggleAudio,
    onToggleQuality,
    showAttribution,
    showShortcuts,
    isFocusMode,
    isTourActive,
    onCloseTour,
    onToggleFocusMode
  ]);

  // Lock body scroll only while viewing the 3D full-screen canvas
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030712] text-slate-100 select-none">
      {/* Floating Exit Button in Focus Mode */}
      {isFocusMode && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-300">
          <button
            onClick={onToggleFocusMode}
            className="px-3.5 py-1.5 rounded-xl glass-panel text-slate-200 hover:text-white border border-white/20 text-xs font-space font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Minimize2 size={14} className="text-emerald-400" />
            <span>Exit Focus Mode</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Esc</kbd>
          </button>
        </div>
      )}

      {/* Hero Welcome Overlay */}
      {!isFocusMode && !isTourActive && (
        <HeroOverlay
          visible={showHero}
          onExplore={onCloseHero}
          onSelectEarth={() => {
            handleSelectBody('earth');
            onCloseHero();
          }}
          onStartTour={onStartTour}
        />
      )}

      {/* 3D WebGL Solar System Canvas */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary fallback={<div className="absolute inset-0 flex items-center justify-center text-slate-400">Loading Solar System Engine...</div>}>
          <SolarSystem
            selectedId={selectedId}
            onSelect={handleSelectBody}
            paused={paused}
            speed={speed}
            reverse={reverse}
            showOrbits={showOrbits}
            quality={quality}
            isOverview={isOverview}
            showHero={showHero}
          />
        </ErrorBoundary>
      </div>

      {/* Synchronous Screen-Space Selected Celestial Body Label */}
      <ScreenSpaceSelectionLabel
        body={activeBody}
        isOverview={isOverview}
        isFocusMode={isFocusMode}
      />

      {/* Planet / Moon Telemetry & Information Panel */}
      {activeBody && !isOverview && !showHero && !isFocusMode && !isTourActive && (
        <PlanetInfoPanel
          body={activeBody}
          onClose={handleResetOverview}
          onFocus={() => {
            setIsOverview(false);
          }}
          onSelectMoon={handleSelectBody}
          onReturnToParent={handleSelectBody}
        />
      )}

      {/* Bottom Control Bar */}
      {!isFocusMode && !isTourActive && (
        <ControlBar
          selectedId={selectedId}
          onSelect={handleSelectBody}
          paused={paused}
          onTogglePause={() => setPaused((p) => !p)}
          speed={speed}
          onChangeSpeed={setSpeed}
          reverse={reverse}
          onToggleReverse={() => setReverse((r) => !r)}
          showOrbits={showOrbits}
          onToggleOrbits={() => setShowOrbits((o) => !o)}
          onResetView={handleResetOverview}
        />
      )}

      {/* Guided Tour HUD Overlay */}
      {isTourActive && (
        <GuidedTourOverlay
          isActive={isTourActive}
          currentStepIndex={tourStepIndex}
          onNext={handleNextTourStep}
          onPrev={handlePrevTourStep}
          onClose={onCloseTour}
          isPaused={isTourPaused}
          onTogglePause={() => setIsTourPaused((p) => !p)}
        />
      )}

      {/* Modals */}
      <AttributionModal
        isOpen={showAttribution}
        onClose={onCloseAttribution}
      />
      <ShortcutsModal
        isOpen={showShortcuts}
        onClose={onCloseShortcuts}
      />
    </div>
  );
};
