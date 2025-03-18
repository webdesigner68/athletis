"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Cta() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-athletis-green-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-athletis-green-700 rounded-full filter blur-[120px]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900/95 p-8 md:p-12 lg:p-16 rounded-3xl border border-gray-800 shadow-athletis-lg max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
                Prêt à transformer votre <span className="text-athletis-green-500">entraînement</span> ?
              </h2>
              
              <p className="text-gray-300 text-lg">
                Rejoignez ATHLETIS PURE MUSCULATION et découvrez une nouvelle dimension de la musculation avec nos équipements haut de gamme.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-athletis-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Abonnement à partir de 19,95€/mois</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-athletis-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Badge d'accès à 15€</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-athletis-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Ouvert 7j/7 de 6h à 23h</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/contact#inscription" 
                  className="px-8 py-4 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-all duration-300 font-medium text-center hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  S'inscrire maintenant
                </Link>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors duration-300 font-medium text-center"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
            
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/cta-image.jpg"
                alt="ATHLETIS PURE MUSCULATION Equipment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-athletis-green-500 p-2 rounded-md mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Ouvert aujourd'hui</p>
                    <p className="text-athletis-green-400 text-sm">6:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 