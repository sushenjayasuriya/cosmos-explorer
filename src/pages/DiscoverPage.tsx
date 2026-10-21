import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ARTICLES_DATA, ARTICLE_CATEGORIES } from '../data/articles';

export const DiscoverPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const featuredArticle = ARTICLES_DATA[0];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || article.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono tracking-widest uppercase mb-4">
          <BookOpen size={14} className="text-sky-400" />
          <span>Astronomy Encyclopedia</span>
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider">
          DISCOVER THE COSMOS
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-3xl font-sans leading-relaxed">
          Deepen your understanding of astrophysics, stellar life cycles, black holes, exoplanets, and deep-space technology. Researched and verified with peer-reviewed scientific references.
        </p>
      </div>

      {/* Featured Article Hero (Shown when no search/filter is active) */}
      {!searchQuery && selectedCategory === 'All' && (
        <div className="mb-12 rounded-3xl glass-panel border border-sky-400/30 overflow-hidden shadow-2xl relative group">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto overflow-hidden bg-slate-950">
              <img
                src={featuredArticle.heroImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    <Sparkles size={11} /> Featured Article
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {featuredArticle.category}
                  </span>
                </div>

                <h2 className="font-space font-bold text-2xl sm:text-3xl text-white group-hover:text-sky-300 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-sky-300/80 font-mono mt-1">
                  {featuredArticle.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-4 leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Clock size={13} /> {featuredArticle.readTimeMinutes} min read • {featuredArticle.authorAgency}
                </span>

                <Link
                  to={`/discover/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white font-space font-semibold text-xs shadow-lg shadow-sky-500/25 hover:bg-sky-400 transition-all hover:scale-105"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mb-10 p-4 sm:p-6 rounded-2xl glass-panel border border-white/10 space-y-4 shadow-xl">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search encyclopedia by keyword, topic, or theory..."
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap leading-none ${
              selectedCategory === 'All'
                ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            All Categories ({ARTICLES_DATA.length})
          </button>
          {ARTICLE_CATEGORIES.map((cat) => {
            const count = ARTICLES_DATA.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap leading-none ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-2xl border border-white/10">
          <BookOpen size={40} className="mx-auto text-slate-500 mb-3" />
          <h3 className="font-space font-bold text-lg text-white">No articles found</h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Try adjusting your search terms or select another astronomy category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/discover/${article.slug}`}
              className="group flex flex-col rounded-2xl glass-panel border border-white/10 hover:border-sky-400/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
            >
              {/* Image banner */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-sky-400/40 text-sky-300 text-[10px] font-mono font-bold tracking-wider uppercase">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded">
                  <Clock size={11} /> {article.readTimeMinutes} min read
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-space font-bold text-lg text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sky-400 font-space font-semibold group-hover:text-white transition-colors">
                  <span>Explore Topic</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
