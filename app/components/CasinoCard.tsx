'use client';

import { Casino } from '../data/casinos';
import { logos } from './CasinoLogos';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface CasinoCardProps {
  casino: Casino;
  rank?: number;
  badge?: 'gold' | 'silver' | 'bronze' | 'fourth';
  isOnline?: boolean;
}

const RANK_META: Record<number, { accent: string; glow: string; crown: string; label: string }> = {
  1: { accent: 'from-amber-500 via-yellow-400 to-amber-500', glow: 'rgba(245,158,11,0.35)', crown: '👑', label: '#1 Pick' },
  2: { accent: 'from-slate-400 via-slate-200 to-slate-400',  glow: 'rgba(148,163,184,0.25)', crown: '⭐', label: '#2 Pick' },
  3: { accent: 'from-orange-600 via-orange-400 to-orange-600', glow: 'rgba(234,88,12,0.25)', crown: '🥉', label: '#3 Pick' },
};

const SPORT_MARKETS = ['⚽ Football', '🎾 Tennis', '🏀 Basketball', '🏈 NFL', '🎰 Casino'];

export default function CasinoCard({ casino, rank }: CasinoCardProps) {
  const meta = rank && rank <= 3 ? RANK_META[rank] : null;

  const handleClick = () => {
    if (casino.isMobile) track('Casino Click', { casino: casino.name });
    window.open(casino.url, '_blank', 'noopener,noreferrer');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
  };

  const renderLogo = () => {
    if (typeof casino.logo === 'string' && casino.logo.startsWith('/')) {
      return (
        <Image
          src={casino.logo}
          alt={casino.name}
          width={220}
          height={80}
          className="h-full w-full object-contain"
        />
      );
    }
    return logos[casino.logo as keyof typeof logos];
  };

  return (
    <article
      className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-400"
      style={{
        background: 'linear-gradient(160deg, #0f1e17 0%, #0b1520 40%, #0f1a0e 100%)',
        boxShadow: meta ? `0 0 40px ${meta.glow}, 0 8px 32px rgba(0,0,0,0.6)` : '0 8px 32px rgba(0,0,0,0.5)',
        border: '1px solid rgba(16,185,129,0.18)',
      }}
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Animated top border gradient */}
      {meta && (
        <div
          className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${meta.accent}`}
          style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}
        />
      )}
      {!meta && (
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      )}

      {/* Rank badge — top-left */}
      {rank && meta && (
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          <span className="text-lg leading-none">{meta.crown}</span>
          <span className={`text-[11px] font-black uppercase tracking-wider bg-gradient-to-r ${meta.accent} bg-clip-text text-transparent`}>
            {meta.label}
          </span>
        </div>
      )}
      {rank && !meta && (
        <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <span className="text-[10px] font-black text-emerald-400">#{rank}</span>
        </div>
      )}

      {/* Rating — top-right */}
      <div className="absolute top-3.5 right-4 flex flex-col items-end">
        <div
          className="text-2xl font-black leading-none"
          style={{
            background: 'linear-gradient(135deg, #10b981, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {casino.rating.toFixed(1)}
        </div>
        <div className="text-amber-400/80 text-xs mt-0.5">★★★★★</div>
      </div>

      {/* Logo area */}
      <div className="pt-12 px-5 pb-4">
        <div className="h-16 flex items-center justify-start [&>svg]:fill-white [&>svg]:text-white [&>svg]:w-auto [&>svg]:h-full">
          {renderLogo()}
        </div>
      </div>

      {/* Divider with glow */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Bonus strip */}
      <div className="mx-5 mt-4 mb-3 rounded-2xl overflow-hidden relative">
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(45deg, rgba(16,185,129,0.04) 0px, rgba(16,185,129,0.04) 1px, transparent 1px, transparent 8px)',
          }}
        />
        <div className="relative px-4 py-3 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(245,158,11,0.07))' }}>
          <p className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-[0.2em] mb-1">Welcome Offer</p>
          <p className="text-sm sm:text-base font-extrabold text-white leading-snug">{casino.bonus}</p>
        </div>
      </div>

      {/* Sport market pills */}
      <div className="px-5 mb-4 flex flex-wrap gap-1.5">
        {SPORT_MARKETS.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="text-[10px] font-semibold text-slate-400/60 rounded-full px-2.5 py-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA button */}
      <div className="px-5 pb-4">
        <a
          href={casino.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => { e.stopPropagation(); if (casino.isMobile) track('Casino Click', { casino: casino.name }); }}
          className="relative block w-full overflow-hidden rounded-2xl text-center font-black text-sm uppercase tracking-widest py-3.5 transition-all duration-300 group-hover:scale-[1.02]"
          style={{
            background: meta
              ? `linear-gradient(90deg, #059669, #f59e0b, #059669)`
              : 'linear-gradient(90deg, #065f46, #10b981, #065f46)',
            backgroundSize: '200% auto',
            animation: 'shimmer 4s linear infinite',
            color: '#fff',
            boxShadow: meta ? `0 4px 20px ${meta.glow}` : '0 4px 16px rgba(16,185,129,0.2)',
          }}
        >
          {/* Shine sweep */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)' }}
          />
          <span className="relative">Bet Now →</span>
        </a>
        <p className="mt-2 text-center text-[10px] text-slate-500/50 tracking-wide">
          18+ only · New customers · T&amp;Cs apply · Please gamble responsibly
        </p>
      </div>
    </article>
  );
}
