"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function Equipment() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imagesError, setImagesError] = useState<{[key: string]: boolean}>({
    equipment1: false,
    equipment2: false,
    equipment3: false
  });

  const handleImageError = (imageName: string) => {
    setImagesError(prev => ({...prev, [imageName]: true}));
  };

  return (
    <section ref={sectionRef} id="equipements" className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-athletis-dark to-gray-900"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-athletis-green-800/20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-athletis-green-800/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image gallery side */}
          <motion.div 
            className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="col-span-2 rounded-2xl overflow-hidden h-56 sm:h-64 lg:h-72 relative shadow-athletis">
              {imagesError.equipment1 ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-athletis-green-500">
                  <span className="text-xl font-semibold">Équipements Premium</span>
                </div>
              ) : (
                <Image 
                  src="/images/equipment-1.jpg" 
                  alt="Équipement de musculation haut de gamme" 
                  fill
                  className="object-cover"
                  onError={() => handleImageError('equipment1')}
                />
              )}
            </div>
            <div className="rounded-xl overflow-hidden h-40 sm:h-48 relative shadow-athletis">
              {imagesError.equipment2 ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-athletis-green-500">
                  <span className="font-semibold">Machines</span>
                </div>
              ) : (
                <Image 
                  src="/images/equipment-2.jpg" 
                  alt="Machine de musculation" 
                  fill
                  className="object-cover"
                  onError={() => handleImageError('equipment2')}
                />
              )}
            </div>
            <div className="rounded-xl overflow-hidden h-40 sm:h-48 relative shadow-athletis">
              {imagesError.equipment3 ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-athletis-green-500">
                  <span className="font-semibold">Poids libres</span>
                </div>
              ) : (
                <Image 
                  src="/images/equipment-3.jpg" 
                  alt="Haltères et poids" 
                  fill
                  className="object-cover"
                  onError={() => handleImageError('equipment3')}
                />
              )}
            </div>
          </motion.div>
          
          {/* Text content side */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="max-w-lg mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-title text-white mb-6">
                ÉQUIPEMENTS <span className="text-athletis-green-500">PREMIUM</span>
              </h2>
              
              <div className="h-1 w-20 bg-athletis-green-600 mb-6"></div>
              
              <p className="text-gray-300 mb-6 text-base sm:text-lg">
                Découvrez notre gamme d'équipements haut de gamme Hammer Strength, Life Fitness et Technogym, conçus pour des performances optimales et des résultats exceptionnels.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-athletis-green-900 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-athletis-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base sm:text-lg">Machines guidées</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Sécurité et efficacité maximales</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-athletis-green-900 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-athletis-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base sm:text-lg">Poids libres</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Pour un développement fonctionnel</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-athletis-green-900 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-athletis-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base sm:text-lg">Zone cardio</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Équipements dernière génération</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-athletis-green-900 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-athletis-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base sm:text-lg">Espace fonctionnel</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Pour les entraînements diversifiés</p>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/equipements" 
                className="inline-block px-8 py-4 rounded-lg bg-athletis-green-600 hover:bg-athletis-green-700 text-white font-medium text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-athletis-green-600/30 transform hover:-translate-y-1"
              >
                Découvrir nos équipements
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 