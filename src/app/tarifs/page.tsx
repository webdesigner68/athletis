"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types pour nos formules d'abonnement
type PricingPlan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number; // Prix annuel mensuel (économie)
  features: string[];
  popular?: boolean;
  badge?: string;
};

// Type pour les questions fréquentes
type FAQ = {
  question: string;
  answer: string;
};

export default function TarifsPage() {
  // État pour basculer entre les tarifs mensuels et annuels
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // Liste des formules d'abonnement
  const pricingPlans: PricingPlan[] = [
    {
      id: 'flex',
      name: 'Flex',
      description: 'Sans engagement',
      priceMonthly: 34.95,
      priceAnnual: 34.95,
      features: [
        'Accès illimité 7j/7',
        'Heures d\'ouverture étendues (6h-23h)',
        'Machines Hammer Strength',
        'Vestiaires individuels',
        'Parking gratuit',
      ],
      badge: 'Sans engagement',
    },
    {
      id: 'essential',
      name: 'Essential',
      description: 'Engagement 12 mois',
      priceMonthly: 29.95,
      priceAnnual: 29.95,
      features: [
        'Accès illimité 7j/7',
        'Heures d\'ouverture étendues (6h-23h)',
        'Machines Hammer Strength',
        'Vestiaires individuels',
        'Parking gratuit',
        'Séance de coaching offerte',
      ],
      popular: true,
      badge: 'Engagement 12 mois',
    },
    {
      id: 'discovery',
      name: 'Pass Découverte',
      description: 'Séance unique',
      priceMonthly: 8.95,
      priceAnnual: 8.95,
      features: [
        'Accès pour une séance',
        'Machines Hammer Strength',
        'Vestiaires individuels',
        'Parking gratuit',
        'Sans engagement',
        'Conseils personnalisés',
      ],
      badge: 'Séance unique',
    },
  ];

  // Liste des questions fréquentes sur les tarifs
  const faqs: FAQ[] = [
    {
      question: 'Quels sont les frais d\'inscription?',
      answer: 'Les frais pour le badge d\'accès s\'élèvent à 15€. Ces frais sont à régler une seule fois lors de votre inscription.',
    },
    {
      question: 'Puis-je suspendre mon abonnement?',
      answer: 'Oui, vous pouvez suspendre votre abonnement en cas de blessure, maladie ou déplacement professionnel de plus de 30 jours, sur présentation d\'un justificatif. Cette suspension prolonge la durée de votre abonnement.',
    },
    {
      question: 'Existe-t-il des réductions pour les étudiants?',
      answer: 'Oui, nous proposons une réduction de 10% sur tous nos abonnements pour les étudiants sur présentation d\'une carte étudiant valide.',
    },
    {
      question: 'Comment s\'effectuent les prélèvements?',
      answer: 'Les prélèvements s\'effectuent automatiquement tous les mois à date fixe. Vous pouvez choisir entre le 1er, le 5 ou le 10 du mois pour votre date de prélèvement.',
    },
    {
      question: 'Quelle est la politique d\'annulation?',
      answer: 'Pour les formules sans engagement à 34,95€/mois, vous pouvez résilier à tout moment avec un préavis de 30 jours. Pour les formules avec engagement de 12 mois à 29,95€/mois, vous vous engagez sur la durée spécifiée. Passé ce délai, l\'abonnement continue mois par mois et peut être résilié avec un préavis de 30 jours.',
    },
    {
      question: 'Y a-t-il des avantages à payer en une seule fois?',
      answer: 'Oui, avec notre formule annuelle à 363,50€ (au lieu de 435,35€), vous bénéficiez de 12 semaines offertes par rapport au paiement mensuel, ce qui représente une économie significative.',
    },
  ];

  // Prix fixes pour affichage
  const badgePrice = 15;
  const annualPrice = 363.50;
  const regularYearlyPrice = 435.35;

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Nos <span className="text-athletis-green-500">Tarifs</span>
            </h1>
            <p className="text-xl text-gray-300">
              ATHLETIS PURE MUSCULATION vous propose des formules d'abonnement adaptées à tous les profils et budgets.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Intro */}
      <section className="py-20 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full">
                <span className="text-athletis-green-500 font-medium">Abonnements Flexibles</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Tarifs <span className="text-athletis-green-500">transparents</span> et sans surprise
              </h2>
              <p className="text-gray-400 text-lg">
                Chez ATHLETIS, nous croyons que l'accès à un entraînement de qualité devrait être accessible à tous. C'est pourquoi nous proposons des formules adaptées à chaque besoin, avec des prix clairs et sans coûts cachés.
              </p>
              
              <div className="border-l-4 border-athletis-green-500 pl-4 py-2 my-6">
                <p className="text-white italic">
                  "Nous ne sommes pas la salle la moins chère, mais nous garantissons le meilleur rapport qualité-prix pour votre entraînement."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Badge d'accès: 15€</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Pass découverte: 8,95€</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Sans engagement: 34,95€</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Paiement sécurisé</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-athletis-lg">
                <Image
                  src="/images/pricing-intro.jpg"
                  alt="Tarifs ATHLETIS"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-athletis-green-600 rounded-lg p-6 shadow-athletis-lg max-w-[240px]">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white font-semibold text-lg">À partir de</p>
                  <p className="text-white font-bold text-3xl">29,95€</p>
                </div>
                <p className="text-white text-sm">par mois avec engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Nos Formules <span className="text-athletis-green-500">d'Abonnement</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-10">
              Choisissez la formule qui correspond le mieux à vos besoins et à votre budget. Tous nos abonnements donnent accès à l'ensemble de nos équipements premium.
            </p>
            
            {/* Toggle Monthly/Annual */}
            <div className="inline-flex items-center bg-gray-800 p-1 rounded-full shadow-athletis">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full transition-all ${
                  !isAnnual 
                    ? 'bg-athletis-green-600 text-white shadow-xl' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full transition-all ${
                  isAnnual 
                    ? 'bg-athletis-green-600 text-white shadow-xl' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annuel
              </button>
            </div>
            {isAnnual && (
              <p className="text-athletis-green-500 text-sm mt-3">
                Abonnement annuel: 363,50€ au lieu de 435,35€
              </p>
            )}
          </div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`bg-gray-800 border rounded-xl overflow-hidden shadow-athletis transition-all hover:translate-y-[-8px] ${
                  plan.popular 
                    ? 'border-athletis-green-500 relative z-10 scale-105 md:scale-110' 
                    : 'border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="bg-athletis-green-600 text-white text-center py-2 font-medium">
                    Recommandé
                  </div>
                )}
                
                <div className="p-8">
                  {plan.badge && (
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full mb-4">
                      {plan.badge}
                    </span>
                  )}
                  
                  <div className="py-8 px-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-300 mt-1">{plan.description}</p>
                    
                    <div className="mt-5 flex items-baseline">
                      <span className="text-4xl font-bold text-white">
                        {isAnnual && plan.id === 'essential' 
                          ? `${annualPrice.toFixed(2).replace('.', ',')}€` 
                          : `${(isAnnual ? plan.priceAnnual : plan.priceMonthly).toFixed(2).replace('.', ',')}€`}
                      </span>
                      <span className="ml-2 text-gray-300">
                        {isAnnual && plan.id === 'essential' ? '/ an' : plan.id === 'discovery' ? '/ séance' : '/ mois'}
                      </span>
                    </div>

                    {isAnnual && plan.id === 'essential' && (
                      <div>
                        <p className="text-sm text-gray-300 mt-2">
                          Au lieu de {regularYearlyPrice.toFixed(2).replace('.', ',')}€
                        </p>
                        <p className="text-sm font-medium bg-athletis-green-900/30 px-2 py-1 rounded-lg inline-block mt-2">
                          12 SEMAINES OFFERTES !
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    href="/contact?plan={plan.id}"
                    className={`w-full block text-center py-3 px-6 rounded-lg transition-colors ${
                      plan.popular 
                        ? 'bg-athletis-green-600 hover:bg-athletis-green-700 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Choisir cette formule
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white">Information importante</h3>
            </div>
            <p className="text-gray-300">
              Des frais de badge d'accès uniques de 15€ s'appliquent à toutes les formules d'abonnement. Pour toute question concernant nos tarifs ou pour des offres spéciales (couples, groupes, entreprises), n'hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      </section>

      {/* Offres spéciales */}
      <section className="py-20 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Offres <span className="text-athletis-green-500">Spéciales</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez nos offres spéciales et nos réductions pour certaines catégories de membres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl shadow-athletis border border-gray-800 hover:border-athletis-green-500 transition-colors">
              <div className="bg-athletis-green-900/30 p-4 rounded-xl inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Offre Duo</h3>
              <p className="text-gray-400 mb-4">
                Venez à deux et bénéficiez de -15% sur vos abonnements. Valable pour les couples, amis ou membres de la même famille.
              </p>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Prix par personne</span>
                  <span className="text-athletis-green-500 font-semibold">
                    dès 25,46€/mois
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl shadow-athletis border border-gray-800 hover:border-athletis-green-500 transition-colors">
              <div className="bg-athletis-green-900/30 p-4 rounded-xl inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Offre Étudiants</h3>
              <p className="text-gray-400 mb-4">
                Sur présentation d'une carte étudiante valide, bénéficiez de -10% sur tous nos abonnements.
              </p>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Abonnement mensuel</span>
                  <span className="text-athletis-green-500 font-semibold">
                    dès 26,96€/mois
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl shadow-athletis border border-gray-800 hover:border-athletis-green-500 transition-colors">
              <div className="bg-athletis-green-900/30 p-4 rounded-xl inline-flex mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Offre Corporate</h3>
              <p className="text-gray-400 mb-4">
                Pour les entreprises souhaitant offrir des avantages à leurs employés. Tarifs dégressifs selon le nombre d'inscriptions.
              </p>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Devis personnalisé</span>
                  <Link href="/contact" className="text-athletis-green-500 font-semibold hover:text-athletis-green-400">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Questions <span className="text-athletis-green-500">Fréquentes</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Retrouvez les réponses aux questions les plus fréquemment posées concernant nos tarifs et abonnements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Vous avez d'autres questions concernant nos tarifs?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors"
            >
              <span>Contactez-nous</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-athletis-green-700 via-athletis-green-500 to-athletis-green-700"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-800 shadow-athletis-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Prêt à commencer votre <span className="text-athletis-green-500">transformation</span>?
                </h2>
                <p className="text-gray-300 mb-6">
                  Ne remettez pas votre forme physique à plus tard. Inscrivez-vous dès aujourd'hui et commencez votre parcours vers un corps plus fort et plus sain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors text-center"
                  >
                    S'inscrire maintenant
                  </Link>
                  <Link
                    href="/a-propos"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors text-center"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="/images/cta-pricing.jpg"
                  alt="Abonnement ATHLETIS"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-athletis-green-500 p-2 rounded-md mr-4">
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Accès illimité</p>
                          <p className="text-athletis-green-400 text-sm">7j/7 • 6h-23h</p>
                        </div>
                      </div>
                      <Link
                        href="/contact#pass-decouverte"
                        className="hidden md:block bg-athletis-green-600 hover:bg-athletis-green-700 px-4 py-2 rounded text-white text-sm transition-colors"
                      >
                        Pass découverte 8,95€
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 