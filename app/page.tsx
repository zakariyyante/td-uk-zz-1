import CasinoCard from './components/CasinoCard';
import Header from './components/Header';
import Logo from './components/Logo';
import MobileCasinoModal from './components/MobileCasinoModal';
import { casinos } from './data/casinos';
import Image from 'next/image';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const gclid = resolvedSearchParams?.gclid as string | undefined;
  const hasGclid = !!gclid;
  const isOnline = hasGclid;

  const mobileCasinos = casinos.filter(casino => casino.isMobile === true);
  const regularCasinos = casinos.filter(casino => !casino.isMobile);

  return (
    <div className="min-h-screen stadium-bg">
      <MobileCasinoModal mobileCasinos={mobileCasinos} isOnline={isOnline} gclidValue={gclid} />
      <Header />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Pitch stripe overlay */}
        <div className="absolute inset-0 pitch-stripes pointer-events-none" />

        {/* Animated scan line */}
        <div
          className="absolute inset-x-0 h-px opacity-[0.06] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
            animation: 'scan-line 8s linear infinite',
          }}
        />

        {/* Top-left floodlight beam */}
        <div
          className="absolute -top-10 -left-10 w-[55vw] h-[60vh] pointer-events-none"
          style={{
            background: 'conic-gradient(from 105deg at 0% 0%, rgba(245,158,11,0.18) 0deg, transparent 28deg)',
            filter: 'blur(2px)',
          }}
        />
        {/* Top-right floodlight beam */}
        <div
          className="absolute -top-10 -right-10 w-[55vw] h-[60vh] pointer-events-none"
          style={{
            background: 'conic-gradient(from 247deg at 100% 0%, rgba(245,158,11,0.18) 0deg, transparent 28deg)',
            filter: 'blur(2px)',
          }}
        />

        {/* Watermark sport text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span
            className="text-[18vw] font-black tracking-tighter text-emerald-500 whitespace-nowrap"
            style={{ opacity: 0.025 }}
          >
            BETTING
          </span>
        </div>

        <div className="relative container mx-auto px-4 pt-6 pb-5 sm:pt-10 sm:pb-7 lg:pt-12 lg:pb-8 text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 to-amber-500/10 border border-emerald-500/25">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Updated Live · UKBettingMasters.com 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-[1.08] tracking-tight">
            Britain&apos;s Best <span className="gold-text">Sports Betting</span> Sites Ranked
          </h1>

          <p className="text-sm text-slate-300/55 mb-5 max-w-xl mx-auto leading-relaxed">
            Hand-picked bookmakers with the sharpest odds, fastest payouts, and biggest welcome bonuses for UK punters.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: '⚽', label: 'Pre-Match & In-Play' },
              { icon: '💰', label: 'Best Welcome Offers' },
              { icon: '⚡', label: 'Same-Day Withdrawals' },
              { icon: '🛡️', label: 'UKGC Licensed' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/[0.04] backdrop-blur-sm rounded-full px-3 py-1.5 border border-emerald-500/15"
              >
                <span className="text-sm leading-none">{icon}</span>
                <span className="text-slate-200/75 text-xs font-semibold">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Bookmaker Cards ───────────────────────────────── */}
      <section id="casinos" className="container mx-auto px-4 py-7 sm:py-9">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-7xl mx-auto">
          {regularCasinos.map((casino, index) => (
            <CasinoCard
              key={casino.id}
              casino={casino}
              rank={index + 1}
              badge={index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined}
            />
          ))}
        </div>

        <div className="mt-5 bg-emerald-500/5 border border-emerald-500/12 rounded-2xl p-3 max-w-5xl mx-auto">
          <p className="text-slate-300/55 text-xs sm:text-sm text-center">
            <strong className="text-slate-200/75">New customers only.</strong> 18+. Min deposit applies. T&Cs apply. BeGambleAware.org. Please bet responsibly.
          </p>
        </div>
      </section>

      {/* ── Why We're Different ───────────────────────────── */}
      <section id="about" className="relative py-8 sm:py-10 border-y border-emerald-500/8 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)' }} />

        <div className="relative container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              How We Rate <span className="gold-text">UK Bookmakers</span>
            </h2>
          </div>

          {/* 3-column feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {[
              { icon: '⚖️', title: 'Odds Comparison', body: 'We compare prices across 20+ markets to ensure every listed bookie offers genuinely competitive odds.' },
              { icon: '🔐', title: 'Licence & Safety', body: 'Every bookmaker must hold a current UKGC licence and pass our independent security audit before listing.' },
              { icon: '💸', title: 'Withdrawal Speed', body: 'We test real withdrawal requests to confirm same-day and next-day payout promises are actually kept.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="casino-card-bg rounded-xl p-4 border border-emerald-500/12 flex flex-col gap-2">
                <div className="text-2xl">{icon}</div>
                <h4 className="text-sm font-bold text-slate-100">{title}</h4>
                <p className="text-slate-300/55 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Additional criteria list */}
          <div className="casino-card-bg rounded-xl p-4 sm:p-5 border border-emerald-500/12">
            <h4 className="text-sm font-bold text-slate-100 mb-3">Our Full Scoring Criteria</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300/60">
              {[
                '✔ Welcome bonus value and wagering requirements',
                '✔ In-play betting markets and live streaming',
                '✔ Mobile app quality (iOS & Android)',
                '✔ Customer support response times',
                '✔ Acca insurance and enhanced odds offers',
                '✔ Cash-out availability and reliability',
              ].map(item => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 shrink-0">✔</span>
                  <span>{item.slice(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsible gambling */}
          <div id="guide" className="mt-4 rounded-xl p-4 sm:p-5 border border-amber-500/15"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(16,185,129,0.04) 100%)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🛡️</span>
              <h4 className="text-sm font-bold gold-text">Bet Safely</h4>
            </div>
            <p className="text-slate-300/65 text-xs leading-relaxed mb-3">
              Gambling is meant to be fun. If it stops feeling that way, free and confidential help is available 24/7:
            </p>
            <ul className="space-y-1.5 text-slate-300/65 text-xs">
              <li>• <strong className="text-slate-200/90">BeGambleAware:</strong>{' '}
                <a href="https://www.begambleaware.org" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 decoration-amber-400/30">begambleaware.org</a>
              </li>
              <li>• <strong className="text-slate-200/90">GamCare:</strong> Call 0808 8020 133 or visit{' '}
                <a href="https://www.gamcare.org.uk" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 decoration-amber-400/30">gamcare.org.uk</a>
              </li>
              <li>• <strong className="text-slate-200/90">National Gambling Helpline:</strong> 0808 8020 133 (free, 24/7)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer id="contact" className="border-t border-emerald-500/8 py-6 sm:py-8"
        style={{ background: 'linear-gradient(180deg, #04080f 0%, #02050a 100%)' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center mb-5">
            <Logo />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-5">
            <div>
              <h5 className="text-slate-200/70 font-bold mb-2 text-xs uppercase tracking-wider">Navigation</h5>
              <ul className="space-y-1.5 text-slate-300/45 text-xs">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
                <li><a href="#casinos" className="hover:text-amber-400 transition-colors">Bookmakers</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-slate-200/70 font-bold mb-2 text-xs uppercase tracking-wider">Legal</h5>
              <ul className="space-y-1.5 text-slate-300/45 text-xs">
                <li><a href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-amber-400 transition-colors">Terms of Use</a></li>
                <li><a href="#guide" className="hover:text-amber-400 transition-colors">Responsible Betting</a></li>
              </ul>
            </div>
            <div className="col-span-2">
              <h5 className="text-slate-200/70 font-bold mb-2 text-xs uppercase tracking-wider">Disclaimer</h5>
              <p className="text-slate-300/45 text-xs leading-relaxed">
                This site provides independent editorial comparisons of UK-licensed bookmakers.
                All listed operators are regulated by the UK Gambling Commission.
                Betting should be for entertainment only — never stake more than you can afford to lose.
              </p>
            </div>
          </div>

          {/* Regulatory logos */}
          <div className="flex flex-col items-center gap-3 pt-4 border-t border-emerald-500/8">
            <p className="text-slate-300/45 text-xs font-bold uppercase tracking-[0.25em]">
              Responsible Gambling
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <div className="bg-white/[0.04] rounded-xl p-3 border border-emerald-500/12 flex items-center justify-center">
                <Image src="/18plus.png" alt="18+" width={80} height={40} className="h-10 w-auto object-contain" />
              </div>
              <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer"
                className="bg-white/[0.04] rounded-xl p-3 border border-emerald-500/12 hover:border-amber-400/35 transition-colors flex items-center justify-center"
                aria-label="Visit GamStop">
                <Image src="/gamestop.png" alt="GamStop" width={120} height={40} className="h-10 w-auto object-contain" />
              </a>
              <a href="https://www.gambleaware.org" target="_blank" rel="noopener noreferrer"
                className="bg-white/[0.04] rounded-xl p-3 border border-emerald-500/12 hover:border-amber-400/35 transition-colors flex items-center justify-center"
                aria-label="Visit GambleAware">
                <Image src="/gambleaware.png" alt="GambleAware" width={160} height={40} className="h-10 w-auto object-contain" />
              </a>
              <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer"
                className="bg-white/[0.04] rounded-xl p-3 border border-emerald-500/12 hover:border-amber-400/35 transition-colors flex items-center justify-center"
                aria-label="Visit GamCare">
                <Image src="/gamcare.png" alt="GamCare" width={120} height={40} className="h-10 w-auto object-contain" />
              </a>
            </div>
          </div>

          <div className="pt-3 text-center">
            <p className="text-slate-300/30 text-xs">
              &copy; 2026 ukbettingmasters.com &mdash; Independent editorial reviews. 18+ only. Please bet responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
