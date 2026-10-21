import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  Compass, 
  Thermometer, 
  Clock, 
  CircleDot, 
  Layers, 
  Rocket, 
  Info, 
  Minimize2,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MISSIONS_DATA } from '../data/missions';
import { type CelestialBody } from '../data/planets';

interface PlanetInfoPanelProps {
  body: CelestialBody;
  onClose: () => void;
  onFocus: () => void;
  onSelectMoon?: (moonId: string) => void;
  onReturnToParent?: (parentId: string) => void;
}

type TabType = 'overview' | 'astronomy' | 'atmosphere' | 'missions';

export const PlanetInfoPanel: React.FC<PlanetInfoPanelProps> = ({
  body,
  onClose,
  onFocus,
  onSelectMoon,
  onReturnToParent,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, x: 40, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 40, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-30 flex flex-col rounded-2xl glass-panel text-slate-100 shadow-2xl border border-white/15 overflow-hidden transition-all duration-300 ${
          isMinimized
            ? 'bottom-28 right-4 sm:right-6 w-auto p-2'
            : 'top-20 right-4 sm:right-6 bottom-36 sm:bottom-40 w-[92vw] sm:w-[410px] lg:w-[430px]'
        }`}
      >
        {/* Minimized Compact Capsule State */}
        {isMinimized ? (
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-900/80 rounded-xl">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: body.color }}
            />
            <span className="font-space font-bold text-sm text-white">{body.name}</span>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1 rounded-lg text-sky-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-space font-semibold"
              title="Expand Details"
            >
              <span>Expand</span>
              <ChevronUp size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Panel"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <>
            {/* STICKY HEADER */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/75 flex-shrink-0 flex items-start justify-between gap-3">
              <div className="min-w-0">
                {/* Moon Return Breadcrumb if exploring a moon */}
                {body.category === 'Moon' && body.parentId && (
                  <button
                    onClick={() => onReturnToParent?.(body.parentId!)}
                    className="inline-flex items-center gap-1 text-[11px] text-sky-300 hover:text-white font-mono mb-1.5 transition-colors group"
                  >
                    <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                    <span>Return to {body.parentId.toUpperCase()}</span>
                  </button>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20 flex-shrink-0"
                    style={{ backgroundColor: body.color }}
                  />
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-sky-300">
                    {body.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {body.category === 'Moon'
                      ? 'Satellite'
                      : body.distanceFromSunAU > 0
                      ? `${body.distanceFromSunAU} AU`
                      : 'Central Star'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-space mt-1 tracking-tight text-white truncate">
                  {body.name}
                </h2>
                <p className="text-xs text-sky-200/80 italic mt-0.5 leading-snug">{body.tagline}</p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize Panel"
                  aria-label="Minimize Panel"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close Panel"
                  aria-label="Close Panel"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* STICKY TAB NAVIGATION */}
            <nav 
              className="flex border-b border-white/10 bg-slate-950/60 px-3 pt-2 gap-1 text-xs font-space overflow-x-auto flex-shrink-0"
              aria-label="Planet Information Tabs"
            >
              {(
                [
                  { id: 'overview', label: 'Overview' },
                  { id: 'astronomy', label: 'Astronomy Data' },
                  { id: 'atmosphere', label: 'Atmosphere' },
                  { id: 'missions', label: 'Missions' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-t-lg transition-all relative whitespace-nowrap text-xs ${
                    activeTab === tab.id
                      ? 'text-sky-300 font-semibold bg-white/10 border-b-2 border-sky-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* SCROLLABLE BODY */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs leading-relaxed text-slate-300">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{body.overview}</p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
                        <CircleDot size={12} className="text-sky-400" /> Diameter
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mt-1">
                        {body.diameterKm.toLocaleString()} km
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {body.diameterRelativeToEarth === 1
                          ? 'Earth Reference'
                          : `${body.diameterRelativeToEarth}× Earth`}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
                        <Clock size={12} className="text-amber-400" /> Orbit Period
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mt-1">
                        {body.orbitalPeriodDays > 0 ? `${body.orbitalPeriodDays.toLocaleString()} d` : 'Galactic'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {body.orbitalPeriodDescription}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
                        <Thermometer size={12} className="text-red-400" /> Mean Temp
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mt-1">
                        {body.meanTempC}°C
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {body.tempRangeC}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono">
                        <Layers size={12} className="text-emerald-400" /> Moons
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mt-1">
                        {body.confirmedMoons}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {body.category === 'Moon' ? 'Natural Satellite' : body.confirmedMoons === 0 ? 'No moons' : 'Satellites'}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Moons Selector Card Section */}
                  {body.interactiveMoons && body.interactiveMoons.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-300 font-mono">
                          Major Moons to Explore ({body.interactiveMoons.length})
                        </h4>
                        <span className="text-[10px] text-slate-400">Click to Orbit</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {body.interactiveMoons.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => onSelectMoon?.(m.id)}
                            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-sky-500/15 border border-white/10 hover:border-sky-400/40 text-left transition-all flex items-center justify-between group"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-space font-bold text-xs text-white group-hover:text-sky-300">
                                  {m.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {m.diameterKm.toLocaleString()} km
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{m.feature}</p>
                            </div>
                            <ChevronRight size={15} className="text-slate-500 group-hover:text-sky-400 flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notable Features */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                      Notable Geological & Physical Features
                    </h3>
                    <ul className="space-y-1.5">
                      {body.notableFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-[11px] sm:text-xs">
                          <ChevronRight size={13} className="text-sky-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Scale Explanation */}
                  <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/25 text-sky-200/90 text-[11px] leading-relaxed flex gap-2.5">
                    <Info size={16} className="text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sky-300 mb-0.5">Scale Note:</strong>
                      {body.scaleNote}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: ASTRONOMY DATA */}
              {activeTab === 'astronomy' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Mass (Scientific Notation)</span>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-white text-sm font-semibold">{body.massScientific}</span>
                      <span className="font-mono text-sky-300 text-xs">{body.massRelativeToEarth}× Earth</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-slate-400 text-[11px] block">
                      {body.category === 'Moon' ? 'Distance from Sun / Parent' : 'Distance From Sun'}
                    </span>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-white text-sm font-semibold">{body.distanceFromSunAU} AU</span>
                      <span className="font-mono text-slate-300 text-xs">{body.distanceFromSunMillionKm.toLocaleString()}M km</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Surface Gravity</span>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-white text-sm font-semibold">{body.surfaceGravityMs2} m/s²</span>
                      <span className="font-mono text-amber-300 text-xs">{body.surfaceGravityG} g</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Axial Tilt (Obliquity)</span>
                    <span className="font-mono text-amber-300 text-sm font-semibold block">{body.axialTiltDeg}°</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Rotation Period (Day Length)</span>
                    <span className="font-mono text-white text-xs font-medium block leading-relaxed">
                      {body.rotationPeriodDescription}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: ATMOSPHERE */}
              {activeTab === 'atmosphere' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <p className="text-slate-300 text-xs">
                    Atmospheric constituents & surface gas environment:
                  </p>

                  <div className="space-y-2 pt-1">
                    {body.atmosphereComposition.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between"
                      >
                        <span className="font-medium text-slate-200 text-xs">{item}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 border border-sky-400/30 text-sky-300">
                          Constituent
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: MISSIONS */}
              {activeTab === 'missions' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {/* Featured Deep-Dive Spacecraft Missions */}
                  {(() => {
                    const featured = MISSIONS_DATA.filter((m) =>
                      m.relatedBodyIds.includes(body.id) ||
                      body.missions.some((bm) => m.name.toLowerCase().includes(bm.name.toLowerCase()))
                    );

                    if (featured.length === 0) return null;

                    return (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold">
                            Featured Exploration Probes ({featured.length})
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">Click for 3D & Telemetry</span>
                        </div>
                        {featured.map((fm) => (
                          <Link
                            key={fm.id}
                            to={`/missions/${fm.id}`}
                            className="p-3 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900/60 border border-sky-400/40 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 transition-all flex items-center justify-between group block"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <Rocket size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
                                <span className="font-space font-bold text-xs text-white group-hover:text-sky-300">
                                  {fm.name}
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                                  {fm.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300 font-sans mt-1 line-clamp-1">
                                {fm.tagline}
                              </p>
                            </div>
                            <ChevronRight size={15} className="text-sky-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                          </Link>
                        ))}
                      </div>
                    );
                  })()}

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 pt-1">
                    Historic & Planned Missions
                  </div>

                  {body.missions.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="font-bold text-slate-100 flex items-center gap-1.5 text-xs">
                          <Rocket size={13} className="text-sky-400" />
                          {m.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/20">
                          {m.agency} · {m.year}
                        </span>
                      </div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">
                        Type: {m.type}
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{m.summary}</p>
                    </div>
                  ))}

                  <div className="pt-2">
                    <Link
                      to="/missions"
                      className="w-full py-2.5 rounded-xl glass-panel-subtle hover:bg-sky-500/20 border border-sky-400/30 text-sky-300 hover:text-white text-xs font-space font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Explore Complete Missions Fleet</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* STICKY FOOTER ACTION */}
            <div className="p-3 sm:p-3.5 border-t border-white/10 bg-slate-900/80 flex items-center gap-2 flex-shrink-0">
              {body.category === 'Moon' && body.parentId ? (
                <button
                  onClick={() => onReturnToParent?.(body.parentId!)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={13} /> Return to {body.parentId.toUpperCase()}
                </button>
              ) : null}

              <button
                onClick={onFocus}
                className="flex-1 py-2 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-[0.99] text-slate-950 font-bold text-xs uppercase tracking-wider font-space flex items-center justify-center gap-1.5 shadow-lg shadow-sky-500/20 transition-all"
              >
                <Compass size={14} /> Orbit Closer
              </button>
            </div>
          </>
        )}
      </motion.aside>
    </AnimatePresence>
  );
};
