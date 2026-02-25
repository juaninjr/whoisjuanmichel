'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PersonaSlug } from '@/lib/personas';
import { PERSONAS, PERSONA_SLUGS, STORAGE_KEY, isValidPersona } from '@/lib/personas';
import { useLanguage } from '@/lib/context/LanguageContext';

interface PersonaSwitcherProps {
  currentSlug: PersonaSlug;
}

export function PersonaSwitcher({ currentSlug }: PersonaSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const current = PERSONAS[currentSlug];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const others = PERSONA_SLUGS.filter((s) => s !== currentSlug);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs font-mono tracking-wide border border-theme-border px-3 py-1.5 hover:border-theme-accent transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="opacity-50 text-[10px] uppercase tracking-widest">{t('nav.viewingAs')}</span>
        <span className="text-theme-accent">{current.shortLabel}</span>
        <span className={`transition-transform text-[10px] ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="persona-dropdown py-1" role="menu">
          {others.map((slug) => {
            const p = PERSONAS[slug];
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-theme-surface transition-colors"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className="text-theme-accent text-base leading-none">{p.symbol}</span>
                <span>{p.shortLabel}</span>
              </Link>
            );
          })}
          <div className="my-1 border-t border-theme-border" />
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-theme-muted hover:bg-theme-surface transition-colors"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="text-base leading-none">◌</span>
            <span>{t('nav.fullEcosystem')}</span>
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── LANGUAGE TOGGLE ──────────────────────────────────────────────────────────
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
      className="text-xs font-mono tracking-widest text-theme-muted hover:text-theme-fg transition-colors uppercase"
      aria-label="Toggle language"
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
}

// ─── WELCOME BACK HOOK ────────────────────────────────────────────────────────
export function useLastPersona() {
  const [lastPersona, setLastPersona] = useState<PersonaSlug | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidPersona(stored)) {
        setLastPersona(stored);
      }
    } catch {
      // localStorage unavailable — silently ignore
    }
  }, []);

  const clear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setLastPersona(null);
  };

  return { lastPersona, clear };
}
