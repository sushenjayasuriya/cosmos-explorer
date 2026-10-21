import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { GUIDED_TOUR_STEPS } from '../data/planets';

interface GuidedTourOverlayProps {
  isActive: boolean;
  currentStepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const GuidedTourOverlay: React.FC<GuidedTourOverlayProps> = ({
  isActive,
  currentStepIndex,
  onNext,
  onPrev,
  onClose,
  isPaused,
  onTogglePause,
}) => {
  const currentStep = GUIDED_TOUR_STEPS[currentStepIndex];
  const [progress, setProgress] = useState(0);

  // Auto-advance timer when not paused
  useEffect(() => {
    if (!isActive || isPaused || !currentStep) return;

    setProgress(0);
    const intervalMs = 50;
    const totalDuration = currentStep.durationMs;
    const increment = (intervalMs / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isActive, isPaused, currentStepIndex, currentStep, onNext]);

  if (!isActive || !currentStep) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-24 sm:bottom-28 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[580px] z-40 pointer-events-auto"
      >
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-sky-400/30 shadow-2xl backdrop-blur-2xl text-slate-100 flex flex-col gap-3">
          {/* Progress Bar Top */}
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-sky-500/20 text-sky-300">
                <Sparkles size={14} />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-sky-300 font-bold">
                GUIDED TOUR · DESTINATION {currentStepIndex + 1} OF {GUIDED_TOUR_STEPS.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Exit Tour"
              aria-label="Exit Guided Tour"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content Body */}
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-space font-extrabold text-xl sm:text-2xl text-white">
                {currentStep.name}
              </h3>
              <span className="text-xs text-sky-300/80 font-mono">
                {currentStep.category}
              </span>
            </div>
            <p className="text-[11px] text-sky-200/70 italic mb-2">
              {currentStep.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentStep.scientificFact}
            </p>
          </div>

          {/* Controls Footer */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {/* Previous */}
              <button
                onClick={onPrev}
                disabled={currentStepIndex === 0}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors"
                title="Previous Destination"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Play / Pause Auto-Advance */}
              <button
                onClick={onTogglePause}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-1.5 text-xs font-space font-semibold transition-colors"
                title={isPaused ? 'Resume Auto-Advance' : 'Pause Auto-Advance'}
              >
                {isPaused ? <Play size={13} className="text-emerald-400" /> : <Pause size={13} className="text-amber-400" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              {/* Next */}
              <button
                onClick={onNext}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Next Destination"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 text-xs font-space font-semibold transition-colors"
            >
              Exit Tour
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
