import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Équipements | ATHLETIS PURE MUSCULATION',
  description: 'Découvrez notre gamme d\'équipements Hammer Strength haut de gamme. ATHLETIS PURE MUSCULATION vous propose les meilleures machines pour optimiser vos entraînements à Mulhouse.',
};

export default function EquipementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 