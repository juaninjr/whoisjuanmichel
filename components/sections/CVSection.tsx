'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { SectionVariant, PersonaSlug } from '@/lib/personas';
import type { CVEntry, CVEntryType, Course } from '@/lib/content';

interface CVSectionProps {
  variant: SectionVariant;
  entries: CVEntry[];
  courses?: Course[];
  standalone?: boolean;
  persona?: PersonaSlug;
}

// ── CV paper sections — from actual CV PDF ─────────────────────────────────────
type PaperSectionDef = { id: string; label: string; items: string[] };

const PAPER_SECTIONS: PaperSectionDef[] = [
  {
    id: 'academic',
    label: 'ACADEMIC',
    items: [
      'University of Cambridge · Robinson College',
      'BA Architecture · 2023–2026',
      '—',
      'British Council School · Madrid',
      'Bilingual Baccalaureate · 2009–2023',
      'BiBac Prize 2023 · Excellence 2017, 2019',
    ],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    items: [
      'Aluminios Cortizo — Arch. & Eng. Intern · 2025',
      'Carpintería Dimmler — Woodwork · Karlsruhe, 2024',
      'PE Volunteer · Chame, Panama · 2024',
      'Music & Creative Projects · 2020–present',
      '100+ tracks produced · 20M+ streams',
    ],
  },
  {
    id: 'skills',
    label: 'SKILLS',
    items: [
      'CAD: Rhino · Grasshopper · AutoCAD · Unreal Engine',
      'Video/Image: Adobe Suite · Photoshop · InDesign · After Effects · Premiere Pro',
      'Sound: Pro Tools · Logic Pro X · Ableton · FL Studio',
      'Code: Python · C · SQL · JavaScript',
      'Analytical: rapid prototyping · creative problem-solving',
    ],
  },
  {
    id: 'languages',
    label: 'LANGUAGES',
    items: [
      'Spanish — native',
      'English — native · C2',
      'German — native · C2',
      'French — PWP · B2',
      'Catalan — native',
    ],
  },
  {
    id: 'extras',
    label: 'EXTRAS',
    items: [
      'Piano · Municipal School of Music, Madrid · 2013–2021',
      'Award for Piano Excellence · 2017',
      'Harvard CS50x · Computer Science · 2023',
      'RIBA Skill Up · 2022',
      'Divemaster PADI · 2025',
      'Cambridge Rowing · M1 · 2024–2026',
    ],
  },
];

// ── Hoverable paper section ────────────────────────────────────────────────────
function PaperSection({ label, items }: Omit<PaperSectionDef, 'id'>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ cursor: 'default' }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-black uppercase shrink-0"
          style={{
            fontSize: 'clamp(1.35rem, 3.2vw, 2.6rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: open ? '#000' : '#1c1c1c',
            transition: 'color 0.15s ease',
          }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            backgroundColor: open ? '#0a0a0a' : '#c8c4bb',
            transition: 'background-color 0.15s ease',
          }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 6 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              zIndex: 60,
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '12px 16px',
              minWidth: '290px',
              maxWidth: '360px',
              pointerEvents: 'none',
              boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                right: '1.75rem',
                width: '8px',
                height: '8px',
                backgroundColor: '#0a0a0a',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                transform: 'rotate(45deg)',
              }}
            />
            {items.map((item, i) =>
              item === '—' ? (
                <div key={i} style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)', margin: '7px 0' }} />
              ) : (
                <p
                  key={i}
                  className="font-mono"
                  style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, letterSpacing: '0.04em' }}
                >
                  {item}
                </p>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Full CV modal (PDF embed) ──────────────────────────────────────────────────
function FullCVModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 18, transition: { duration: 0.15 } }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0c0c0c',
          border: '1px solid rgba(255,255,255,0.07)',
          width: '100%',
          maxWidth: '820px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}
        >
          <span className="font-mono uppercase tracking-[0.22em]" style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.28)' }}>
            Juan Michel Lafarga — Curriculum Vitae
          </span>
          <div className="flex items-center gap-3">
            <a
              href="/docs/cvENG_dec2025.pdf"
              download="Juan_Michel_Lafarga_CV.pdf"
              className="font-mono uppercase tracking-widest transition-all"
              style={{ fontSize: '0.52rem', letterSpacing: '0.2em', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.38)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.13)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
            >
              Download PDF ↓
            </a>
            <button
              onClick={onClose}
              className="font-mono transition-all"
              style={{ color: 'rgba(255,255,255,0.22)', fontSize: '1rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.22)'; }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <iframe src="/docs/cvENG_dec2025.pdf" style={{ flex: 1, border: 'none', width: '100%', backgroundColor: '#fff' }} title="Juan Michel Lafarga — CV" />
      </motion.div>
    </motion.div>
  );
}

