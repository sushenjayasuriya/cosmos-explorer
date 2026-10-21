import React from 'react';
import { type CelestialBody } from '../data/planets';

interface ScreenSpaceSelectionLabelProps {
  body: CelestialBody | undefined;
  isOverview: boolean;
  isFocusMode: boolean;
}

export const ScreenSpaceSelectionLabel: React.FC<ScreenSpaceSelectionLabelProps> = ({
  body,
  isOverview,
  isFocusMode,
}) => {
  if (!body || isOverview || isFocusMode) {
    return null;
  }

  // Format category name for badge
  const categoryLabel = body.category === 'Star' 
    ? 'STAR' 
    : body.category === 'Moon' 
    ? 'MOON' 
    : body.category.toUpperCase().replace(' PLANET', '');

  return (
    <div
      id="cosmos-screen-selection-label"
      className="fixed top-0 left-0 z-35 pointer-events-none select-none transition-opacity duration-200"
      style={{
        transform: 'translate3d(-9999px, -9999px, 0px)',
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    >
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-400/40 shadow-2xl shadow-sky-500/25 text-white whitespace-nowrap">
        {/* Pulsing body color dot */}
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse shadow-sm"
          style={{ backgroundColor: body.color, boxShadow: `0 0 10px ${body.glowColor}` }}
        />
        
        {/* Celestial body name */}
        <span className="font-space font-bold text-xs sm:text-sm tracking-wide text-white drop-shadow-md">
          {body.name.replace(/ \(.*\)/, '')}
        </span>

        {/* Category tag */}
        <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30 tracking-wider">
          {categoryLabel}
        </span>
      </div>
    </div>
  );
};
