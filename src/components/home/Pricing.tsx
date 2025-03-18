"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Calculer les prix en fonction du mode d'abonnement
  const standardMonthly = 29.95;
  const standardAnnual = 29.95; // Prix mensuel en mode annuel (même que mensuel)
  const standardAnnualTotal = 363.50; // Prix annuel total
  const regularYearlyPrice = 435.35; // Prix annuel régulier (pour montrer l'économie)
  const badgePrice = 15.00;
  const discoveryPass = 8.95;
  const flexPrice = 34.95; // Sans engagement
  
  // Calcul des économies (différence entre le prix annuel régulier et le prix annuel réduit)
  const standardSavings = (regularYearlyPrice - standardAnnualTotal).toFixed(2);

  return (
    <section className="py-24 bg-athletis-dark" id="tarifs">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full mb-5">
            <span className="text-athletis-green-500 font-medium">Simplicité et transparence</span>
          </div>
          <h2 className="athletis-section-title mb-4">
            Des tarifs clairs et sans surprise
          </h2>
          <p className="athletis-description max-w-3xl mx-auto">
            Chez ATHLETIS, nous proposons des formules simples et adaptées à tous, sans frais cachés ni suppléments.
          </p>
          
          {/* Toggle Switch */}
          <div className="mt-10 max-w-xs mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Par prélèvement
              </span>
              <button 
                className="relative inline-flex h-8 w-16 items-center rounded-full cursor-pointer bg-gray-800 border border-gray-700"
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Toggle billing period"
              >
                <span className="sr-only">Toggle billing period</span>
                <span
                  className={`transition-transform duration-300 inline-block h-6 w-6 transform rounded-full bg-athletis-green-500 ${
                    isAnnual ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Annuel
              </span>
            </div>
            <div className="text-center mt-3">
              <span className="inline-flex items-center justify-center text-sm text-athletis-green-500 bg-athletis-green-900/30 px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span>12 semaines offertes avec l'abonnement annuel</span>
              </span>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row justify-center gap-8 mt-12"
        >
          {/* Pricing Card - Standard */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-athletis border border-gray-800 max-w-md w-full lg:w-5/12 transition-transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-athletis-green-800 to-athletis-green-600 py-8 px-6">
              <h3 className="text-2xl font-semibold text-white uppercase tracking-wide">Abonnement Standard</h3>
              <p className="text-gray-200 mt-2">Accès complet aux installations premium</p>

              <div className="mt-6 flex items-end">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {isAnnual ? `${standardAnnualTotal.toFixed(2).replace('.', ',')}€` : `${standardMonthly.toFixed(2).replace('.', ',')}€`}
                </span>
                <span className="text-lg text-white opacity-80 ml-2">{isAnnual ? '/ an' : '/ mois'}</span>
              </div>
              
              {isAnnual && (
                <div className="mt-2">
                  <p className="text-sm text-gray-200">Au lieu de {regularYearlyPrice.toFixed(2).replace('.', ',')}€</p>
                  <p className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg inline-block mt-2">
                    12 SEMAINES OFFERTES !
                  </p>
                </div>
              )}
            </div>

            <div className="p-8">
              <ul className="space-y-4">
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Accès illimité 7j/7 de 6h à 23h</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Machines Hammer Strength haut de gamme</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Cabines individuelles</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Parking gratuit</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Conseils personnalisés</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Badge d'accès</span>
                  <span className="text-white font-medium">{badgePrice.toFixed(2).replace('.', ',')}€</span>
                </div>
                <Link 
                  href="/contact#inscription" 
                  className="btn-athletis w-full flex items-center justify-center"
                >
                  <span>Commencer maintenant</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Pricing Card - Discovery Pass */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-athletis-lg border border-athletis-green-700 max-w-md w-full lg:w-5/12 transition-transform hover:scale-105 relative"
          >
            <div className="absolute -top-5 right-0 left-0 flex justify-center">
              <motion.span 
                className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold text-base uppercase tracking-wider shadow-lg"
                animate={{ 
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 10px 15px -3px rgba(234, 179, 8, 0.3), 0 4px 6px -4px rgba(234, 179, 8, 0.3)",
                    "0 20px 25px -5px rgba(234, 179, 8, 0.5), 0 10px 10px -5px rgba(234, 179, 8, 0.5)",
                    "0 10px 15px -3px rgba(234, 179, 8, 0.3), 0 4px 6px -4px rgba(234, 179, 8, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ESSAI
              </motion.span>
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 py-8 px-6">
              <h3 className="text-2xl font-semibold text-white uppercase tracking-wide">Pass Découverte</h3>
              <p className="text-gray-200 mt-2">Essayez notre salle sans engagement</p>

              <div className="mt-6 flex items-end">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {discoveryPass.toFixed(2).replace('.', ',')}€
                </span>
                <span className="text-lg text-white opacity-80 ml-2">/ séance</span>
              </div>
            </div>

            <div className="p-8">
              <ul className="space-y-4">
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Accès à toutes les installations</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Idéal pour découvrir la salle</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Sans engagement</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Valable pour une séance</span>
                </li>
                <li className="athletis-list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="athletis-check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Conseils personnalisés inclus</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-4">Pièces à fournir : pièce d'identité, moyen de paiement, tenue adaptée pour les entraînements</p>
                <Link 
                  href="/contact#pass-decouverte" 
                  className="w-full flex items-center justify-center px-6 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-md transition-all duration-300 font-bold uppercase tracking-wider transform hover:-translate-y-1 shadow-lg text-lg"
                >
                  <span>RÉSERVER UN ESSAI</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 py-6 px-8 rounded-xl max-w-3xl mx-auto highlight-block border-l-0 pl-0">
            <h4 className="text-xl font-heading mb-4 uppercase">Vous avez des questions sur nos tarifs ?</h4>
            <p className="text-gray-400 mb-4">
              Pour plus d'informations sur nos formules ou pour des tarifs spéciaux (groupes, entreprises, étudiants), n'hésitez pas à nous contacter directement.
            </p>
            <Link
              href="/tarifs"
              className="inline-flex items-center text-athletis-green-500 hover:text-athletis-green-400 font-medium transition-colors"
            >
              <span>Voir tous nos tarifs en détail</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 