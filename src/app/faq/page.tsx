"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Type pour les catégories de FAQ
type FAQCategory = {
  id: string;
  name: string;
  icon: JSX.Element;
};

// Type pour les questions fréquentes
type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

export default function FAQPage() {
  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // État pour la question ouverte
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Catégories de FAQ
  const categories: FAQCategory[] = [
    {
      id: 'all',
      name: 'Toutes les questions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: 'general',
      name: 'Informations générales',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'abonnements',
      name: 'Abonnements & Tarifs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'equipements',
      name: 'Équipements',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 'acces',
      name: 'Accès & Horaires',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'regles',
      name: 'Règlement intérieur',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  // Liste des questions fréquentes
  const faqItems: FAQItem[] = [
    {
      question: 'Quels sont les horaires d\'ouverture?',
      answer: 'ATHLETIS PURE MUSCULATION est ouvert 7j/7 de 6h à 23h, y compris les jours fériés. Notre système d\'accès par badge vous permet d\'accéder à la salle quand vous le souhaitez dans ces plages horaires.',
      category: 'acces',
    },
    {
      question: 'Comment fonctionne l\'accès à la salle?',
      answer: 'L\'accès à la salle se fait par badge magnétique personnel qui vous est remis lors de votre inscription. Ce badge est strictement personnel et ne doit pas être prêté. Il vous permet d\'entrer dans la salle 7j/7 pendant les heures d\'ouverture.',
      category: 'acces',
    },
    {
      question: 'Y a-t-il des coachs disponibles?',
      answer: 'Oui, des coachs diplômés d\'État sont présents à certaines heures pour vous aider dans vos entraînements. Les horaires de présence des coachs sont affichés à l\'accueil et sur notre site web. Des séances de coaching personnalisées peuvent également être réservées en supplément.',
      category: 'general',
    },
    {
      question: 'Quels types d\'équipements proposez-vous?',
      answer: 'Nous disposons d\'une gamme complète d\'équipements Hammer Strength haut de gamme, comprenant des machines guidées, des poids libres (haltères, barres, disques), des équipements cardio (tapis de course, vélos, elliptiques) et une zone d\'entraînement fonctionnel. Tous nos équipements sont sélectionnés pour leur qualité et leur biomécanique optimale.',
      category: 'equipements',
    },
    {
      question: 'Comment puis-je m\'inscrire?',
      answer: 'Vous pouvez vous inscrire directement à l\'accueil de notre salle ou en ligne sur notre site web dans la section Contact. Vous devrez remplir un formulaire d\'inscription, fournir une pièce d\'identité, un RIB pour les prélèvements mensuels, et régler les frais de badge d\'accès et le premier mois d\'abonnement.',
      category: 'general',
    },
    {
      question: 'Quels sont vos tarifs?',
      answer: 'Notre abonnement standard avec engagement 12 mois est à 29,95€/mois. La formule sans engagement est à 34,95€/mois. Des frais de badge d\'accès uniques de 15€ s\'appliquent aux abonnements. Nous proposons également un Pass Découverte à 8,95€ pour essayer notre salle. Pour plus de détails, consultez notre page Tarifs ou demandez à l\'accueil.',
      category: 'abonnements',
    },
    {
      question: 'Quelle est la durée d\'engagement?',
      answer: 'Nous proposons des formules avec et sans engagement. Les formules avec engagement ont une durée de 12 mois, tandis que les formules sans engagement peuvent être résiliées à tout moment avec un préavis de 30 jours.',
      category: 'abonnements',
    },
    {
      question: 'Y a-t-il des vestiaires et des douches?',
      answer: 'Oui, nous disposons de vestiaires spacieux avec des casiers sécurisés (prévoir un cadenas ou possibilité d\'en acheter à l\'accueil) et des cabines de change individuelles pour plus d\'intimité. Des douches individuelles sont également à votre disposition.',
      category: 'general',
    },
    {
      question: 'Le parking est-il gratuit?',
      answer: 'Oui, un grand parking gratuit est à disposition de nos membres. Il est accessible directement devant la salle et dispose de plus de 50 places.',
      category: 'acces',
    },
    {
      question: 'Quelle est la politique d\'annulation?',
      answer: 'Pour les formules sans engagement, vous pouvez résilier à tout moment avec un préavis de 30 jours. Pour les formules avec engagement, vous vous engagez sur la durée spécifiée (12 mois généralement). Passé ce délai, l\'abonnement continue mois par mois et peut être résilié avec un préavis de 30 jours.',
      category: 'abonnements',
    },
    {
      question: 'Puis-je suspendre temporairement mon abonnement?',
      answer: 'Oui, vous pouvez suspendre votre abonnement en cas de blessure, maladie ou déplacement professionnel de plus de 30 jours, sur présentation d\'un justificatif. Cette suspension prolonge la durée de votre abonnement.',
      category: 'abonnements',
    },
    {
      question: 'Proposez-vous des cours collectifs?',
      answer: 'Non, ATHLETIS PURE MUSCULATION est une salle spécialisée dans la musculation pure. Nous ne proposons pas de cours collectifs afin de nous concentrer sur l\'excellence de notre offre de musculation et la qualité de nos équipements.',
      category: 'general',
    },
    {
      question: 'Y a-t-il un âge minimum pour s\'inscrire?',
      answer: 'L\'âge minimum pour s\'inscrire est de 16 ans avec autorisation parentale. À partir de 18 ans, aucune autorisation n\'est nécessaire.',
      category: 'general',
    },
    {
      question: 'Quelles sont les règles d\'hygiène à respecter?',
      answer: 'Nous demandons à tous nos membres de respecter quelques règles simples : porter des vêtements propres et adaptés, utiliser une serviette sur les machines et bancs, nettoyer l\'équipement après utilisation avec les sprays désinfectants mis à disposition, et ranger le matériel après usage.',
      category: 'regles',
    },
    {
      question: 'Faut-il porter des chaussures spécifiques?',
      answer: 'Oui, des chaussures de sport propres et réservées à l\'usage intérieur sont obligatoires. Les chaussures de ville ou utilisées à l\'extérieur ne sont pas autorisées pour des raisons d\'hygiène.',
      category: 'regles',
    },
    {
      question: 'L\'utilisation de magnésie est-elle autorisée?',
      answer: 'Oui, la magnésie est autorisée dans notre salle. Cependant, nous demandons aux utilisateurs de magnésie en poudre d\'en faire un usage modéré et de nettoyer après utilisation. La magnésie liquide est recommandée pour limiter la dispersion.',
      category: 'regles',
    },
    {
      question: 'Les nouveaux membres bénéficient-ils d\'un accompagnement?',
      answer: 'Oui, chaque nouveau membre bénéficie d\'une séance d\'introduction gratuite avec l\'un de nos coachs. Cette séance permet de vous familiariser avec les équipements, d\'évaluer votre condition physique et de vous orienter vers un programme adapté à vos objectifs.',
      category: 'general',
    },
    {
      question: 'Proposez-vous des programmes d\'entraînement personnalisés?',
      answer: 'Oui, nos coachs diplômés peuvent établir des programmes d\'entraînement personnalisés en fonction de vos objectifs, de votre niveau et de vos contraintes. Ce service est inclus dans certaines formules d\'abonnement ou disponible en option.',
      category: 'general',
    },
    {
      question: 'Y a-t-il un espace cardio-training?',
      answer: 'Oui, nous disposons d\'un espace cardio-training équipé de machines dernière génération : tapis de course, vélos, elliptiques, rameurs et steppers. Ces équipements complètent parfaitement votre entraînement en musculation.',
      category: 'equipements',
    },
    {
      question: 'Comment sont entretenus les équipements?',
      answer: 'Tous nos équipements font l\'objet d\'un entretien régulier par des professionnels. Un nettoyage quotidien est effectué par notre équipe, et une maintenance préventive est réalisée chaque mois. En cas de panne, nos équipements sont réparés ou remplacés dans les plus brefs délais.',
      category: 'equipements',
    },
    {
      question: 'Puis-je venir tester la salle avant de m\'inscrire?',
      answer: 'Oui, nous proposons des séances d\'essai gratuites. Il suffit de nous contacter par téléphone ou via le formulaire sur notre site pour réserver votre séance d\'essai.',
      category: 'general',
    },
  ];

  // Filtrer les questions par catégorie et recherche
  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle l'état d'ouverture d'une question
  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Foire Aux <span className="text-athletis-green-500">Questions</span>
            </h1>
            <p className="text-xl text-gray-300">
              Retrouvez les réponses aux questions les plus fréquemment posées sur ATHLETIS PURE MUSCULATION.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-16 bg-athletis-dark border-b border-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-12">
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 py-4 text-white pl-12 focus:outline-none focus:ring-2 focus:ring-athletis-green-500 focus:border-transparent"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-athletis-green-600 text-white shadow-athletis'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="mb-2">
                    {category.icon}
                  </div>
                  <span className="text-sm text-center">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Questions */}
      <section className="py-20 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {searchQuery && filteredFAQs.length === 0 && (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl text-gray-400 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-500">
                  Aucune question ne correspond à votre recherche "{searchQuery}".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors"
                >
                  Effacer la recherche
                </button>
              </div>
            )}

            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 transition-shadow hover:shadow-athletis"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left p-6 flex justify-between items-center"
                  >
                    <h3 className="text-lg font-medium text-white pr-8">{faq.question}</h3>
                    <div className={`transition-transform duration-300 ${openQuestionIndex === index ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openQuestionIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-gray-700">
                          <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Vous ne trouvez pas la réponse à votre question?
            </h2>
            <p className="text-gray-400 mb-8">
              N'hésitez pas à nous contacter directement, nous serons ravis de vous aider.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors text-center"
              >
                Nous contacter
              </Link>
              <a
                href="tel:+33389000000"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-center flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                03 89 00 00 00
              </a>
            </div>
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
                  Prêt à rejoindre <span className="text-athletis-green-500">ATHLETIS</span>?
                </h2>
                <p className="text-gray-300 mb-6">
                  Découvrez notre salle de musculation premium et commencez votre parcours vers un corps plus fort et plus sain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/tarifs"
                    className="px-6 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors text-center"
                  >
                    Voir nos tarifs
                  </Link>
                  <Link
                    href="/equipements"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors text-center"
                  >
                    Nos équipements
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="bg-athletis-green-900/30 p-3 rounded-xl inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Horaires</h3>
                  <p className="text-gray-400">Ouvert 7j/7</p>
                  <p className="text-athletis-green-500">6h - 23h</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="bg-athletis-green-900/30 p-3 rounded-xl inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Adresse</h3>
                  <p className="text-gray-400">123 Rue de Mulhouse</p>
                  <p className="text-athletis-green-500">68100 Mulhouse</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="bg-athletis-green-900/30 p-3 rounded-xl inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Téléphone</h3>
                  <p className="text-gray-400">Appelez-nous</p>
                  <p className="text-athletis-green-500">03 89 00 00 00</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="bg-athletis-green-900/30 p-3 rounded-xl inline-flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400">Contactez-nous</p>
                  <p className="text-athletis-green-500">info@athletis.fr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 