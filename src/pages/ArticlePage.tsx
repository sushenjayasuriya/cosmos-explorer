import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  ExternalLink, 
  BookOpen, 
  Sparkles, 
  Share2, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import { ARTICLES_DATA, type AstronomyArticle } from '../data/articles';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const article: AstronomyArticle | undefined = ARTICLES_DATA.find((a) => a.slug === slug);

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <BookOpen size={48} className="text-slate-500 mb-4 animate-bounce" />
        <h2 className="font-space font-bold text-2xl text-white">Article Not Found</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-md">
          The requested astronomy article could not be located in our research library.
        </p>
        <Link
          to="/discover"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-mono hover:bg-sky-500/30 transition-all"
        >
          <ArrowLeft size={14} /> Back to Discover Library
        </Link>
      </div>
    );
  }

  // Find related articles
  const relatedArticles = ARTICLES_DATA.filter(
    (a) => article.relatedSlugs.includes(a.slug) || (a.category === article.category && a.slug !== article.slug)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-20 sm:pt-24 pb-24">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 h-1 z-50 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation Strip */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5">
        <button
          onClick={() => navigate('/discover')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Library
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border border-white/10 glass-button text-slate-300 hover:text-white"
            title="Copy Article Link"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
            <span>{copied ? 'COPIED' : 'SHARE'}</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden bg-slate-950">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />

        <div className="absolute bottom-8 left-4 right-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-sky-500/20 border border-sky-400/40 text-sky-300 uppercase">
              {article.category}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock size={12} /> {article.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="font-space font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="font-mono text-xs sm:text-sm text-sky-300/80 mt-2">
            {article.subtitle}
          </p>
        </div>
      </div>

      {/* Article Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        {/* Metadata bar */}
        <div className="p-4 rounded-xl glass-panel-subtle border border-white/5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 mb-10 gap-2">
          <span>Author / Agency: <strong className="text-slate-200">{article.authorAgency}</strong></span>
          <span>Verified Reference Data</span>
        </div>

        {/* Lead summary */}
        <div className="p-6 rounded-2xl glass-panel border border-sky-400/30 shadow-xl mb-10">
          <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed italic">
            "{article.summary}"
          </p>
        </div>

        {/* Article Sections */}
        <article className="space-y-12">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-space font-bold text-xl sm:text-2xl text-white border-b border-white/10 pb-2">
                {section.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Scientific Fact Callout */}
              {section.keyFact && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900/60 border-l-4 border-sky-400 border border-white/5 my-6 flex items-start gap-3">
                  <Sparkles size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
                      Scientific Insight
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans font-medium">
                      {section.keyFact}
                    </p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Academic References */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="font-space font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">
            Research Citations & Verified Sources
          </h3>
          <div className="space-y-2">
            {article.sources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-sky-300 transition-colors"
              >
                <span>{src.title}</span>
                <ExternalLink size={13} className="text-slate-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <h3 className="font-space font-bold text-lg text-white mb-6">
              Continue Exploring
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((ra) => (
                <Link
                  key={ra.slug}
                  to={`/discover/${ra.slug}`}
                  className="p-4 rounded-xl glass-panel border border-white/10 hover:border-sky-400/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold text-sky-400 uppercase">
                      {ra.category}
                    </span>
                    <h4 className="font-space font-bold text-sm text-white group-hover:text-sky-300 transition-colors mt-1 line-clamp-2">
                      {ra.title}
                    </h4>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{ra.readTimeMinutes} min</span>
                    <ChevronRight size={14} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
