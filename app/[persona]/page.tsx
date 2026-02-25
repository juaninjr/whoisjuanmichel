import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PERSONAS, PERSONA_SLUGS, isValidPersona } from '@/lib/personas';
import Navigation from '@/components/Navigation';
import SectionRenderer from '@/components/SectionRenderer';
import { PersonaSaveEffect } from '@/components/PersonaSaveEffect';
import Footer from '@/components/Footer';

interface PersonaPageProps {
  params: { persona: string };
}

export async function generateStaticParams() {
  return PERSONA_SLUGS.map((persona) => ({ persona }));
}

export async function generateMetadata({ params }: PersonaPageProps): Promise<Metadata> {
  if (!isValidPersona(params.persona)) return {};
  const config = PERSONAS[params.persona];
  const title = `Juan Michel — ${config.label}`;
  return {
    title,
    description: config.tagline,
    openGraph: {
      title,
      description: config.tagline,
      url: `https://whoisjuanmichel.com/${params.persona}`,
    },
  };
}

export default function PersonaPage({ params }: PersonaPageProps) {
  if (!isValidPersona(params.persona)) notFound();

  const config = PERSONAS[params.persona];

  return (
    <div
      data-persona={config.slug}
      className="min-h-screen"
      style={{
        backgroundColor: config.theme.background,
        color: config.theme.foreground,
      }}
    >
      {/* Save to localStorage */}
      <PersonaSaveEffect slug={config.slug} />

      {/* Navigation — fixed, 56px height */}
      <Navigation mode="persona" persona={config.slug} />

      {/* Content starts right after nav — no hero, no intro */}
      <main style={{ paddingTop: '56px' }}>
        <SectionRenderer config={config} />
      </main>

      <Footer persona={config.slug} />
    </div>
  );
}
