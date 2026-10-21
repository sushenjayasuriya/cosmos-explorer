import React, { useState, useEffect, useCallback } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  X, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Play, 
  Camera 
} from 'lucide-react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryMediaItem, type MediaCategory } from '../data/gallery';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('All');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVideoMuted] = useState(true);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Videos') return item.type === 'video';
    return item.category === selectedCategory;
  });

  const activeItem: GalleryMediaItem | undefined =
    activeItemIndex !== null ? filteredItems[activeItemIndex] : undefined;

  const handleOpenLightbox = (index: number) => {
    setActiveItemIndex(index);
    setIsZoomed(false);
  };

  const handleCloseLightbox = () => {
    setActiveItemIndex(null);
    setIsZoomed(false);
  };

  const handleNext = useCallback(() => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => ((prev! + 1) % filteredItems.length));
      setIsZoomed(false);
    }
  }, [activeItemIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) => ((prev! - 1 + filteredItems.length) % filteredItems.length));
      setIsZoomed(false);
    }
  }, [activeItemIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 sm:pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Camera size={14} className="text-sky-400" />
          <span>Curated NASA & ESA Deep Space Imagery</span>
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider">
          DEEP SPACE GALLERY
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl font-sans leading-relaxed">
          Witness the universe as captured by the James Webb Space Telescope, Hubble, Juno, Cassini, and the NASA Scientific Visualization Studio. Every asset includes full scientific attribution and original source archives.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-10 flex items-center gap-1.5 flex-wrap p-2 rounded-2xl glass-panel border border-white/10">
        {GALLERY_CATEGORIES.map((cat) => {
          const count =
            cat === 'All'
              ? GALLERY_ITEMS.length
              : cat === 'Videos'
              ? GALLERY_ITEMS.filter((i) => i.type === 'video').length
              : GALLERY_ITEMS.filter((i) => i.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap leading-none flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat === 'Videos' && <Video size={13} className="flex-shrink-0" />}
              <span>{cat}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(index)}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-sky-400/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
          >
            {/* Image Thumbnail */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />

              {/* Type Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-slate-900/85 backdrop-blur-md border border-white/15 text-sky-300 uppercase shadow-md flex items-center gap-1">
                  {item.type === 'video' ? <Video size={12} className="text-amber-400" /> : <ImageIcon size={12} className="text-sky-400" />}
                  <span>{item.category}</span>
                </span>
              </div>

              {/* Video Play Indicator */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={20} className="ml-1" />
                  </div>
                </div>
              )}

              {/* Bottom Card Title & Source */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-space font-bold text-sm sm:text-base text-white group-hover:text-sky-300 transition-colors line-clamp-1 drop-shadow">
                  {item.title}
                </h3>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5 line-clamp-1">
                  {item.missionOrTelescope} • {item.credit}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-200"
        >
          {/* Lightbox Header */}
          <div className="px-4 sm:px-8 py-4 flex items-center justify-between border-b border-white/10 z-10 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-sky-400 font-bold">
                {activeItemIndex! + 1} / {filteredItems.length}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {activeItem.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeItem.type === 'image' && (
                <button
                  onClick={() => setIsZoomed((z) => !z)}
                  className="p-2 rounded-xl border border-white/10 glass-button text-slate-300 hover:text-white"
                  title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                >
                  {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                </button>
              )}

              <a
                href={activeItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-white/10 glass-button text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono"
                title="View in Official NASA Archive"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">NASA Source</span>
              </a>

              <button
                onClick={handleCloseLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all ml-2"
                title="Close Lightbox (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Lightbox Center Media Display */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 p-3 rounded-full bg-slate-950/80 hover:bg-sky-500/40 border border-white/15 text-white transition-all hover:scale-110"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Media Content */}
            <div className="max-w-5xl max-h-[70vh] flex items-center justify-center overflow-auto">
              {activeItem.type === 'image' ? (
                <img
                  src={activeItem.fullResUrl}
                  alt={activeItem.title}
                  className={`max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl transition-all duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed((z) => !z)}
                />
              ) : (
                /* Video Player with controls */
                <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10 flex flex-col justify-between">
                  <video
                    src={activeItem.videoUrl}
                    poster={activeItem.thumbnailUrl}
                    controls
                    autoPlay={false}
                    muted={isVideoMuted}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-20 p-3 rounded-full bg-slate-950/80 hover:bg-sky-500/40 border border-white/15 text-white transition-all hover:scale-110"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Lightbox Footer Info Panel */}
          <div className="px-4 sm:px-8 py-5 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl z-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-space font-bold text-lg sm:text-xl text-white">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-1 max-w-3xl leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 flex-shrink-0">
                <span className="text-sky-300 font-semibold">{activeItem.missionOrTelescope}</span>
                <span>Credit: {activeItem.credit}</span>
                <span className="text-[10px] text-slate-500">{activeItem.dateCaptured}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