// ── 3D paper view (standalone /cv + non-architect) ─────────────────────────────
function PaperView({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      id="cv"
      className="relative flex items-center justify-center"
      style={{
        backgroundColor: '#060606',
        minHeight: '100vh',
        padding: '6rem 1.5rem 6rem',
        backgroundImage: 'radial-gradient(ellipse 65% 70% at 50% 45%, #111 0%, #060606 100%)',
      }}
    >
      <button
        onClick={onOpenModal}
        className="absolute font-mono uppercase transition-all"
        style={{ top: '1.5rem', right: '2rem', fontSize: '0.52rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.08)', padding: '7px 16px', background: 'none', cursor: 'pointer' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.22)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
      >
        View Full CV ↗
      </button>

      <div style={{ perspective: '1100px', width: '100%', maxWidth: '700px' }}>
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        >
          <div
            style={{
              backgroundColor: '#f7f4ee',
              transform: 'rotateX(7deg) rotateY(-5deg) rotateZ(0.8deg)',
              transformOrigin: 'center center',
              boxShadow: ['3px 5px 10px rgba(0,0,0,0.6)', '8px 18px 40px rgba(0,0,0,0.55)', '16px 44px 88px rgba(0,0,0,0.45)', '24px 70px 130px rgba(0,0,0,0.3)'].join(', '),
              padding: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '2px solid #0a0a0a' }}>
              <h1 className="font-black uppercase" style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '-0.035em', lineHeight: 1, color: '#0a0a0a' }}>
                Juan Michel
              </h1>
              <p className="font-mono uppercase" style={{ fontSize: '0.55rem', color: '#888', letterSpacing: '0.22em', marginTop: '0.6rem' }}>
                Architecture · Music · Art · Cambridge, UK
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {PAPER_SECTIONS.map((s) => (
                <PaperSection key={s.id} label={s.label} items={s.items} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── LinkedIn-style timeline (architect persona inline) ─────────────────────────
function dur(start: number, end: number | 'present'): string {
  const e = end === 'present' ? new Date().getFullYear() : end;
  const y = e - start;
  if (y === 0) return '< 1 yr';
  return y === 1 ? '1 yr' : `${y} yrs`;
}

const DOT_COLOR: Record<CVEntryType, string> = {
  education: '#2c4a6e',
  experience: '#5a3a28',
  award: '#5a5a28',
};

function TimelineRow({ entry, isLast }: { entry: CVEntry; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const endLabel = entry.endYear === 'present' ? 'Present' : String(entry.endYear);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0" style={{ width: '20px' }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: DOT_COLOR[entry.type], marginTop: 4, flexShrink: 0 }} />
        {!isLast && <div style={{ flex: 1, width: 1, backgroundColor: '#e2ddd5', minHeight: '2rem', marginTop: 4 }} />}
      </div>
      <div className="pb-6 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold text-sm leading-snug" style={{ color: '#0a0a0a' }}>{entry.title}</h3>
            <p className="text-xs mt-0.5" style={{ color: '#555' }}>
              {entry.institution}
              {entry.location ? <span style={{ color: '#999' }}> · {entry.location}</span> : null}
            </p>
            <p className="font-mono mt-1" style={{ fontSize: '0.6rem', color: '#aaa', letterSpacing: '0.08em' }}>
              {entry.startYear}–{endLabel} <span style={{ color: '#ccc' }}>· {dur(entry.startYear, entry.endYear)}</span>
            </p>
          </div>
          {entry.description && (
            <button onClick={() => setOpen((o) => !o)} style={{ color: '#bbb', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, marginTop: 2 }}>
              {open ? '−' : '+'}
            </button>
          )}
        </div>
        {open && entry.description && (
          <p className="text-xs mt-3 leading-relaxed" style={{ color: '#666', maxWidth: '52ch' }}>
            {entry.description}
          </p>
        )}
      </div>
    </div>
  );
}

function ArchitectTimeline({ entries, courses }: { entries: CVEntry[]; courses?: Course[] }) {
  const education = entries.filter((e) => e.type === 'education');
  const experience = entries.filter((e) => e.type === 'experience');
  const skills = (courses ?? []).filter((c) => !c.certificateUrl);
  const certs = (courses ?? []).filter((c) => !!c.certificateUrl);

  return (
    <section id="cv" className="pt-12 pb-16 border-t border-theme-border">
      <div className="max-w-content mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4">
          <div>
            <p className="section-tag mb-2">Background</p>
            <h2 className="font-black uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em', color: '#0a0a0a', lineHeight: 1 }}>
              CV
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <Link
              href="/cv"
              className="font-mono uppercase transition-all inline-block"
              style={{ fontSize: '0.52rem', letterSpacing: '0.18em', padding: '7px 13px', border: '1px solid #0a0a0a', color: '#0a0a0a', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#f8f7f3'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a'; }}
            >
              Full CV ↗
            </Link>
            <a
              href="/docs/cvENG_dec2025.pdf"
              download="Juan_Michel_Lafarga_CV.pdf"
              className="font-mono uppercase transition-all inline-block"
              style={{ fontSize: '0.52rem', letterSpacing: '0.18em', padding: '7px 13px', border: '1px solid #ccc', color: '#777', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#0a0a0a'; (e.currentTarget as HTMLElement).style.color = '#0a0a0a'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#ccc'; (e.currentTarget as HTMLElement).style.color = '#777'; }}
            >
              PDF ↓
            </a>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {/* Left: Timeline */}
          <div>
            {education.length > 0 && (
              <div className="mb-8">
                <p className="font-mono uppercase mb-4" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: '#999', borderBottom: '1px solid #e8e4de', paddingBottom: '0.5rem' }}>
                  Education
                </p>
                {education.map((e, i) => <TimelineRow key={e.id} entry={e} isLast={i === education.length - 1} />)}
              </div>
            )}
            {experience.length > 0 && (
              <div>
                <p className="font-mono uppercase mb-4" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: '#999', borderBottom: '1px solid #e8e4de', paddingBottom: '0.5rem' }}>
                  Experience
                </p>
                {experience.map((e, i) => <TimelineRow key={e.id} entry={e} isLast={i === experience.length - 1} />)}
              </div>
            )}
          </div>

          {/* Right: Skills + Certs */}
          <div>
            {skills.length > 0 && (
              <div className="mb-8">
                <p className="font-mono uppercase mb-4" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: '#999', borderBottom: '1px solid #e8e4de', paddingBottom: '0.5rem' }}>
                  Skills &amp; Courses
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((c) => (
                    <span key={c.id} className="font-mono" style={{ fontSize: '0.6rem', padding: '4px 10px', border: '1px solid #ddd', color: '#555' }}>
                      {c.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {certs.length > 0 && (
              <div>
                <p className="font-mono uppercase mb-4" style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: '#999', borderBottom: '1px solid #e8e4de', paddingBottom: '0.5rem' }}>
                  Certifications
                </p>
                <div className="space-y-3">
                  {certs.map((c) => (
                    <div key={c.id} className="flex items-start justify-between gap-4" style={{ borderBottom: '1px solid #f0ece6', paddingBottom: '0.75rem' }}>
                      <div>
                        <p className="text-sm font-medium leading-snug" style={{ color: '#0a0a0a' }}>{c.title}</p>
                        <p className="font-mono mt-0.5" style={{ fontSize: '0.58rem', color: '#999' }}>{c.provider} · {c.year}</p>
                      </div>
                      <a href={c.certificateUrl} target="_blank" rel="noopener" className="font-mono hover:underline shrink-0" style={{ fontSize: '0.58rem', color: '#2c4a6e' }}>
                        View ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function CVSection({ variant, entries, courses, standalone, persona }: CVSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (variant === 'hidden') return null;

  if (variant === 'compact') {
    const edu = entries.find((e) => e.type === 'education');
    const exp = entries.find((e) => e.type === 'experience');
    return (
      <section id="cv" className="section-compact border-t border-theme-border">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="compact-strip">
            <span className="compact-strip-label">CV</span>
            <span className="compact-strip-sep">·</span>
            {edu && <span>{edu.institution}</span>}
            {exp && <><span className="compact-strip-sep">·</span><span>{exp.title}</span></>}
            <span className="compact-strip-sep">·</span>
            <a href="/cv" className="hover:text-theme-fg transition-colors text-xs">Full CV →</a>
          </div>
        </div>
      </section>
    );
  }

  // Architect inline section → LinkedIn timeline
  if (persona === 'architect' && !standalone) {
    return <ArchitectTimeline entries={entries} courses={courses} />;
  }

  // All other cases → 3D paper
  return (
    <>
      <PaperView onOpenModal={() => setModalOpen(true)} />
      <AnimatePresence>
        {modalOpen && <FullCVModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
