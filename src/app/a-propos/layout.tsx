import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos | ATHLETIS PURE MUSCULATION',
  description: 'Découvrez l\'histoire et le concept d\'ATHLETIS PURE MUSCULATION à Mulhouse, une salle dédiée aux passionnés de musculation avec des équipements haut de gamme Hammer Strength.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 