import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, Scale, Database, Image } from 'lucide-react';
import { ATTRIBUTION_REGISTRY, LEGAL_DISCLAIMER } from '../data/attribution';

interface AttributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttributionModal: React.FC<AttributionModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Support Escape key to close modal
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
          className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl glass-panel text-slate-100 shadow-2xl border border-white/15 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/70 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="text-sky-400" size={20} />
              <div>
                <h2 className="font-space font-bold text-base sm:text-lg text-white">
                  Astronomy Data & Asset Attribution
                </h2>
                <p className="text-[11px] text-slate-400">
                  COSMOS scientific planetary facts and open-license documentation
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close attribution modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs text-slate-300 leading-relaxed">
            {/* Visual Exaggeration Explanation */}
            <section className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/25 space-y-2">
              <div className="flex items-center gap-2 text-sky-300 font-space font-semibold text-xs sm:text-sm">
                <Scale size={16} />
                <span>Why Visual Distances and Planet Sizes Are Exaggerated</span>
              </div>
              <p className="text-slate-200 text-xs">
                In true astronomical scale, the Solar System is predominantly empty space. If the Sun
                were scaled to a standard 1-meter ball:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 font-mono text-[11px]">
                <li>Mercury would be a 3.5 mm pinhead located 42 meters away.</li>
                <li>Earth would be a 9 mm marble located 108 meters away.</li>
                <li>Jupiter would be a 10 cm grapefruit located 560 meters away.</li>
                <li>Neptune would be a 3.5 cm plum situated over 3.2 kilometers away.</li>
              </ul>
              <p className="text-slate-200 text-xs">
                At true scale on a computer monitor, all planets would be sub-pixel invisible specks!
                COSMOS employs a <strong>harmonically compressed logarithmic model</strong> so every
                terrestrial planet, gas giant, and ring system can be interacted with simultaneously,
                while the numerical cards in the data panels display <strong>exact astronomical facts and physical metrics</strong>.
              </p>
            </section>

            {/* Official NASA References */}
            <section className="space-y-2.5">
              <h3 className="font-space font-semibold text-xs sm:text-sm text-white flex items-center gap-2">
                <Database size={15} className="text-sky-400" />
                <span>Scientific References & Exploration Portals</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a
                  href="https://eyes.nasa.gov/apps/solar-system/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-colors block"
                >
                  <strong className="block text-sky-300 font-space mb-1 flex items-center justify-between text-xs">
                    NASA Eyes <ExternalLink size={11} />
                  </strong>
                  <span className="text-[10px] text-slate-400 leading-tight block">
                    Spacecraft orbits and planetary ephemerides reference.
                  </span>
                </a>

                <a
                  href="https://science.nasa.gov/solar-system/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-colors block"
                >
                  <strong className="block text-sky-300 font-space mb-1 flex items-center justify-between text-xs">
                    NASA Solar System <ExternalLink size={11} />
                  </strong>
                  <span className="text-[10px] text-slate-400 leading-tight block">
                    Planetary fact sheets and deep space mission archives.
                  </span>
                </a>

                <a
                  href="https://svs.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-colors block"
                >
                  <strong className="block text-sky-300 font-space mb-1 flex items-center justify-between text-xs">
                    NASA SVS <ExternalLink size={11} />
                  </strong>
                  <span className="text-[10px] text-slate-400 leading-tight block">
                    Scientific Visualization Studio planetary surface maps.
                  </span>
                </a>
              </div>
            </section>

            {/* Attributions Table */}
            <section className="space-y-2.5">
              <h3 className="font-space font-semibold text-xs sm:text-sm text-white flex items-center gap-2">
                <Image size={15} className="text-amber-400" />
                <span>Phase 3 Spacecraft, Deep Space & SVS Registry</span>
              </h3>
              <div className="space-y-2">
                {ATTRIBUTION_REGISTRY.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <strong className="text-slate-100 text-xs">{item.assetName}</strong>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-950/60 border border-sky-400/30 text-sky-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] font-mono leading-relaxed">
                      Source: {item.sourceOrganization}
                    </p>
                    <p className="text-slate-400 text-[10px] leading-relaxed">
                      {item.requiredCredit}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>License: {item.licenseTerms}</span>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        Official Source Archive <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Legal Educational Disclaimer */}
            <section className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-[11px] text-slate-400 leading-relaxed font-sans">
              <strong className="text-slate-200 block mb-1 font-space">Educational Purpose & Public Domain Notice:</strong>
              {LEGAL_DISCLAIMER}
            </section>
          </div>

          {/* Footer */}
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
