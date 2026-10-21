import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Rocket, Compass, Calendar, ArrowRight, Orbit } from 'lucide-react';
import { MISSIONS_DATA, MISSION_DESTINATIONS, MISSION_STATUSES } from '../data/missions';

export const MissionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredMissions = useMemo(() => {
    return MISSIONS_DATA.filter((m) => {
      // Search filter
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.primaryDestination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Destination filter
      const matchesDest =
        selectedDestination === 'All' || m.destinationCategory === selectedDestination;

      // Status filter
      const matchesStatus =
        selectedStatus === 'All' || m.status === selectedStatus;

      return matchesSearch && matchesDest && matchesStatus;
    });
  }, [searchQuery, selectedDestination, selectedStatus]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="relative mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Rocket size={14} className="text-sky-400" />
          <span>Space Exploration Fleet</span>
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-tight break-words">
          MISSIONS BEYOND EARTH
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl font-sans leading-relaxed">
          From the outer heliosphere to the dusty canyons of Mars, explore the robotic explorers, telescopes, and orbiters that have redefined humanity&apos;s place in the cosmos. Verified with authentic NASA, JPL, and ESA mission telemetry.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 p-4 sm:p-6 rounded-2xl glass-panel border border-white/10 space-y-4 shadow-xl">
        {/* Search input */}
        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search missions by name, objective, target, or instruments..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/15 text-sm font-sans placeholder-slate-500 text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-white/5">
          {/* Destination Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1 whitespace-nowrap">
              <Compass size={13} /> Destination:
            </span>
            {MISSION_DESTINATIONS.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap leading-none ${
                  selectedDestination === dest
                    ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>

          {/* Status Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1 whitespace-nowrap">
              <Filter size={13} /> Status:
            </span>
            {MISSION_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap leading-none ${
                  selectedStatus === status
                    ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Grid */}
      {filteredMissions.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-2xl border border-white/10">
          <Rocket size={40} className="mx-auto text-slate-500 mb-3" />
          <h3 className="font-space font-bold text-lg text-white">No missions found</h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Try adjusting your search query or reset your destination/status filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDestination('All');
              setSelectedStatus('All');
            }}
            className="mt-4 px-4 py-1.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono hover:bg-sky-500/30 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMissions.map((mission) => (
            <div
              key={mission.id}
              className="group flex flex-col rounded-2xl glass-panel border border-white/10 hover:border-sky-400/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src={mission.spacecraftImage}
                  alt={mission.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-lg whitespace-nowrap leading-none ${
                      mission.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : mission.status === 'En Route'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : 'bg-slate-700/40 text-slate-300 border-slate-500/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        mission.status === 'Active'
                          ? 'bg-emerald-400 animate-pulse'
                          : mission.status === 'En Route'
                          ? 'bg-amber-400 animate-ping'
                          : 'bg-slate-400'
                      }`}
                    />
                    {mission.status}
                  </span>
                </div>

                {/* 3D Model Badge */}
                {mission.modelConfig?.has3DViewer && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-500/30 border border-sky-400/60 text-sky-200 text-[9px] font-mono font-bold tracking-widest shadow-md whitespace-nowrap leading-none">
                      3D MODEL
                    </span>
                  </div>
                )}

                {/* Agency info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-300">
                    {mission.agency}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar size={11} /> {mission.launchDate}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-space font-bold text-xl text-white group-hover:text-sky-300 transition-colors">
                    {mission.name}
                  </h3>
                  <p className="text-xs font-mono text-sky-400 mt-1 line-clamp-1">
                    {mission.primaryDestination}
                  </p>
                  <p className="text-xs text-slate-300 font-sans mt-3 line-clamp-3 leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <Link
                    to={`/missions/${mission.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/35 border border-sky-400/40 text-sky-200 hover:text-white text-xs font-space font-semibold transition-all group-hover:shadow-lg group-hover:shadow-sky-500/20"
                  >
                    <span>Mission Details</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Quick link to view destination in 3D Solar System */}
                  {mission.relatedBodyIds.length > 0 && (
                    <Link
                      to={`/?body=${mission.relatedBodyIds[0]}`}
                      className="p-2 rounded-xl border border-white/10 glass-button text-slate-400 hover:text-sky-300 transition-colors"
                      title={`View ${mission.relatedBodyIds[0]} in 3D Solar System`}
                    >
                      <Orbit size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
