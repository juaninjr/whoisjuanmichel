'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLastPersona } from '@/components/PersonaSwitcher';
import { PERSONAS } from '@/lib/personas';

const MAIN_TILES = [
  { label: 'ARCHITECT', href: '/architect' },
  { label: 'MUSIC',     href: '/musician'  },
  { label: 'ART',       href: '/artist'    },
];

export default function EcosystemLanding() {
  const { lastPersona, clear } = useLastPersona();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main
      className="min-h-screen flex flex-col select-none"
      style={{ backgroundColor: '#f8f7f3' }}
    >
      {/* Top bar — name only, minimal */}
      <header className="flex items-center justify-between px-8 pt-7">
        <span
          className="font-mono text-[11px] tracking-[0.22em] uppercase"
          style={{ color: '#999' }}
        >
          Juan Michel
        </span>

        {/* Welcome back pill */}
        {lastPersona && (
          <div className="flex items-center gap-2">
            <Link
              href={`/${lastPersona}`}
              className="font-mono text-[11px] tracking-[0.18em] uppercase hover:opacity-60 transition-opacity"
              style={{ color: '#555' }}
            >
              ← {PERSONAS[lastPersona].shortLabel}
            </Link>
            <button
              onClick={clear}
              className="font-mono text-[11px] leading-none"
              style={{ color: '#bbb' }}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      {/* Three main tiles — take up most of the viewport */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-[3px] px-8 pt-6 pb-[3px]">
        {MAIN_TILES.map(({ label, href }) => {
          const on = hovered === label;
          return (
            <Link
              key={label}
              href={href}
              className="relative flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              style={{
                border: '1.5px solid #0a0a0a',
                backgroundColor: on ? '#0a0a0a' : 'transparent',
                transition: 'background-color 0.1s ease',
                minHeight: 'clamp(180px, 38vh, 440px)',
              }}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
            >
              <h2
                className="font-black uppercase"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                  color: on ? '#f8f7f3' : '#0a0a0a',
                  transition: 'color 0.1s ease',
                }}
              >
                {label}
              </h2>
            </Link>
          );
        })}
      </section>

      {/* CV tile — full-width, shorter, inverted by default */}
      <section className="px-8 pb-8 pt-[3px]">
        {(() => {
          const on = hovered === 'CV';
          return (
            <Link
              href="/cv"
              className="flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              style={{
                border: '1.5px solid #0a0a0a',
                backgroundColor: on ? 'transparent' : '#0a0a0a',
                transition: 'background-color 0.1s ease',
                height: 'clamp(64px, 11vh, 110px)',
              }}
              onMouseEnter={() => setHovered('CV')}
              onMouseLeave={() => setHovered(null)}
            >
              <h2
                className="font-black uppercase tracking-[0.3em]"
                style={{
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)',
                  lineHeight: 1,
                  color: on ? '#0a0a0a' : '#f8f7f3',
                  transition: 'color 0.1s ease',
                }}
              >
                CV
              </h2>
            </Link>
          );
        })()}
      </section>
    </main>
  );
}
