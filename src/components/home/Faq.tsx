"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const faqItems = [
    {
      question: "Quels sont les horaires d'ouverture ?",
      answer: "Notre salle est ouverte du lundi au vendredi de 6h à 23h, le samedi de 8h à 22h et le dimanche de 9h à 20h. Les horaires peuvent être modifiés pendant les jours fériés."
    },
    {
      question: "Y a-t-il des coachs disponibles sur place ?",
      answer: "Oui, nous avons une équipe de coachs professionnels disponibles pour vous accompagner. Vous pouvez réserver une séance personnalisée ou participer à nos cours collectifs dirigés par nos coachs."
    },
    {
      question: "Comment réserver un cours collectif ?",
      answer: "Vous pouvez réserver un cours collectif directement depuis notre site web dans la section Planning, ou via notre application mobile. Les réservations peuvent être effectuées jusqu'à 1 heure avant le début du cours."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Les conditions d'annulation dépendent du type d'abonnement choisi. Certains forfaits incluent un engagement minimum, tandis que d'autres sont sans engagement. Consultez notre page Tarifs pour plus de détails."
    }
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-32 bg-gradient-to-b from-gray-200 to-transparent opacity-70"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-athletis-green-500/5"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-athletis-green-500/10"></div>
        <div className="absolute top-1/4 right-10 w-6 h-6 rounded-full bg-athletis-green-500/20"></div>
        <div className="absolute bottom-1/4 left-10 w-6 h-6 rounded-full bg-athletis-green-500/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h6 className="text-athletis-green-600 text-lg font-semibold mb-3">QUESTIONS FRÉQUENTES</h6>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-title text-gray-900 mb-6">
            BESOIN D'<span className="text-athletis-green-600">AIDE</span> ?
          </h2>
          <div className="h-1 w-20 bg-athletis-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Retrouvez les réponses aux questions les plus fréquemment posées par nos membres. 
            Si vous ne trouvez pas l'information que vous cherchez, n'hésitez pas à nous contacter.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Accordion section */}
          <motion.div 
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg divide-y divide-gray-100 overflow-hidden">
              {faqItems.map((item, index) => (
                <div key={index} className="overflow-hidden">
                  <button 
                    onClick={() => toggleAccordion(index)} 
                    className={`w-full flex justify-between items-center p-5 md:p-6 text-left transition ${expandedIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  >
                    <span className="text-gray-900 font-medium text-base sm:text-lg">{item.question}</span>
                    <span className="ml-4 flex-shrink-0">
                      <svg 
                        className={`w-5 h-5 text-athletis-green-600 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        <div className="p-5 md:p-6 pt-0 text-gray-600">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center lg:text-left">
              <Link 
                href="/faq" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-athletis-green-600 hover:bg-athletis-green-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-athletis-green-600/30 transform hover:-translate-y-1"
              >
                Voir toutes les questions
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
          
          {/* Contact card section */}
          <motion.div 
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-athletis-green-900/40 to-gray-900/90 z-0"></div>
              
              <div className="relative z-10 p-6 md:p-8">
                <div className="w-14 h-14 rounded-xl bg-athletis-green-500/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-4">Vous ne trouvez pas votre réponse ?</h3>
                
                <p className="text-gray-300 mb-6">
                  Notre équipe est disponible pour répondre à toutes vos questions concernant nos services, abonnements et installations.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400">contact@athletis.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">Téléphone</p>
                      <p className="text-gray-400">01 23 45 67 89</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/contact" 
                  className="block w-full text-center py-3 px-4 border-2 border-athletis-green-500 rounded-lg text-athletis-green-400 font-medium hover:bg-athletis-green-500/10 transition-colors duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 