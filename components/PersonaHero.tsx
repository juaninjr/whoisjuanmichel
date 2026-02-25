import type { PersonaConfig } from '@/lib/personas';

interface PersonaHeroProps {
  config: PersonaConfig;
}

export default function PersonaHero({ config }: PersonaHeroProps) {
  return (
    <section className="min-h-[60vh] flex flex-col justify-end px-6 md:px-10 pt-28 pb-16 max-w-content mx-auto">
      <div className="animate-slide-up">
        {/* Persona label */}
        <p className="section-tag mb-4">{config.slug}</p>

        {/* Name */}
        <h1 className="heading-display text-display-lg mb-4 text-theme-fg">
          Juan Michel
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl max-w-2xl text-theme-muted">
          {config.tagline}
        </p>

        {/* Accent rule */}
        <div
          className="mt-8 h-px w-16"
          style={{ backgroundColor: config.theme.accent }}
        />
      </div>
    </section>
  );
}
