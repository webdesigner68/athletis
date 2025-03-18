import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-black bg-opacity-90 text-white border-b border-red-600">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-red-600">ATHLETIS</h1>
          <span className="ml-2 text-sm uppercase">Pure Musculation</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
            ) : (
              <path d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-red-600 transition duration-300">
            Accueil
          </Link>
          <Link href="/#about" className="hover:text-red-600 transition duration-300">
            À propos
          </Link>
          <Link href="/#services" className="hover:text-red-600 transition duration-300">
            Services
          </Link>
          <Link href="/#equipment" className="hover:text-red-600 transition duration-300">
            Équipement
          </Link>
          <Link href="/#tarifs" className="hover:text-red-600 transition duration-300">
            Tarifs
          </Link>
          <Link href="/#contact" className="hover:text-red-600 transition duration-300">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black bg-opacity-95 w-full border-t border-red-600">
          <div className="container mx-auto px-4 py-2">
            <Link href="/" className="block py-2 hover:text-red-600 transition duration-300">
              Accueil
            </Link>
            <Link href="/#about" className="block py-2 hover:text-red-600 transition duration-300">
              À propos
            </Link>
            <Link href="/#services" className="block py-2 hover:text-red-600 transition duration-300">
              Services
            </Link>
            <Link href="/#equipment" className="block py-2 hover:text-red-600 transition duration-300">
              Équipement
            </Link>
            <Link href="/#tarifs" className="block py-2 hover:text-red-600 transition duration-300">
              Tarifs
            </Link>
            <Link href="/#contact" className="block py-2 hover:text-red-600 transition duration-300">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
} 