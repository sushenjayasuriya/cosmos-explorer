import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, Mouse } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  // Support Escape key to close modal and prevent background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const keyShortcuts = [
    { key: '1 – 9', action: 'Directly select Sun (1) through Neptune (9)' },
    { key: 'Space', action: 'Pause or resume orbital simulation' },
    { key: 'F', action: 'Toggle Focus Mode (minimalist immersive view)' },
    { key: 'Esc', action: 'Exit Focus Mode / Reset to Overview' },
    { key: 'T', action: 'Toggle planetary orbit paths on / off' },
    { key: 'P', action: 'Toggle Eco / High Fidelity rendering mode' },
    { key: 'M', action: 'Toggle ambient cosmic synthesizer audio' },
    { key: 'R', action: 'Reverse orbital revolution direction' },
  ];

  const mouseControls = [
    { input: 'Left Click + Drag', action: 'Orbit and inspect around focused celestial body' },
    { input: 'Right Click + Drag', action: 'Pan camera through 3D space' },
    { input: 'Scroll Wheel / Pinch', action: 'Smooth zoom in / out' },
    { input: 'Direct Click on Planet', action: 'Focus camera and open scientific planetary facts' },
  ];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl glass-panel text-slate-100 shadow-2xl border border-white/15 overflow-hidden"
        >
          {/* Sticky Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/70 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Keyboard className="text-sky-400" size={20} />
              <div>
                <h2 className="font-space font-bold text-base sm:text-lg text-white">Controls & Shortcuts</h2>
                <p className="text-[11px] text-slate-400">Master 3D orbital navigation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close shortcuts modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs text-slate-300">
            {/* Keyboard Shortcuts */}
            <div className="space-y-2">
              <h3 className="font-space font-semibold text-xs uppercase tracking-wider text-sky-300">
                Keyboard Navigation
              </h3>
              <div className="space-y-1.5">
                {keyShortcuts.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 gap-2"
                  >
                    <span className="text-slate-300 text-[11px] sm:text-xs">{item.action}</span>
                    <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-600 font-mono text-[10px] sm:text-[11px] text-sky-300 font-bold shadow-inner whitespace-nowrap">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>

            {/* Mouse & Touch */}
            <div className="space-y-2 pt-1">
              <h3 className="font-space font-semibold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Mouse size={14} /> Mouse & Touch Gestures
              </h3>
              <div className="space-y-1.5">
                {mouseControls.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 gap-2"
                  >
                    <span className="text-slate-300 text-[11px] sm:text-xs">{item.action}</span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 font-medium whitespace-nowrap">
                      {item.input}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="p-3.5 sm:p-4 border-t border-white/10 bg-slate-900/70 flex justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
