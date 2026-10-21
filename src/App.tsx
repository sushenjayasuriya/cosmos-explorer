import { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';
import { AttributionModal } from './components/AttributionModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { cosmicAudio } from './utils/audio';

// Lazy-loaded route views for optimal bundle splitting and performance
const SolarSystemPage = lazy(() =>
  import('./pages/SolarSystemPage').then((m) => ({ default: m.SolarSystemPage }))
);
const MissionsPage = lazy(() =>
  import('./pages/MissionsPage').then((m) => ({ default: m.MissionsPage }))
);
const MissionDetailPage = lazy(() =>
  import('./pages/MissionDetailPage').then((m) => ({ default: m.MissionDetailPage }))
);
const DiscoverPage = lazy(() =>
  import('./pages/DiscoverPage').then((m) => ({ default: m.DiscoverPage }))
);
const ArticlePage = lazy(() =>
  import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage }))
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
);

// Loading fallback skeleton
function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-slate-300">
      <div className="relative w-12 h-12 mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
      <p className="font-space text-xs tracking-widest text-sky-300 uppercase">
        Loading Astronomical Content...
      </p>
    </div>
  );
}

// Route Title and SEO Manager
function RouteMetaManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = 'COSMOS — Beyond the Horizon | 3D Solar System Explorer';

    if (path.startsWith('/missions/')) {
      title = 'Space Mission Profile | COSMOS Explorer';
    } else if (path === '/missions') {
      title = 'Space Missions Fleet | COSMOS Explorer';
    } else if (path.startsWith('/discover/')) {
      title = 'Astronomy Article | COSMOS Explorer';
    } else if (path === '/discover') {
      title = 'Astronomy Encyclopedia | COSMOS Explorer';
    } else if (path === '/gallery') {
      title = 'Deep Space Gallery | COSMOS Explorer';
    }

    document.title = title;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [quality, setQuality] = useState<'high' | 'eco'>('high');
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [showHero, setShowHero] = useState<boolean>(true);
  const [showAttribution, setShowAttribution] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);

  // Audio ambient synthesizer toggle
  const handleToggleAudio = useCallback(() => {
    const isNowPlaying = cosmicAudio.toggle();
    setAudioActive(isNowPlaying);
  }, []);

  // Quality mode toggle
  const handleToggleQuality = useCallback(() => {
    setQuality((prev) => (prev === 'high' ? 'eco' : 'high'));
  }, []);

  return (
    <BrowserRouter>
      <RouteMetaManager />
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
        {/* Top Header Navigation */}
        <HeaderNav
          onResetView={() => {}}
          onOpenAttribution={() => setShowAttribution(true)}
          onOpenShortcuts={() => setShowShortcuts(true)}
          onToggleHero={() => setShowHero((prev) => !prev)}
          showHero={showHero}
          audioActive={audioActive}
          onToggleAudio={handleToggleAudio}
          quality={quality}
          onToggleQuality={handleToggleQuality}
          onStartTour={() => setIsTourActive(true)}
          isTourActive={isTourActive}
          onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
          isFocusMode={isFocusMode}
        />

        {/* Route Pages with Suspense & ErrorBoundary */}
        <div className="flex-1">
          <ErrorBoundary fallback={<div className="py-24 text-center text-slate-400">Failed to render section. Please refresh.</div>}>
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                {/* 3D Interactive Solar System */}
                <Route
                  path="/"
                  element={
                    <SolarSystemPage
                      quality={quality}
                      onToggleQuality={handleToggleQuality}
                      audioActive={audioActive}
                      onToggleAudio={handleToggleAudio}
                      showHero={showHero}
                      onToggleHero={() => setShowHero((prev) => !prev)}
                      onCloseHero={() => setShowHero(false)}
                      isTourActive={isTourActive}
                      onStartTour={() => {
                        setIsTourActive(true);
                        setShowHero(false);
                        setIsFocusMode(false);
                      }}
                      onCloseTour={() => setIsTourActive(false)}
                      isFocusMode={isFocusMode}
                      onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
                      showAttribution={showAttribution}
                      onCloseAttribution={() => setShowAttribution(false)}
                      showShortcuts={showShortcuts}
                      onCloseShortcuts={() => setShowShortcuts(false)}
                    />
                  }
                />

                {/* Space Missions Fleet */}
                <Route path="/missions" element={<MissionsPage />} />
                <Route path="/missions/:id" element={<MissionDetailPage />} />

                {/* Astronomy Encyclopedia */}
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/discover/:slug" element={<ArticlePage />} />

                {/* Deep Space Gallery */}
                <Route path="/gallery" element={<GalleryPage />} />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Global Attribution Modal */}
        <AttributionModal
          isOpen={showAttribution}
          onClose={() => setShowAttribution(false)}
        />

        {/* Global Shortcuts Modal */}
        <ShortcutsModal
          isOpen={showShortcuts}
          onClose={() => setShowShortcuts(false)}
        />
      </div>
    </BrowserRouter>
  );
}
