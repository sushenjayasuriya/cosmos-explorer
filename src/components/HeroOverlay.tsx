import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, X, Orbit } from 'lucide-react';

interface HeroOverlayProps {
  visible: boolean;
  onExplore: () => void;
  onSelectEarth: () => void;
  onStartTour: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  visible,
  onExplore,
  onSelectEarth,
  onStartTour,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 sm:top-24 left-4 sm:left-8 z-20 max-w-md pointer-events-none select-none"
        >
          <div className="p-5 sm:p-6 rounded-2xl glass-panel shadow-2xl border border-white/10 backdrop-blur-xl pointer-events-auto relative">
            {/* Close button */}
            <button
              onClick={onExplore}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close introduction"
              aria-label="Close introduction"
            >
              <X size={16} />
            </button>

            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[10px] font-mono tracking-widest uppercase mb-2.5">
              <Sparkles size={12} className="text-sky-400" />
              <span>Phase 2 · Advanced Space Exploration</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-space tracking-tight text-white leading-tight">
              THE UNIVERSE <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                IS YOURS TO EXPLORE.
              </span>
            </h1>

            <p className="mt-2 text-xs text-slate-300/90 leading-relaxed">
              Embark on an orbital journey through our celestial neighborhood. Inspect all eight major planets
              and their major interactive moons with authentic NASA/JPL reference data, realistic cartographic textures,
              and cinematic flight transitions.
            </p>

            <div className="mt-4 flex items-center flex-wrap gap-2">
              <button
                onClick={onStartTour}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-bold font-space text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Orbit size={14} />
                <span>Start Guided Tour</span>
              </button>

              <button
                onClick={onSelectEarth}
                className="px-3 py-2 rounded-xl glass-button text-sky-300 hover:text-white font-space text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Compass size={14} />
                <span>Inspect Earth</span>
              </button>

              <button
                onClick={onExplore}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-space text-xs tracking-wider uppercase transition-all"
              >
                <span>Free Flight</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>DRAG TO ORBIT · SCROLL TO ZOOM · SELECT PLANETS & MOONS</span>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
