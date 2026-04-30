interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Target / bullseye icon */}
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="UK Betting Masters">
        <defs>
          <radialGradient id="innerFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
          <filter id="tglow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ring */}
        <circle cx="24" cy="24" r="22" stroke="#10b981" strokeWidth="1.2" fill="none" opacity="0.5" />

        {/* Mid ring */}
        <circle cx="24" cy="24" r="15" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.7" />

        {/* Inner filled circle */}
        <circle cx="24" cy="24" r="8" fill="url(#innerFill)" filter="url(#tglow)" />

        {/* Center dot */}
        <circle cx="24" cy="24" r="2.5" fill="#fff" />

        {/* Crosshair — top */}
        <line x1="24" y1="2" x2="24" y2="9" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        {/* Crosshair — bottom */}
        <line x1="24" y1="39" x2="24" y2="46" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        {/* Crosshair — left */}
        <line x1="2" y1="24" x2="9" y2="24" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        {/* Crosshair — right */}
        <line x1="39" y1="24" x2="46" y2="24" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-black tracking-[0.35em] text-slate-400/60 uppercase mb-0.5">
          UK Betting
        </span>
        <span
          className="text-[27px] font-black tracking-tight leading-none"
          style={{
            background: 'linear-gradient(100deg, #10b981 0%, #fcd34d 45%, #f59e0b 65%, #10b981 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          MASTERS
        </span>
        <span className="text-[8px] font-semibold tracking-[0.22em] text-emerald-500/45 uppercase mt-1">
          ukbettingmasters.com
        </span>
      </div>
    </div>
  );
}
