'use client';

import { useEffect } from 'react';
import type { PersonaSlug } from '@/lib/personas';
import { STORAGE_KEY } from '@/lib/personas';

// Saves persona to localStorage on mount. Renders nothing — side-effect only.
export function PersonaSaveEffect({ slug }: { slug: PersonaSlug }) {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, slug);
    } catch {
      // localStorage unavailable (e.g. private mode) — silently ignore
    }
  }, [slug]);

  return null;
}
