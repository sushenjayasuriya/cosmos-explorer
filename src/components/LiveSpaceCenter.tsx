import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  X, 
  Globe2, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Maximize2
} from 'lucide-react';
import { 
  fetchNASAAPOD, 
  fetchISSTelemetry, 
  fetchNearEarthAsteroids, 
  type APODData, 
  type ISSTelemetry, 
  type NearEarthAsteroid 
} from '../services/nasaApi';

interface LiveSpaceCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveSpaceCenter: React.FC<LiveSpaceCenterProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'iss' | 'apod' | 'asteroids'>('iss');
  const [apod, setApod] = useState<APODData | null>(null);
  const [iss, setIss] = useState<ISSTelemetry | null>(null);
  const [asteroids, setAsteroids] = useState<NearEarthAsteroid[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Initial data loading
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    setLoading(true);

    Promise.all([
      fetchNASAAPOD(),
      fetchISSTelemetry(),
      fetchNearEarthAsteroids()
    ]).then(([apodRes, issRes, astRes]) => {
      if (isMounted) {
        setApod(apodRes);
        setIss(issRes);
        setAsteroids(astRes);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, refreshKey]);

  // Real-time ISS continuous telemetry polling every 4 seconds
  useEffect(() => {
    if (!isOpen || activeTab !== 'iss') return;

    const interval = setInterval(() => {
      fetchISSTelemetry().then((data) => setIss(data));
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-panel text-slate-100 shadow-2xl border border-sky-400/25 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-400 shadow-lg shadow-sky-500/20">
              <Radio size={20} className="animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-space font-bold text-lg sm:text-xl text-white">
                  NASA Live Space Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono uppercase font-bold tracking-wider">
                  Live Feed
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Direct Telemetry &bull; NASA Open APIs &bull; International Space Station
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              className="p-2 rounded-xl glass-button text-slate-300 hover:text-white transition-all"
              title="Refresh Telemetry"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin text-sky-400' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-button text-slate-300 hover:text-white transition-all"
              title="Close Live Center"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-white/10 bg-slate-950/40 overflow-x-auto">
          <button
            onClick={() => setActiveTab('iss')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-space font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'iss'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 size={15} className="text-sky-400" />
            <span>ISS Orbit Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('apod')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-space font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'apod'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={15} className="text-amber-400" />
            <span>NASA Picture of the Day</span>
          </button>

          <button
            onClick={() => setActiveTab('asteroids')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-space font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'asteroids'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Compass size={15} className="text-emerald-400" />
            <span>Near-Earth Asteroid Radar</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ISS LIVE TRACKER */}
          {activeTab === 'iss' && (
            <div className="space-y-6">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl glass-panel-subtle border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Latitude
                  </span>
                  <div className="font-space font-bold text-lg sm:text-xl text-sky-300">
                    {iss ? `${iss.latitude.toFixed(2)}°` : '...'}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {iss && iss.latitude >= 0 ? 'Northern Hemisphere' : 'Southern Hemisphere'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl glass-panel-subtle border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Longitude
                  </span>
                  <div className="font-space font-bold text-lg sm:text-xl text-sky-300">
                    {iss ? `${iss.longitude.toFixed(2)}°` : '...'}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {iss && iss.longitude >= 0 ? 'East Meridian' : 'West Meridian'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl glass-panel-subtle border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Altitude
                  </span>
                  <div className="font-space font-bold text-lg sm:text-xl text-emerald-300">
                    {iss ? `${iss.altitudeKm} km` : '...'}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Low Earth Orbit (LEO)
                  </span>
                </div>

                <div className="p-4 rounded-2xl glass-panel-subtle border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Orbital Velocity
                  </span>
                  <div className="font-space font-bold text-lg sm:text-xl text-amber-300">
                    {iss ? `${iss.velocityKmh.toLocaleString()} km/h` : '...'}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    ~7.66 km / second
                  </span>
                </div>
              </div>

              {/* Live SVG Earth Ground Track Map */}
              <div className="relative rounded-2xl glass-panel border border-white/10 p-4 sm:p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe2 size={16} className="text-sky-400" />
                    <h3 className="font-space font-bold text-sm text-white">
                      Live Sub-Satellite Ground Track
                    </h3>
                  </div>
                  {iss && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      iss.visibility === 'daylight'
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-indigo-400/20 text-indigo-300 border border-indigo-400/30'
                    }`}>
                      {iss.visibility === 'daylight' ? '☀️ In Orbital Daylight' : '🌑 In Earth Shadow'}
                    </span>
                  )}
                </div>

                {/* Simplified World Projection with live beacon */}
                <div className="relative w-full aspect-[2/1] bg-slate-950/90 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                  {/* Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="0%" y1="25%" x2="100%" y2="25%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 4" />
                    <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 4" />
                  </svg>

                  {/* Equator & Prime Meridian Labels */}
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500">
                    Equator 0°
                  </span>
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500">
                    Prime Meridian 0°
                  </span>

                  {/* ISS Position Marker */}
                  {iss && (
                    <div
                      className="absolute z-20 flex flex-col items-center pointer-events-none transition-all duration-1000 ease-out"
                      style={{
                        left: `${((iss.longitude + 180) / 360) * 100}%`,
                        top: `${((90 - iss.latitude) / 180) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="relative flex items-center justify-center w-8 h-8">
                        <div className="absolute w-8 h-8 rounded-full bg-sky-400/30 animate-ping" />
                        <div className="w-4 h-4 rounded-full bg-sky-400 border-2 border-white shadow-lg shadow-sky-400/80 flex items-center justify-center" />
                      </div>
                      <span className="px-2 py-0.5 rounded bg-black/80 border border-sky-400/50 text-sky-200 text-[10px] font-mono font-bold whitespace-nowrap shadow-xl">
                        ISS 🛸 ({iss.latitude.toFixed(1)}°, {iss.longitude.toFixed(1)}°)
                      </span>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-[11px] font-mono text-slate-400 leading-relaxed">
                  The ISS completes an entire orbit around Earth every 92.7 minutes at 51.6° orbital inclination, offering crew members 16 sunrises and sunsets every 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: NASA APOD */}
          {activeTab === 'apod' && apod && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 group">
                {apod.media_type === 'image' ? (
                  <div className="relative max-h-[460px] overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={apod.hdurl || apod.url}
                      alt={apod.title}
                      className="w-full h-full object-contain max-h-[460px]"
                    />
                    {apod.hdurl && (
                      <a
                        href={apod.hdurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 border border-white/20 text-sky-300 text-xs font-mono backdrop-blur-md transition-all shadow-lg"
                      >
                        <Maximize2 size={13} /> Full Resolution
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-slate-950">
                    <iframe
                      src={apod.url}
                      title={apod.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="p-4 sm:p-6 bg-slate-950/80">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-space font-bold text-xl sm:text-2xl text-white">
                      {apod.title}
                    </h3>
                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                      {apod.date}
                    </span>
                  </div>

                  {apod.copyright && (
                    <p className="text-xs font-mono text-slate-400 mb-3">
                      Credit: {apod.copyright}
                    </p>
                  )}

                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    {apod.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NEAR-EARTH ASTEROID RADAR */}
          {activeTab === 'asteroids' && (
            <div className="space-y-4">
              <div className="p-3 sm:p-4 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs font-sans text-sky-200 flex items-center gap-2">
                <Compass size={16} className="text-sky-400 flex-shrink-0" />
                <span>
                  Radar telemetry provided by NASA&apos;s NeoWS (Near Earth Object Web Service). Tracks small solar system bodies with close approaches to Earth.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {asteroids.map((neo) => (
                  <div
                    key={neo.id}
                    className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-sky-400/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-space font-bold text-base text-white">
                          {neo.name}
                        </h4>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                            neo.isPotentiallyHazardous
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                          }`}
                        >
                          {neo.isPotentiallyHazardous ? (
                            <>
                              <AlertTriangle size={11} /> Hazard Watch
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={11} /> Normal Flyby
                            </>
                          )}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono text-slate-300 mt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Est. Diameter:</span>
                          <span className="text-white">
                            {neo.estimatedDiameterMeters.min} – {neo.estimatedDiameterMeters.max} meters
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Relative Speed:</span>
                          <span className="text-amber-300">
                            {neo.relativeVelocityKmh.toLocaleString()} km/h
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Miss Distance:</span>
                          <span className="text-sky-300">
                            {neo.missDistanceLunar} Lunar Distances ({Math.round(neo.missDistanceKm / 1000).toLocaleString()}k km)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
