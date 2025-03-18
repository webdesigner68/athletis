import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | ATHLETIS PURE MUSCULATION',
  description: 'Contactez ATHLETIS PURE MUSCULATION à Mulhouse. Formulaire de contact, adresse, téléphone et horaires d\'ouverture de notre salle de musculation.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 