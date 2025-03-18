import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | ATHLETIS PURE MUSCULATION',
  description: 'Consultez notre Foire Aux Questions pour trouver des réponses à vos interrogations sur ATHLETIS PURE MUSCULATION. Horaires, équipements, abonnements et plus encore.',
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 