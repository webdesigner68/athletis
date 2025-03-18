import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs | ATHLETIS PURE MUSCULATION',
  description: 'Découvrez nos formules d\'abonnement flexibles et accessibles. ATHLETIS PURE MUSCULATION vous propose des tarifs adaptés à vos besoins pour votre entraînement à Mulhouse.',
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 