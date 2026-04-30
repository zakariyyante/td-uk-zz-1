'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home',         href: '/' },
    { name: 'Bookmakers',   href: '/#casinos' },
    { name: 'Betting Guide', href: '/#guide' },
    { name: 'About Us',     href: '/#about' },
    { name: 'Contact',      href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-emerald-500/10"
      style={{ background: 'rgba(4,8,15,0.92)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-slate-300/65 hover:text-amber-300 transition-colors font-semibold tracking-wide text-sm px-4 py-2 rounded-lg hover:bg-emerald-500/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right side — live indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Odds Live</span>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-slate-300/70 hover:text-amber-300 transition-colors p-2 rounded-lg hover:bg-emerald-500/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-emerald-500/10 mt-1 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-300/65 hover:text-amber-300 transition-colors font-semibold py-2.5 px-3 rounded-lg hover:bg-emerald-500/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
