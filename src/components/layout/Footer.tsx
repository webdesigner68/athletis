import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white border-t border-red-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">ATHLETIS</h3>
            <p className="mb-2">PURE MUSCULATION</p>
            <address className="not-italic mb-4">
              123 Rue de la Musculation<br />
              68100 Mulhouse<br />
              France
            </address>
            <p>Téléphone: 03 89 XX XX XX</p>
            <p>Email: contact@athletis-musculation.fr</p>
          </div>
          
          {/* Horaires */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Horaires</h3>
            <ul>
              <li className="flex justify-between mb-2">
                <span>Lundi - Vendredi</span>
                <span>6h - 23h</span>
              </li>
              <li className="flex justify-between mb-2">
                <span>Samedi</span>
                <span>8h - 22h</span>
              </li>
              <li className="flex justify-between mb-2">
                <span>Dimanche</span>
                <span>8h - 20h</span>
              </li>
              <li className="mt-4 font-bold text-red-600">
                Accès 7j/7 pour les membres
              </li>
            </ul>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-red-600 transition duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-red-600 transition duration-300">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-red-600 transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#equipment" className="hover:text-red-600 transition duration-300">
                  Équipement
                </Link>
              </li>
              <li>
                <Link href="/#tarifs" className="hover:text-red-600 transition duration-300">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-red-600 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} ATHLETIS PURE MUSCULATION. Tous droits réservés.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/mentions-legales" className="hover:text-red-600 transition duration-300">
              Mentions Légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-red-600 transition duration-300">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 