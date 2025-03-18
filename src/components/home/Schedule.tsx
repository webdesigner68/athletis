"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [patternImageError, setPatternImageError] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const classesList = [
    {
      name: "Body Pump",
      time: "Lun, Mer, Ven | 18h00",
      color: "bg-pink-500"
    },
    {
      name: "Hiit Training",
      time: "Mar, Jeu | 19h30",
      color: "bg-orange-500"
    },
    {
      name: "Yoga Fitness",
      time: "Sam | 10h00",
      color: "bg-athletis-green-500"
    },
    {
      name: "Spinning",
      time: "Lun, Jeu | 12h15",
      color: "bg-purple-500"
    }
  ];

  return (
    <section ref={sectionRef} id="planning" className="py-16 md:py-24 bg-athletis-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-athletis-green-800/20 blur-3xl"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-athletis-green-800/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl">
          <div className="absolute inset-0 bg-gradient-radial from-athletis-green-900/20 to-transparent opacity-30"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h6 className="text-athletis-green-500 text-lg font-semibold mb-3">RESTEZ ACTIF</h6>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-title text-white mb-6">
            PLANNING DES <span className="text-athletis-green-500">COURS</span>
          </h2>
          <div className="h-1 w-20 bg-athletis-green-600 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Rejoignez nos cours collectifs et entraînements dirigés par nos coachs professionnels. 
            Réservez votre place et transformez votre corps à travers des séances dynamiques et motivantes.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Calendar preview side */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-athletis p-6 border border-gray-700">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Cours populaires</h3>
                <span className="text-sm font-medium text-athletis-green-400">Ce mois</span>
              </div>
              
              <motion.div 
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="space-y-4"
              >
                {classesList.map((cls, index) => (
                  <motion.div key={index} variants={item} className="bg-gray-700/50 rounded-lg p-4 flex items-center">
                    <div className={`w-3 h-12 ${cls.color} rounded-full mr-4`}></div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{cls.name}</h4>
                      <p className="text-gray-400 text-sm">{cls.time}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-600/70 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-athletis-green-600/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-athletis-green-600/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="absolute -z-10 -bottom-10 -right-10 w-60 h-60">
              {!patternImageError ? (
                <Image 
                  src="/images/pattern-dots.png" 
                  alt="Pattern décoratif" 
                  width={240}
                  height={240}
                  className="opacity-20"
                  onError={() => setPatternImageError(true)}
                />
              ) : (
                <div className="w-full h-full opacity-20 grid grid-cols-10 gap-2">
                  {[...Array(100)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
                  ))}
                </div>
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
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-athletis-green-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Une variété de cours pour tous</h3>
              </div>
              
              <p className="text-gray-300 mb-6 text-base sm:text-lg">
                Notre planning offre une grande variété de cours adaptés à tous les niveaux, des débutants aux athlètes confirmés. Réservez facilement votre place et suivez vos progrès grâce à notre système de réservation en ligne.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-athletis-green-500 flex-shrink-0"></div>
                  <p className="text-gray-300">Body Pump</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-pink-500 flex-shrink-0"></div>
                  <p className="text-gray-300">Pilates</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0"></div>
                  <p className="text-gray-300">Spinning</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500 flex-shrink-0"></div>
                  <p className="text-gray-300">HIIT</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <p className="text-gray-300">Yoga Fitness</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0"></div>
                  <p className="text-gray-300">Boxe Training</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Link 
                  href="/planning" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-athletis-green-600 hover:bg-athletis-green-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-athletis-green-600/30 transform hover:-translate-y-1"
                >
                  Voir le planning
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link 
                  href="/planning/reservations" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-300"
                >
                  Réserver un cours
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 