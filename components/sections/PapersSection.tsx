import type { SectionVariant } from '@/lib/personas';
import type { Paper } from '@/lib/content';

interface PapersSectionProps {
  variant: SectionVariant;
  papers: Paper[];
}

export default function PapersSection({ variant, papers }: PapersSectionProps) {
  if (variant === 'hidden') return null;

  if (variant === 'compact') {
    return (
      <section id="papers" className="section-compact border-t border-theme-border">
        <div className="max-w-content mx-auto px-6 md:px-10">
          <div className="compact-strip">
            <span className="compact-strip-label">Papers</span>
            <span className="compact-strip-sep">·</span>
            {papers.slice(0, 3).map((p, i) => (
              <span key={p.id}>
                {p.pdfUrl ? (
                  <a href={p.pdfUrl} className="hover:text-theme-fg transition-colors">
                    &ldquo;{p.title}&rdquo;
                  </a>
                ) : (
                  <span>&ldquo;{p.title}&rdquo;</span>
                )}
                {i < Math.min(papers.length, 3) - 1 && (
                  <span className="compact-strip-sep ml-1.5">·</span>
                )}
              </span>
            ))}
            <span className="compact-strip-sep">·</span>
            <a href="#papers-full" className="hover:text-theme-fg transition-colors text-xs">
              {papers.length} papers →
            </a>
          </div>
        </div>
      </section>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <section
      id="papers"
      className={isFeatured ? 'section-featured' : 'section-standard'}
    >
      <div className="max-w-content mx-auto px-6 md:px-10">
        {/* Section rule + header */}
        <div className="section-rule" />
        <div className={`mb-10 ${isFeatured ? 'md:mb-16' : 'md:mb-12'}`}>
          <p className="section-tag mb-3">Academic Writing</p>
          <h2
            className={`heading-display ${
              isFeatured ? 'text-display-lg' : 'text-display-md'
            } text-theme-fg`}
          >
            Papers
          </h2>
          {isFeatured && (
            <p className="mt-4 text-theme-muted max-w-xl">
              Research papers, essays, and academic writings from university coursework and independent study.
            </p>
          )}
        </div>

        {/* Paper list */}
        <div className="divide-y divide-theme-border">
          {papers.map((paper) => (
            <div key={paper.id} className="py-8 md:py-10 flex flex-col md:flex-row md:gap-16">
              {/* Left: year + course */}
              <div className="flex md:flex-col gap-3 md:gap-1 mb-4 md:mb-0 md:w-48 flex-shrink-0">
                <span className="font-mono text-sm text-theme-muted">{paper.year}</span>
                <span className="text-xs text-theme-muted md:mt-1">{paper.course}</span>
              </div>

              {/* Right: content */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono border border-theme-border px-2 py-0.5 text-theme-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={`heading-display ${isFeatured ? 'text-2xl' : 'text-xl'} text-theme-fg mb-2`}>
                  {paper.title}
                </h3>
                {paper.subtitle && (
                  <p className="text-theme-muted italic mb-3 text-sm">{paper.subtitle}</p>
                )}
                {isFeatured && (
                  <p className="text-sm text-theme-muted leading-relaxed max-w-2xl line-clamp-3">
                    {paper.abstract}
                  </p>
                )}
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    className="inline-block mt-4 text-xs font-mono text-theme-accent hover:underline"
                  >
                    Read →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
