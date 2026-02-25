import Link from 'next/link';
import type { PersonaSlug } from '@/lib/personas';

interface FooterProps {
  persona?: PersonaSlug;
}

const socialLinks = [
  { label: 'Email', href: 'mailto:hello@whoisjuanmichel.com' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Spotify', href: '#' },
];

export default function Footer({}: FooterProps) {
  return (
    <footer className="border-t border-theme-border mt-20">
      <div className="max-w-content mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-sm text-theme-fg">Juan Michel</p>
            <p className="text-xs text-theme-muted mt-1">
              Architecture · Music · Art
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-theme-muted hover:text-theme-fg transition-colors font-mono"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-theme-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-theme-muted font-mono">
            © {new Date().getFullYear()} Juan Michel
          </p>
          <Link
            href="/"
            className="text-xs text-theme-muted hover:text-theme-fg transition-colors font-mono"
          >
            Full ecosystem →
          </Link>
        </div>
      </div>
    </footer>
  );
}
