import { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';
import { AttributionModal } from './components/AttributionModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { LiveSpaceCenter } from './components/LiveSpaceCenter';
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

import { MISSIONS_DATA } from './data/missions';
import { ARTICLES_DATA } from './data/articles';

// Route Title, Canonical URL, and Dynamic SEO Meta Manager
function RouteMetaManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const origin = 'https://cosmos.sushenjayasuriya.org.lk';
    let title = 'COSMOS — Beyond the Horizon | 3D Solar System Explorer';
    let description = 'Interactive 3D solar system simulation and astronomy exploration platform built with Three.js and authentic NASA/JPL telemetry.';

    if (path.startsWith('/missions/')) {
      const id = path.replace('/missions/', '');
      const mission = MISSIONS_DATA.find((m) => m.id === id);
      if (mission) {
        title = `${mission.name} (${mission.agency}) | Space Mission Profile | COSMOS`;
        description = `${mission.name}: ${mission.tagline}. Primary destination: ${mission.primaryDestination}. Objectives: ${mission.objectives.join(', ')}.`;
      } else {
        title = 'Space Mission Profile | COSMOS Explorer';
      }
    } else if (path === '/missions') {
      title = 'Space Missions Fleet | Exploration Probes & Telescopes | COSMOS';
      description = 'Explore landmark space missions including Voyager 1 & 2, Cassini-Huygens, Juno, Perseverance, New Horizons, Europa Clipper, and JWST with interactive 3D models.';
    } else if (path.startsWith('/discover/')) {
      const slug = path.replace('/discover/', '');
      const article = ARTICLES_DATA.find((a) => a.slug === slug);
      if (article) {
        title = `${article.title} | Astronomy Encyclopedia | COSMOS`;
        description = `${article.summary} Researched and verified with peer-reviewed astronomical references.`;
      } else {
        title = 'Astronomy Article | COSMOS Explorer';
      }
    } else if (path === '/discover') {
      title = 'Astronomy Encyclopedia | Stellar Evolution, Black Holes & Galaxies | COSMOS';
      description = 'Peer-reviewed educational library on astrophysics, stellar lifecycles, black holes, event horizons, exoplanets, and space technology.';
    } else if (path === '/gallery') {
      title = 'Deep Space Gallery | Hubble, JWST & NASA SVS Astronomy Media | COSMOS';
      description = 'Curated high-resolution imagery and scientific visualization videos of nebulae, star-forming regions, galaxies, and planets from Hubble, Webb, and NASA missions.';
    }

    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Open Graph Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Open Graph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${origin}${path === '/' ? '/' : path}`);

    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `${origin}${path === '/' ? '/' : path}`);

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
  const [showLiveCenter, setShowLiveCenter] = useState<boolean>(false);
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
          onOpenLiveCenter={() => setShowLiveCenter(true)}
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

        {/* Real-Time NASA Live Space Center Modal */}
        <LiveSpaceCenter
          isOpen={showLiveCenter}
          onClose={() => setShowLiveCenter(false)}
        />
      </div>
    </BrowserRouter>
  );
}
