"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [leftRef, leftInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [rightRef, rightInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            À PROPOS <span className="text-red-600">D'ATHLETIS</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 md:h-full">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image 
                src="/images/about-gym.jpg" 
                alt="ATHLETIS PURE MUSCULATION" 
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-xl">
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm uppercase">jours par semaine</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Votre salle de musculation haut de gamme à Mulhouse</h3>
            <p className="mb-6">
              ATHLETIS PURE MUSCULATION est né d'une passion pour la musculation et d'une volonté de proposer un espace d'entraînement premium sans compromis sur la qualité des équipements et du service.
            </p>
            <p className="mb-6">
              Notre salle est équipée exclusivement de machines Hammer Strength, reconnues mondialement pour leur qualité et leur biomécanique parfaite. Nous offrons un environnement spacieux, propre et motivant pour tous les niveaux, du débutant à l'athlète confirmé.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start">
                <div className="text-red-600 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Équipement haut de gamme</h4>
                  <p className="text-gray-300">Machines Hammer Strength de dernière génération</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-600 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Coachs certifiés</h4>
                  <p className="text-gray-300">Accompagnement personnalisé pour tous les niveaux</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-600 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Ouvert 7j/7</h4>
                  <p className="text-gray-300">Accès de 6h à 23h pour une flexibilité maximale</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-600 mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Ambiance motivante</h4>
                  <p className="text-gray-300">Environnement convivial et stimulant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 