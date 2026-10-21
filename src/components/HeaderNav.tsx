import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Orbit, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  Award, 
  Zap, 
  RotateCcw,
  Sparkles,
  Maximize2,
  Compass,
  Rocket,
  BookOpen,
  Camera,
  Menu,
  X
} from 'lucide-react';

interface HeaderNavProps {
  onResetView: () => void;
  onOpenAttribution: () => void;
  onOpenShortcuts: () => void;
  onToggleHero: () => void;
  showHero: boolean;
  audioActive: boolean;
  onToggleAudio: () => void;
  quality: 'high' | 'eco';
  onToggleQuality: () => void;
  onStartTour: () => void;
  isTourActive: boolean;
  onToggleFocusMode: () => void;
  isFocusMode: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onResetView,
  onOpenAttribution,
  onOpenShortcuts,
  onToggleHero,
  showHero,
  audioActive,
  onToggleAudio,
  quality,
  onToggleQuality,
  onStartTour,
  isTourActive,
  onToggleFocusMode,
  isFocusMode,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSolarRoute = location.pathname === '/';

  if (isFocusMode && isSolarRoute) {
    return null; // Entire header hidden in Focus Mode
  }

  const handleBrandClick = () => {
    if (!isSolarRoute) {
      navigate('/');
    } else {
      onResetView();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 px-3 sm:px-8 flex items-center justify-between border-b border-white/10 glass-panel-subtle backdrop-blur-xl select-none">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBrandClick}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-1 cursor-pointer"
          title={isSolarRoute ? 'Reset to Solar Overview' : 'Return to 3D Solar System'}
          aria-label="COSMOS home, return to solar overview"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-600/30 border border-sky-400/40 text-sky-400 shadow-lg shadow-sky-500/10 group-hover:scale-105 transition-transform">
            <Orbit size={22} className="animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-black text-xl sm:text-2xl tracking-[0.2em] text-white">
                COSMOS
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono">
              Beyond the Horizon
            </p>
          </div>
        </button>
      </div>

      {/* Primary Application Navigation (Desktop) */}
      <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-inner flex-shrink-0">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-space font-semibold transition-all whitespace-nowrap flex-shrink-0 leading-none ${
              isActive
                ? 'bg-sky-500/30 text-white border border-sky-400/50 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`
          }
        >
          <Orbit size={14} className="text-sky-400 flex-shrink-0" />
          <span>Solar System</span>
        </NavLink>

        <NavLink
          to="/missions"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-space font-semibold transition-all whitespace-nowrap flex-shrink-0 leading-none ${
              isActive
                ? 'bg-sky-500/30 text-white border border-sky-400/50 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`
          }
        >
          <Rocket size={14} className="text-amber-400 flex-shrink-0" />
          <span>Missions</span>
        </NavLink>

        <NavLink
          to="/discover"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-space font-semibold transition-all whitespace-nowrap flex-shrink-0 leading-none ${
              isActive
                ? 'bg-sky-500/30 text-white border border-sky-400/50 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`
          }
        >
          <BookOpen size={14} className="text-emerald-400 flex-shrink-0" />
          <span>Discover</span>
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-space font-semibold transition-all whitespace-nowrap flex-shrink-0 leading-none ${
              isActive
                ? 'bg-sky-500/30 text-white border border-sky-400/50 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`
          }
        >
          <Camera size={14} className="text-violet-400 flex-shrink-0" />
          <span>Gallery</span>
        </NavLink>
      </nav>

      {/* Right Controls and Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Solar-System Specific Actions (Only rendered on '/') */}
        {isSolarRoute && (
          <>
            {/* Start Guided Solar System Tour */}
            <button
              onClick={onStartTour}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono border transition-all whitespace-nowrap flex-shrink-0 leading-none ${
                isTourActive
                  ? 'bg-sky-500/30 border-sky-400 text-sky-300 shadow-md shadow-sky-500/20'
                  : 'border-white/10 glass-button text-slate-300 hover:text-white'
              }`}
              title="Start Guided Solar System Tour"
              aria-label="Start Guided Solar System Tour"
            >
              <Compass size={14} className="text-sky-400 flex-shrink-0" />
              <span className="hidden sm:inline">TOUR</span>
            </button>

            {/* Focus Mode (Cinematic full-screen 3D exploration) */}
            <button
              onClick={onToggleFocusMode}
              className="hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono border border-white/10 glass-button text-slate-300 hover:text-white whitespace-nowrap flex-shrink-0 leading-none"
              title="Enable Cinematic Focus Mode (Hides UI)"
              aria-label="Enable Focus Mode"
            >
              <Maximize2 size={13} className="text-emerald-400 flex-shrink-0" />
              <span className="hidden xl:inline">FOCUS</span>
            </button>

            {/* Toggle Intro Guide */}
            <button
              onClick={onToggleHero}
              className={`hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono border transition-all whitespace-nowrap flex-shrink-0 leading-none ${
                showHero
                  ? 'bg-sky-500/25 border-sky-400/60 text-sky-300 shadow-md shadow-sky-500/20'
                  : 'border-white/10 glass-button text-slate-300 hover:text-white'
              }`}
              title="Toggle Introduction Guide"
              aria-label="Toggle Introduction Guide"
            >
              <Sparkles size={13} className="text-amber-400 flex-shrink-0" />
              <span>GUIDE</span>
            </button>

            {/* Quality Mode Toggle */}
            <button
              onClick={onToggleQuality}
              className="hidden xl:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono border border-white/10 glass-button text-slate-300 hover:text-white whitespace-nowrap flex-shrink-0 leading-none"
              title={quality === 'high' ? 'Switch to Eco Mode' : 'Switch to High Quality'}
            >
              <Zap size={13} className={`flex-shrink-0 ${quality === 'high' ? 'text-amber-400' : 'text-emerald-400'}`} />
              <span>{quality === 'high' ? 'HIGH RES' : 'ECO'}</span>
            </button>
          </>
        )}

        {/* Ambient Cosmic Sound Generator (Available across all routes) */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono border transition-all whitespace-nowrap flex-shrink-0 leading-none ${
            audioActive
              ? 'bg-sky-500/25 border-sky-400/60 text-sky-300 shadow-md shadow-sky-500/20'
              : 'border-white/10 glass-button text-slate-400 hover:text-slate-200'
          }`}
          title={audioActive ? 'Mute Ambient Space Drone (M)' : 'Enable Ambient Cosmic Sound (M)'}
          aria-label={audioActive ? 'Mute Ambient Sound' : 'Enable Ambient Sound'}
        >
          {audioActive ? (
            <>
              <Volume2 size={14} className="animate-pulse flex-shrink-0" />
              <span className="hidden 2xl:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX size={14} className="flex-shrink-0" />
              <span className="hidden 2xl:inline">AUDIO OFF</span>
            </>
          )}
        </button>

        {/* Keyboard Shortcuts (Only on Solar route) */}
        {isSolarRoute && (
          <button
            onClick={onOpenShortcuts}
            className="hidden 2xl:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono border border-white/10 glass-button text-slate-300 hover:text-white whitespace-nowrap flex-shrink-0 leading-none"
            title="View Keyboard Shortcuts"
            aria-label="View Keyboard Shortcuts"
          >
            <Keyboard size={13} className="flex-shrink-0" />
            <span>SHORTCUTS</span>
          </button>
        )}

        {/* Attribution & Data Source Modal */}
        <button
          onClick={onOpenAttribution}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono border border-white/10 glass-button text-slate-300 hover:text-white whitespace-nowrap flex-shrink-0 leading-none"
          title="Scientific Data References & Image Licenses"
          aria-label="Scientific Data References & Image Licenses"
        >
          <Award size={13} className="text-amber-400 flex-shrink-0" />
          <span className="hidden sm:inline">DATA</span>
        </button>

        {/* Return to Solar Overview button (If on subpage or non-overview) */}
        {!isSolarRoute ? (
          <NavLink
            to="/"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-space font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 hover:text-white transition-all shadow-sm whitespace-nowrap flex-shrink-0 leading-none"
            title="Return to 3D Solar System"
          >
            <RotateCcw size={13} className="flex-shrink-0" />
            <span className="hidden sm:inline">3D SYSTEM</span>
          </NavLink>
        ) : (
          <button
            onClick={onResetView}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-space font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 hover:text-white transition-all shadow-sm whitespace-nowrap flex-shrink-0 leading-none"
            title="Reset to Solar Overview (Esc)"
          >
            <RotateCcw size={13} className="flex-shrink-0" />
            <span className="hidden sm:inline">OVERVIEW</span>
          </button>
        )}

        {/* Mobile Navigation Drawer Toggle */}
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="md:hidden p-2 rounded-xl border border-white/10 glass-button text-slate-300 hover:text-white"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#030712]/95 backdrop-blur-2xl border-b border-white/10 p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 p-3 rounded-xl border text-xs font-space font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-300'
                }`
              }
            >
              <Orbit size={16} className="text-sky-400" />
              <span>Solar System</span>
            </NavLink>

            <NavLink
              to="/missions"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 p-3 rounded-xl border text-xs font-space font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-300'
                }`
              }
            >
              <Rocket size={16} className="text-amber-400" />
              <span>Missions</span>
            </NavLink>

            <NavLink
              to="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 p-3 rounded-xl border text-xs font-space font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-300'
                }`
              }
            >
              <BookOpen size={16} className="text-emerald-400" />
              <span>Discover</span>
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 p-3 rounded-xl border text-xs font-space font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-300'
                }`
              }
            >
              <Camera size={16} className="text-violet-400" />
              <span>Gallery</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
