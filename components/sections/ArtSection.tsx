'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { SectionVariant } from '@/lib/personas';
import type { ArtPiece } from '@/lib/content';
import ProjectViewer from '@/components/ProjectViewer';

interface ArtSectionProps {
  variant: SectionVariant;
  pieces: ArtPiece[];
}

// Irregular layout config — intentionally breaks the grid
const LAYOUTS = [
  { imageLeft: true,  imageFlex: '0 0 72%', textFlex: '0 0 28%', imageAspect: '4/3',   textAlign: 'end' as const },
  { imageLeft: false, imageFlex: '0 0 55%', textFlex: '0 0 45%', imageAspect: '3/4',   textAlign: 'start' as const },
  { imageLeft: true,  imageFlex: '0 0 85%', textFlex: '0 0 15%', imageAspect: '16/9',  textAlign: 'end' as const },
  { imageLeft: false, imageFlex: '0 0 60%', textFlex: '0 0 40%', imageAspect: '1/1',   textAlign: 'start' as const },
  { imageLeft: true,  imageFlex: '0 0 65%', textFlex: '0 0 35%', imageAspect: '3/2',   textAlign: 'end' as const },
  { imageLeft: false, imageFlex: '0 0 78%', textFlex: '0 0 22%', imageAspect: '4/5',   textAlign: 'start' as const },
];

function GalleryPiece({
  piece,
  index,
  onOpen,
}: {
  piece: ArtPiece;
  index: number;
  onOpen: () => void;
}) {
  const layout = LAYOUTS[index % LAYOUTS.length];
  const [hovered, setHovered] = useState(false);

  const imageBlock = (
    <motion.div
      className="relative overflow-hidden cursor-pointer"
      style={{ flex: layout.imageFlex, aspectRatio: layout.imageAspect }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.008 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Image
        src={piece.image}
        alt={piece.title}
        fill
        className="object-cover"
        onError={() => {}}
      />
      {/* Placeholder */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(135deg, #d8d4ce, #e8e5df)' }}
      />
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.9)' }}
        >
          View →
        </span>
      </motion.div>
    </motion.div>
  );

  const textBlock = (
    <div
      className="flex flex-col justify-end px-6 py-4"
      style={{ flex: layout.textFlex, textAlign: layout.textAlign }}
    >
      <p
        className="font-mono uppercase mb-2"
        style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--color-muted)' }}
      >
        {piece.medium}
        {piece.series ? ` · ${piece.series}` : ''}
      </p>
      <h3
        className="font-bold text-theme-fg leading-tight mb-2"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', letterSpacing: '-0.01em' }}
      >
        {piece.title}
      </h3>
      {piece.description && (
        <p
          className="text-theme-muted leading-relaxed"
          style={{ fontSize: '0.78rem', maxWidth: '26ch' }}
        >
          {piece.description}
        </p>
      )}
      {piece.dimensions && (
        <p
          className="font-mono text-theme-muted mt-3"
          style={{ fontSize: '0.6rem', letterSpacing: '0.12em' }}
        >
          {piece.dimensions}
        </p>
      )}
      <p
        className="font-mono text-theme-muted mt-1"
        style={{ fontSize: '0.6rem', letterSpacing: '0.12em', opacity: 0.5 }}
      >
        {piece.year}
      </p>
    </div>
  );

  return (
    <div
      className="flex items-end w-full"
      style={{
        paddingTop: index === 0 ? '4rem' : '6rem',
        paddingBottom: '2rem',
      }}
    >
      {layout.imageLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

export default function ArtSection({ variant, pieces }: ArtSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = pieces.find((p) => p.id === selectedId) ?? null;

  if (variant === 'hidden') return null;

  if (variant === 'compact') {
    return (
      <section id="art" className="section-compact border-t border-theme-border">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="compact-strip">
            <span className="compact-strip-label">Art</span>
            <span className="compact-strip-sep">·</span>
            <span>{pieces.length} works</span>
            <span className="compact-strip-sep">·</span>
            <a href="#art" className="hover:text-theme-fg transition-colors text-xs">View →</a>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'featured') {
    return (
      <>
        <section
          id="art"
          className="relative"
          style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '8rem' }}
        >
          {/* Section intro — spare, museum-style */}
          <div className="px-8 md:px-16 pt-16 pb-8">
            <p
              className="font-mono uppercase"
              style={{ fontSize: '0.6rem', letterSpacing: '0.28em', color: 'var(--color-muted)' }}
            >
              Visual Art — Personal Portfolio
            </p>
          </div>

          {/* Gallery entries */}
          <div className="px-6 md:px-12 lg:px-20">
            {pieces.map((piece, i) => (
              <GalleryPiece
                key={piece.id}
                piece={piece}
                index={i}
                onOpen={() => setSelectedId(piece.id)}
              />
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selected && (
            <ProjectViewer
              item={selected}
              layoutId={`art-gallery-${selected.id}`}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // Standard: horizontal scroll (similar to studio standard)
  return (
    <section id="art" className="pt-8 pb-12">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-8">
          <p className="section-tag">Art</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-10">
          {pieces.map((piece) => (
            <div key={piece.id} className="cursor-pointer group" onClick={() => setSelectedId(piece.id)}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image src={piece.image} alt={piece.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" onError={() => {}} />
                <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #d8d4ce, #e8e5df)' }} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-sm text-theme-fg leading-tight">{piece.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectViewer
            item={selected}
            layoutId={`art-std-${selected.id}`}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
