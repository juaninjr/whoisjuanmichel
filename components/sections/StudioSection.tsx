'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { SectionVariant, PersonaSlug } from '@/lib/personas';
import type { StudioProject } from '@/lib/content';
import ProjectFolder from '@/components/ProjectFolder';
import ProjectViewer from '@/components/ProjectViewer';

interface StudioSectionProps {
  variant: SectionVariant;
  projects: StudioProject[];
  persona?: PersonaSlug;
}

// ── Architect Featured: immersive vertical stack ───────────────────────────────
function ArchitectView({ projects }: { projects: StudioProject[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  return (
    <LayoutGroup>
      <section id="studio" className="relative" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="flex">
          {/* Sticky rotated title — left margin */}
          <div
            className="hidden md:flex shrink-0 items-start justify-center"
            style={{ width: '5rem' }}
          >
            <div
              className="sticky top-0 h-screen flex items-center justify-center overflow-visible"
              style={{ width: '5rem' }}
            >
              <span
                className="font-black uppercase select-none"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
                  letterSpacing: '0.3em',
                  color: 'rgba(10,10,10,0.12)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                University Portfolio — Studio
              </span>
            </div>
          </div>

          {/* Vertical project stack */}
          <div className="flex-1">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="relative overflow-hidden cursor-pointer group"
                style={{ height: 'clamp(60vh, 75vh, 90vh)', borderTop: i === 0 ? 'none' : '1px solid rgba(10,10,10,0.08)' }}
                onClick={() => !selected && setSelectedId(project.id)}
                whileHover="hover"
                initial="rest"
              >
                {/* Image or Video */}
                <motion.div
                  className="absolute inset-0"
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.025 } }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={() => {}}
                      priority={i === 0}
                    />
                  )}
                  {/* Dark placeholder shown if both image and video fail */}
                  <div
                    className="absolute inset-0 -z-10"
                    style={{ background: 'linear-gradient(135deg, #111, #2a2a2a)' }}
                  />
                </motion.div>

                {/* Dark gradient overlay — stronger at bottom */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
                />

                {/* Project number — top right */}
                <div className="absolute top-8 right-8">
                  <span
                    className="font-mono"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Title block — bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p
                    className="font-mono uppercase mb-3"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {project.studio}
                  </p>
                  <h3
                    className="font-black uppercase text-white"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                      letterSpacing: '-0.03em',
                      lineHeight: 0.95,
                      // Fade mask at right edge for the "fading title" effect
                      WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                      maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <motion.div
                    className="flex items-center gap-3 mt-5"
                    variants={{ rest: { opacity: 0, y: 6 }, hover: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                      Open project →
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <ProjectViewer
              item={selected}
              layoutId={`studio-arch-${selected.id}`}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}

// ── Standard: horizontal scroll with arrows ────────────────────────────────────
function StandardView({ projects }: { projects: StudioProject[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <LayoutGroup>
      <section id="studio" className="pt-8 pb-12">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="flex items-baseline justify-between mb-8">
            <p className="section-tag">Studio</p>
          </div>

          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scroll(-1)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 items-center justify-center border border-theme-border bg-theme-bg hover:bg-theme-fg hover:text-theme-bg hover:border-theme-fg transition-colors"
              aria-label="Scroll left"
            >
              ←
            </button>

            {/* Scrollable track */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '4px' }}
            >
              {projects.slice(0, 6).map((project) => (
                <div key={project.id} className="shrink-0" style={{ width: '300px' }}>
                  <ProjectFolder
                    item={project}
                    layoutId={`studio-std-${project.id}`}
                    onOpen={() => setSelectedId(project.id)}
                    isOpen={selectedId === project.id}
                    meta={project.semester}
                  />
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll(1)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 items-center justify-center border border-theme-border bg-theme-bg hover:bg-theme-fg hover:text-theme-bg hover:border-theme-fg transition-colors"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <ProjectViewer
              item={selected}
              layoutId={`studio-std-${selected.id}`}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function StudioSection({ variant, projects, persona }: StudioSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  if (variant === 'hidden') return null;

  if (variant === 'compact') {
    return (
      <section id="studio" className="section-compact border-t border-theme-border">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="compact-strip">
            <span className="compact-strip-label">Studio</span>
            <span className="compact-strip-sep">·</span>
            {projects.slice(0, 3).map((p, i) => (
              <span key={p.id}>
                <span className="italic">{p.title}</span>
                {i < Math.min(projects.length, 3) - 1 && <span className="compact-strip-sep ml-1.5">·</span>}
              </span>
            ))}
            <span className="compact-strip-sep">·</span>
            <a href="#studio" className="hover:text-theme-fg transition-colors text-xs">{projects.length} projects →</a>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'featured') {
    return <ArchitectView projects={projects} />;
  }

  return <StandardView projects={projects} />;
}
