import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Rocket, 
  Calendar, 
  Compass, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Orbit, 
  Layers, 
  Cpu, 
  Award,
  ChevronRight
} from 'lucide-react';
import { MISSIONS_DATA, type SpaceMission } from '../data/missions';
import { SpacecraftViewer } from '../components/SpacecraftViewer';

export const MissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const mission: SpaceMission | undefined = MISSIONS_DATA.find((m) => m.id === id);

  if (!mission) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <Rocket size={48} className="text-slate-500 mb-4 animate-bounce" />
        <h2 className="font-space font-bold text-2xl text-white">Mission Not Found</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          The requested space exploration mission does not exist or has been relocated in the archives.
        </p>
        <Link
          to="/missions"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono hover:bg-sky-500/30 transition-all"
        >
          <ArrowLeft size={14} /> Back to Missions Fleet
        </Link>
      </div>
    );
  }

  // Find related missions
  const relatedMissions = MISSIONS_DATA.filter(
    (m) => m.id !== mission.id && m.destinationCategory === mission.destinationCategory
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-20 sm:pt-24 pb-24">
      {/* Back button header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between border-b border-white/5">
        <button
          onClick={() => navigate('/missions')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to All Missions
        </button>

        {mission.relatedBodyIds.length > 0 && (
          <Link
            to={`/?body=${mission.relatedBodyIds[0]}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 hover:text-white text-xs font-space font-semibold transition-all shadow-sm"
          >
            <Orbit size={14} />
            <span>Explore {mission.relatedBodyIds[0].toUpperCase()} in 3D</span>
          </Link>
        )}
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] overflow-hidden bg-slate-950">
        <img
          src={mission.spacecraftImage}
          alt={mission.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-8 left-4 right-4 sm:left-8 sm:right-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-sky-500/25 border border-sky-400/50 text-sky-300 uppercase">
              {mission.agency}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                mission.status === 'Active'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : mission.status === 'En Route'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-slate-700/40 text-slate-300 border-slate-500/40'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${mission.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              {mission.status}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-1">
              <Calendar size={12} /> Launched {mission.launchDate}
            </span>
          </div>

          <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide">
            {mission.name}
          </h1>
          <p className="font-space text-sm sm:text-lg text-sky-300/90 mt-2 max-w-3xl font-medium">
            {mission.tagline}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Overview, 3D Model, Timeline, Discoveries */}
        <div className="lg:col-span-2 space-y-12">
          {/* Mission Overview */}
          <section className="space-y-4">
            <h2 className="font-space font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <Layers size={20} className="text-sky-400" />
              <span>Mission Overview</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              {mission.longOverview}
            </p>

            <div className="p-4 rounded-xl glass-panel-subtle border border-white/5 text-xs font-mono text-slate-400">
              <span className="text-sky-300 font-bold">Status as of:</span> {mission.statusAsOf}
            </div>
          </section>

          {/* Interactive 3D Spacecraft Viewer (Task 3) */}
          {mission.modelConfig?.has3DViewer && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-space font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
                  <Rocket size={20} className="text-amber-400" />
                  <span>Interactive 3D Spacecraft Viewer</span>
                </h2>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-400/30">
                  Click hotspots to inspect
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Drag to rotate in 3D space, scroll to zoom, and select interactive subsystem pins to inspect hardware instruments.
              </p>
              <SpacecraftViewer config={mission.modelConfig} missionName={mission.name} />
            </section>
          )}

          {/* Mission Objectives */}
          <section className="space-y-4">
            <h2 className="font-space font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <Compass size={20} className="text-emerald-400" />
              <span>Primary Scientific Objectives</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mission.objectives.map((obj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass-panel border border-white/10 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5 font-bold">
                    {i + 1}
                  </span>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Scientific Discoveries */}
          <section className="space-y-4">
            <h2 className="font-space font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <Award size={20} className="text-amber-400" />
              <span>Key Scientific Discoveries</span>
            </h2>
            <div className="space-y-3">
              {mission.keyDiscoveries.map((disc, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass-panel border border-white/10 flex items-start gap-3.5 hover:border-sky-400/40 transition-colors"
                >
                  <CheckCircle2 size={18} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed font-medium">
                    {disc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Milestone Timeline */}
          <section className="space-y-6">
            <h2 className="font-space font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
              <Clock size={20} className="text-sky-400" />
              <span>Chronological Milestones</span>
            </h2>
            <div className="relative pl-6 border-l-2 border-sky-500/30 space-y-8 my-4">
              {mission.milestones.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:bg-sky-400 transition-colors shadow-sm" />
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider uppercase">
                    {milestone.date}
                  </span>
                  <h4 className="font-space font-bold text-sm sm:text-base text-white mt-0.5">
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Specifications & Links */}
        <div className="space-y-8">
          {/* Specifications Card */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-6 sticky top-28">
            <h3 className="font-space font-bold text-lg text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Cpu size={18} className="text-sky-400" />
              <span>Spacecraft Specifications</span>
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Launch Vehicle</span>
                <span className="text-white font-semibold">{mission.specifications.launchVehicle}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Launch Mass</span>
                <span className="text-white font-semibold">{mission.specifications.launchMassKg.toLocaleString()} kg</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Power System</span>
                <span className="text-white font-semibold">{mission.specifications.powerSource}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Mission Duration</span>
                <span className="text-white font-semibold">{mission.specifications.missionDuration}</span>
              </div>
              {mission.specifications.costEstimate && (
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Program Budget</span>
                  <span className="text-white font-semibold">{mission.specifications.costEstimate}</span>
                </div>
              )}
            </div>

            {/* Scientific Instrument Payload */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-slate-400 font-mono text-[10px] uppercase block mb-2">
                Primary Science Instruments
              </span>
              <ul className="space-y-1.5">
                {mission.specifications.primaryInstruments.map((inst, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-1.5" />
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Source References */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-slate-400 font-mono text-[10px] uppercase block mb-1">
                Verified NASA / JPL References
              </span>
              {mission.officialSourceUrls.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-sky-300 transition-colors"
                >
                  <span className="truncate pr-2">{link.label}</span>
                  <ExternalLink size={12} className="flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Related Missions Card */}
          {relatedMissions.length > 0 && (
            <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-4">
              <h4 className="font-space font-bold text-sm text-white uppercase tracking-wider">
                Related {mission.destinationCategory} Missions
              </h4>
              <div className="space-y-3">
                {relatedMissions.slice(0, 3).map((rm) => (
                  <Link
                    key={rm.id}
                    to={`/missions/${rm.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-sky-500/10 border border-white/5 hover:border-sky-400/40 transition-all group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors block">
                        {rm.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {rm.agency} • {rm.status}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-sky-300 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
