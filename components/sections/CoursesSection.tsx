import type { SectionVariant } from '@/lib/personas';
import type { Course } from '@/lib/content';

interface CoursesSectionProps {
  variant: SectionVariant;
  courses: Course[];
}

export default function CoursesSection({ variant, courses }: CoursesSectionProps) {
  if (variant === 'hidden') return null;

  const skills = courses.filter((c) => !c.certificateUrl);
  const certifications = courses.filter((c) => !!c.certificateUrl);

  if (variant === 'compact') {
    return (
      <section id="courses" className="section-compact border-t border-theme-border">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="compact-strip">
            <span className="compact-strip-label">Certifications</span>
            <span className="compact-strip-sep">·</span>
            <span>{certifications.length} certs</span>
            <span className="compact-strip-sep">·</span>
            <span>{skills.length} skills</span>
            <span className="compact-strip-sep">·</span>
            <a href="#courses" className="hover:text-theme-fg transition-colors text-xs">View →</a>
          </div>
        </div>
      </section>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <section id="courses" className={isFeatured ? 'section-featured' : 'section-standard'}>
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="section-rule" />

        <div className={`mb-10 ${isFeatured ? 'md:mb-14' : 'md:mb-10'}`}>
          <p className="section-tag mb-3">Continuing Education</p>
          <h2
            className="font-black uppercase text-theme-fg"
            style={{
              fontSize: isFeatured ? 'clamp(2rem, 4vw, 3.5rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1,
            }}
          >
            Skills &amp; Certifications
          </h2>
        </div>

        <div className={isFeatured ? 'space-y-14' : 'space-y-10'}>
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3
                className="font-black uppercase text-xs tracking-[0.18em] mb-5"
                style={{ color: '#888' }}
              >
                Skills
              </h3>
              {isFeatured ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((c) => (
                    <span
                      key={c.id}
                      className="font-mono text-xs px-3 py-2"
                      style={{ border: '1px solid var(--color-border)', color: 'var(--color-fg)' }}
                    >
                      {c.title}
                      <span className="ml-2 opacity-40">{c.category}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-theme-border">
                  {skills.map((c) => (
                    <div key={c.id} className="py-3 flex items-center gap-6">
                      <span className="font-mono text-xs text-theme-muted w-10 shrink-0">{c.year}</span>
                      <span className="text-sm text-theme-fg flex-1">{c.title}</span>
                      <span className="text-xs text-theme-muted shrink-0 hidden sm:block">{c.category}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3
                className="font-black uppercase text-xs tracking-[0.18em] mb-5"
                style={{ color: '#888' }}
              >
                Certifications
              </h3>
              <div className="divide-y divide-theme-border">
                {certifications.map((c) => (
                  <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-theme-fg leading-tight">{c.title}</p>
                      <p className="font-mono text-[11px] mt-0.5 text-theme-muted">
                        {c.provider} · {c.year}
                      </p>
                    </div>
                    <a
                      href={c.certificateUrl}
                      className="font-mono text-xs text-theme-accent hover:underline shrink-0"
                    >
                      Certificate ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
