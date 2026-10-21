import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Rewind, 
  Gauge,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CELESTIAL_BODIES } from '../data/planets';

interface ControlBarProps {
  selectedId: string;
  onSelect: (id: string) => void;
  paused: boolean;
  onTogglePause: () => void;
  speed: number;
  onChangeSpeed: (newSpeed: number) => void;
  reverse: boolean;
  onToggleReverse: () => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  onResetView: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  selectedId,
  onSelect,
  paused,
  onTogglePause,
  speed,
  onChangeSpeed,
  reverse,
  onToggleReverse,
  showOrbits,
  onToggleOrbits,
  onResetView,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check overflow state to show/hide scroll indicators and edge masks
  const checkOverflow = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  // Update overflow state on mount, resize, and scroll
  useEffect(() => {
    checkOverflow();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkOverflow, { passive: true });
    window.addEventListener('resize', checkOverflow);

    return () => {
      el.removeEventListener('scroll', checkOverflow);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [checkOverflow]);

  // Keep active planet automatically scrolled into view
  useEffect(() => {
    const activeBtn = buttonRefs.current[selectedId];
    if (activeBtn && scrollContainerRef.current) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      // Recheck overflow after smooth scroll completes
      setTimeout(checkOverflow, 350);
    }
  }, [selectedId, checkOverflow]);

  // Mouse wheel horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (e.deltaY !== 0) {
      scrollContainerRef.current.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
  };

  const scrollByAmount = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 z-20 pb-3 sm:pb-4 px-3 sm:px-6 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-none select-none"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Top Tier: Dedicated Planet Selector Shelf */}
      <div className="pointer-events-auto relative w-full max-w-[min(940px,calc(100vw-1.5rem))] flex items-center justify-center">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-180)}
            className="absolute -left-2 z-20 p-1.5 rounded-full bg-slate-900/95 border border-sky-400/40 text-sky-300 shadow-xl shadow-black/60 hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
            title="Scroll left"
            aria-label="Scroll left in planet bar"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Subtle Left Edge Fade */}
        <div 
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950/90 to-transparent rounded-l-2xl z-10 transition-opacity duration-200 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Horizontal scroll container with hidden scrollbar */}
        <nav
          ref={scrollContainerRef}
          onWheel={handleWheel}
          aria-label="Planet Quick Selector"
          className="w-full overflow-x-auto no-scrollbar py-2 px-3 sm:px-4 flex items-center justify-start md:justify-center gap-2 sm:gap-2.5 rounded-2xl glass-panel-subtle shadow-2xl backdrop-blur-xl border border-white/15"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CELESTIAL_BODIES.map((body) => {
            const isActive = selectedId === body.id;
            return (
              <button
                key={body.id}
                ref={(el) => {
                  buttonRefs.current[body.id] = el;
                }}
                onClick={() => onSelect(body.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-space font-medium transition-all whitespace-nowrap min-h-[36px] ${
                  isActive
                    ? 'bg-sky-500/30 border border-sky-400 text-white shadow-lg shadow-sky-500/30 scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform"
                  style={{
                    backgroundColor: body.color,
                    boxShadow: isActive ? `0 0 10px ${body.color}` : 'none',
                  }}
                />
                <span className="text-xs font-semibold">{body.name.replace(/ \(.*\)/, '')}</span>
              </button>
            );
          })}
        </nav>

        {/* Subtle Right Edge Fade */}
        <div 
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950/90 to-transparent rounded-r-2xl z-10 transition-opacity duration-200 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(180)}
            className="absolute -right-2 z-20 p-1.5 rounded-full bg-slate-900/95 border border-sky-400/40 text-sky-300 shadow-xl shadow-black/60 hover:bg-slate-800 transition-all hover:scale-110 active:scale-95"
            title="Scroll right"
            aria-label="Scroll right in planet bar"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Bottom Tier: Simulation & Orbit Controls */}
      <div className="pointer-events-auto flex items-center flex-wrap justify-center gap-1.5 sm:gap-2.5 py-1.5 sm:py-2 px-3 sm:px-5 rounded-2xl glass-panel border border-white/15 text-xs text-slate-300 shadow-2xl max-w-[min(940px,calc(100vw-1.5rem))]">
        {/* Play / Pause Button */}
        <button
          onClick={onTogglePause}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-space font-medium bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all hover:scale-105 active:scale-95"
          title={paused ? 'Resume Simulation (Space)' : 'Pause Simulation (Space)'}
        >
          {paused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} className="text-amber-400" />}
          <span className="text-xs font-semibold">{paused ? 'Resume' : 'Pause'}</span>
        </button>

        {/* Reverse Orbital Direction */}
        <button
          onClick={onToggleReverse}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-space transition-all hover:scale-105 active:scale-95 border ${
            reverse
              ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
              : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
          }`}
          title="Reverse orbital revolution (R)"
        >
          <Rewind size={13} />
          <span className="hidden sm:inline text-xs">Reverse</span>
        </button>

        {/* Speed Slider & Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10">
          <Gauge size={13} className="text-sky-400 hidden sm:block" />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300">
            {speed.toFixed(1)}×
          </span>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={speed}
            onChange={(e) => onChangeSpeed(parseFloat(e.target.value))}
            className="w-16 sm:w-24 cursor-pointer"
            aria-label="Simulation Speed Slider"
          />
          {/* Quick preset chips */}
          <div className="hidden md:flex items-center gap-1">
            {[0.5, 1, 2, 5].map((val) => (
              <button
                key={val}
                onClick={() => onChangeSpeed(val)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  speed === val ? 'bg-sky-400/30 text-sky-200 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {val}×
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Orbits */}
        <button
          onClick={onToggleOrbits}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-space transition-all hover:scale-105 active:scale-95 border ${
            showOrbits
              ? 'bg-sky-500/20 border-sky-400/40 text-sky-300'
              : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white'
          }`}
          title="Toggle Planetary Orbit Paths (T)"
        >
          {showOrbits ? <Eye size={13} /> : <EyeOff size={13} />}
          <span className="hidden sm:inline text-xs">Orbits</span>
        </button>

        {/* Reset Camera to Solar Overview */}
        <button
          onClick={onResetView}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-space bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
          title="Reset Camera to Solar System Overview (Esc)"
        >
          <RotateCcw size={13} />
          <span className="hidden sm:inline text-xs">Overview</span>
        </button>
      </div>
    </footer>
  );
};
