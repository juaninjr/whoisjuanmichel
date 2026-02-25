import type { Metadata } from 'next';
import EcosystemLanding from '@/components/EcosystemLanding';

export const metadata: Metadata = {
  title: 'Juan Michel',
  description: 'Architecture, music, and art. Choose your lens.',
};

export default function LandingPage() {
  return <EcosystemLanding />;
}
