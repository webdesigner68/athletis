"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const planningNavItems = [
  {
    title: 'Planning des cours',
    href: '/planning',
    description: 'Consultez l\'ensemble des cours disponibles et réservez vos séances.'
  },
  {
    title: 'Calendrier',
    href: '/planning/calendrier',
    description: 'Visualisez et organisez votre planning d\'entraînement hebdomadaire.'
  },
  {
    title: 'Réservations',
    href: '/planning/reservations',
    description: 'Gérez vos réservations de cours et votre historique.'
  },
  {
    title: 'Statistiques',
    href: '/planning/statistiques',
    description: 'Suivez vos performances et votre progression.'
  }
];

export default function PlanningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Déterminer l'onglet actif en fonction du chemin
  useEffect(() => {
    const currentPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const active = planningNavItems.find(item => 
      currentPath.startsWith(item.href + '/') || currentPath === item.href + '/' || currentPath === item.href
    );
    
    setActiveTab(active?.href || planningNavItems[0].href);
  }, [pathname]);

  // Animation pour les onglets
  const tabVariants = {
    active: { 
      color: '#ffffff', 
      borderColor: '#16a34a',
      backgroundColor: 'rgba(22, 163, 74, 0.1)'
    },
    inactive: { 
      color: '#9ca3af', 
      borderColor: 'transparent',
      backgroundColor: 'transparent'
    }
  };

  return (
    <div className="min-h-screen bg-athletis-dark">
      {/* Navigation secondaire pour le planning */}
      <div className="sticky top-[72px] z-40 w-full bg-gray-900 border-b border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="hidden md:flex space-x-1">
              {planningNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={activeTab === item.href ? 'page' : undefined}
                >
                  <motion.div
                    className="px-3 py-2 rounded-md text-sm font-medium border-b-2 transition-colors"
                    initial="inactive"
                    animate={activeTab === item.href ? 'active' : 'inactive'}
                    variants={tabVariants}
                  >
                    {item.title}
                  </motion.div>
                </Link>
              ))}
            </div>
            
            {/* Menu mobile */}
            <div className="md:hidden flex items-center w-full">
              <button
                type="button"
                className="px-3 py-2 text-gray-300 flex items-center justify-between w-full rounded-lg bg-gray-800 transition-colors"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                <span className="text-sm font-medium flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-athletis-green-500 mr-2"></span>
                  {planningNavItems.find(item => activeTab === item.href)?.title || 'Planning'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${isNavOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Menu déroulant mobile */}
        {isNavOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 transition-all duration-300">
            <div className="container mx-auto py-2 px-4">
              <nav className="grid gap-1.5">
                {planningNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2.5 rounded-md transition-colors ${
                      activeTab === item.href
                        ? 'bg-athletis-green-900/30 text-athletis-green-400'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setIsNavOpen(false)}
                  >
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
      
      {/* Contenu principal */}
      {children}
    </div>
  );
} 