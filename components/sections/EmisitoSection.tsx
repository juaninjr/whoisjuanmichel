import Image from 'next/image';
import type { SectionVariant } from '@/lib/personas';
import type { EmisitoRelease } from '@/lib/content';

interface EmisitoSectionProps {
  variant: SectionVariant;
  releases: EmisitoRelease[];
}

const streamingPlatforms = [
  { key: 'spotify' as const, label: 'Spotify' },
  { key: 'appleMusic' as const, label: 'Apple Music' },
  { key: 'soundcloud' as const, label: 'SoundCloud' },
  { key: 'bandcamp' as const, label: 'Bandcamp' },
];

export default function EmisitoSection({ variant, releases }: EmisitoSectionProps) {
  if (variant === 'hidden') return null;

  if (variant === 'compact') {
    return (
      <section id="emisito" className="section-compact border-t border-theme-border">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="compact-strip">
            <span className="compact-strip-label font-mono lowercase tracking-wider">emisito</span>
            <span className="compact-strip-sep">·</span>
            <span>{releases.length} releases</span>
            <span className="compact-strip-sep">·</span>
            <a href="/emisito" className="hover:text-theme-fg transition-colors text-xs">
              Explore →
            </a>
          </div>
        </div>
      </section>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <section
      id="emisito"
      className={`${isFeatured ? 'section-featured' : 'section-standard'} relative`}
    >
      {/* Dark overlay for non-emisito personas when featured */}
      {isFeatured && (
        <div
          className="absolute inset-0 bg-[#0a0a0f] -z-10"
          style={{ margin: '0 calc(-50vw + 50%)' }}
        />
      )}

      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="section-rule" style={{ backgroundColor: isFeatured ? '#1e1c2a' : undefined }} />

        <div className={`mb-10 ${isFeatured ? 'md:mb-14' : 'md:mb-10'}`}>
          <p
            className="section-tag mb-3"
            style={{ color: isFeatured ? '#9b7fd4' : undefined }}
          >
            Music Brand
          </p>
          <h2
            className={`${isFeatured ? 'text-display-lg' : 'text-display-md'} font-mono lowercase tracking-tight`}
            style={{ color: isFeatured ? '#9b7fd4' : 'var(--color-fg)' }}
          >
            emisito
          </h2>
          {isFeatured && (
            <p
              className="mt-4 max-w-xl text-base"
              style={{ color: '#6b6880' }}
            >
              Original music and artistic direction under the personal music project.
            </p>
          )}
        </div>

        {/* Releases */}
        <div className="space-y-8">
          {releases.map((release) => (
            <div
              key={release.id}
              className={`flex gap-6 ${isFeatured ? 'flex-col sm:flex-row' : 'flex-row'}`}
            >
              {/* Cover */}
              <div
                className={`relative flex-shrink-0 ${
                  isFeatured ? 'w-full sm:w-40 h-40' : 'w-16 h-16'
                } bg-[#1a1828]`}
              >
                {release.coverImage && (
                  <Image
                    src={release.coverImage}
                    alt={release.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono border px-2 py-0.5 capitalize"
                    style={
                      isFeatured
                        ? { color: '#9b7fd4', borderColor: '#4a3a6b' }
                        : { color: 'var(--color-accent)', borderColor: 'var(--color-border)' }
                    }
                  >
                    {release.type}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: isFeatured ? '#6b6880' : 'var(--color-muted)' }}
                  >
                    {release.year}
                  </span>
                </div>

                <h3
                  className={`font-mono ${isFeatured ? 'text-xl' : 'text-base'} lowercase`}
                  style={{ color: isFeatured ? '#e8e6f0' : 'var(--color-fg)' }}
                >
                  {release.title}
                </h3>

                {isFeatured && (
                  <p className="text-sm max-w-xl leading-relaxed" style={{ color: '#6b6880' }}>
                    {release.description}
                  </p>
                )}

                {/* Streaming links */}
                <div className="flex flex-wrap gap-3 mt-1">
                  {streamingPlatforms.map(({ key, label }) =>
                    release.streamingUrls[key] ? (
                      <a
                        key={key}
                        href={release.streamingUrls[key]}
                        className="text-xs font-mono transition-opacity hover:opacity-60"
                        style={{ color: isFeatured ? '#9b7fd4' : 'var(--color-accent)' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label} ↗
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full emisito page */}
        {!isFeatured && (
          <div className="mt-8">
            <a
              href="/emisito"
              className="text-sm font-mono hover:underline"
              style={{ color: 'var(--color-accent)' }}
            >
              Explore emisito →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
