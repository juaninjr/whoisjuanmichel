import type { PersonaConfig, PersonaSlug, SectionId, SectionVariant } from '@/lib/personas';
import {
  studioProjects,
  cvEntries,
  courses,
  musicProjects,
  performances,
  artPieces,
} from '@/lib/content';

import StudioSection from '@/components/sections/StudioSection';
import CVSection from '@/components/sections/CVSection';
import CoursesSection from '@/components/sections/CoursesSection';
import ClientMusicSection from '@/components/sections/ClientMusicSection';
import PerformancesSection from '@/components/sections/PerformancesSection';
import ArtSection from '@/components/sections/ArtSection';

interface SectionRendererProps {
  config: PersonaConfig;
}

function getVariant(config: PersonaConfig, id: SectionId): SectionVariant {
  return config.sections.find((s) => s.id === id)?.variant ?? 'hidden';
}

export default function SectionRenderer({ config }: SectionRendererProps) {
  const ordered = [...config.sections].sort((a, b) => a.order - b.order);
  const persona = config.slug as PersonaSlug;
  const isMusician = persona === 'musician';

  // For musician persona, render LIVE + STUDIO side-by-side
  if (isMusician) {
    const perfVariant = getVariant(config, 'performances');
    const musicVariant = getVariant(config, 'client-music');

    return (
      <div>
        <div className="flex flex-col lg:flex-row" style={{ borderTop: '1px solid var(--color-border)' }}>
          {perfVariant !== 'hidden' && (
            <div className="flex-1 min-w-0 lg:border-r" style={{ borderColor: 'var(--color-border)' }}>
              <PerformancesSection
                variant={perfVariant}
                performances={performances}
                persona={persona}
                column
              />
            </div>
          )}
          {musicVariant !== 'hidden' && (
            <div className="flex-1 min-w-0">
              <ClientMusicSection
                variant={musicVariant}
                projects={musicProjects}
                persona={persona}
                column
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {ordered.map(({ id }) => {
        const variant = getVariant(config, id);
        if (variant === 'hidden') return null;

        switch (id) {
          case 'studio':
            return (
              <StudioSection
                key={id}
                variant={variant}
                projects={studioProjects}
                persona={persona}
              />
            );
          case 'cv':
            return (
              <CVSection
                key={id}
                variant={variant}
                entries={cvEntries}
                courses={courses}
                persona={persona}
              />
            );
          case 'courses':
            return (
              <CoursesSection
                key={id}
                variant={variant}
                courses={courses}
              />
            );
          case 'client-music':
            return (
              <ClientMusicSection
                key={id}
                variant={variant}
                projects={musicProjects}
                persona={persona}
              />
            );
          case 'performances':
            return (
              <PerformancesSection
                key={id}
                variant={variant}
                performances={performances}
                persona={persona}
              />
            );
          case 'art':
            return (
              <ArtSection
                key={id}
                variant={variant}
                pieces={artPieces}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
