"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types pour nos équipements
type Equipment = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  muscleGroups: string[];
  image: string;
};

// Types pour les catégories
type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
};

export default function EquipmentsPage() {
  // Définition des catégories d'équipements
  const categories: Category[] = [
    {
      id: 'hammer-strength',
      name: 'Hammer Strength',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Machines haut de gamme Hammer Strength offrant une biomécanique parfaite pour des entraînements efficaces et sécurisés.',
    },
    {
      id: 'cardio',
      name: 'Cardio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Équipements cardio dernière génération pour améliorer votre endurance et compléter vos séances de musculation.',
    },
    {
      id: 'poids-libres',
      name: 'Poids Libres',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      description: 'Une large gamme d\'haltères, de barres et de disques pour les exercices de base et avancés.',
    },
    {
      id: 'accessoires',
      name: 'Accessoires & Fonctionnel',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
      description: 'Accessoires variés pour diversifier vos entraînements et cibler tous les groupes musculaires.',
    },
  ];

  // Liste des équipements
  const equipments: Equipment[] = [
    {
      id: 'chest-press',
      name: 'Chest Press Hammer Strength',
      category: 'hammer-strength',
      description: 'Le Chest Press Hammer Strength offre un mouvement biomécanique optimal pour développer les pectoraux en toute sécurité.',
      features: [
        'Mouvement convergent naturel',
        'Poignées multi-positions',
        'Siège ajustable en hauteur',
        'Charge maximale: 200kg',
      ],
      muscleGroups: ['Pectoraux', 'Épaules', 'Triceps'],
      image: '/images/equipments/chest-press.jpg',
    },
    {
      id: 'lat-pulldown',
      name: 'Lat Pulldown Hammer Strength',
      category: 'hammer-strength',
      description: 'Tirage vertical de haute qualité pour un développement optimal du dos, en particulier des grands dorsaux.',
      features: [
        'Design biomécanique avancé',
        'Poignées ergonomiques',
        'Coussin de genoux ajustable',
        'Charge maximale: 180kg',
      ],
      muscleGroups: ['Dorsaux', 'Trapèzes', 'Biceps'],
      image: '/images/equipments/lat-pulldown.jpg',
    },
    {
      id: 'leg-press',
      name: 'Leg Press 45° Hammer Strength',
      category: 'hammer-strength',
      description: 'Presse à cuisses à 45° pour développer puissance et volume au niveau des jambes.',
      features: [
        'Angle optimal de 45°',
        'Plateforme large pour différentes positions des pieds',
        'Dossier ajustable',
        'Charge maximale: 400kg',
      ],
      muscleGroups: ['Quadriceps', 'Ischio-jambiers', 'Fessiers'],
      image: '/images/equipments/leg-press.jpg',
    },
    {
      id: 'dumbbells',
      name: 'Haltères Urethane Premium',
      category: 'poids-libres',
      description: 'Gamme complète d\'haltères en uréthane de 1kg à 50kg, avec incrémentation de 2,5kg.',
      features: [
        'Revêtement en uréthane durable',
        'Prise en main optimale',
        'Poignée ergonomique',
        'Rack dédié à 3 niveaux',
      ],
      muscleGroups: ['Tous les groupes musculaires'],
      image: '/images/equipments/dumbbells.jpg',
    },
    {
      id: 'treadmill',
      name: 'Tapis de Course Life Fitness',
      category: 'cardio',
      description: 'Tapis de course professionnel avec écran intégré et programmes d\'entraînement variés.',
      features: [
        'Vitesse de 0,8 à 20 km/h',
        'Inclinaison de 0 à 15%',
        'Écran tactile HD',
        'Connexion Bluetooth',
        'Programmes d\'entraînement personnalisables',
      ],
      muscleGroups: ['Système cardiovasculaire', 'Jambes', 'Core'],
      image: '/images/equipments/treadmill.jpg',
    },
    {
      id: 'kettlebells',
      name: 'Kettlebells Competition',
      category: 'accessoires',
      description: 'Set complet de kettlebells de compétition de 4kg à 32kg pour les exercices fonctionnels.',
      features: [
        'Acier de haute qualité',
        'Taille standardisée',
        'Poignée ergonomique',
        'Code couleur par poids',
      ],
      muscleGroups: ['Full body', 'Core', 'Épaules'],
      image: '/images/equipments/kettlebells.jpg',
    },
  ];

  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // État pour l'équipement sélectionné pour afficher les détails
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  // Filtrer les équipements par catégorie
  const filteredEquipments = selectedCategory === 'all' 
    ? equipments 
    : equipments.filter(eq => eq.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      },
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
              Nos <span className="text-athletis-green-500">Équipements</span>
            </h1>
            <p className="text-xl text-gray-300">
              ATHLETIS PURE MUSCULATION vous propose une gamme complète d'équipements haut de gamme Hammer Strength pour optimiser votre entraînement.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-athletis-lg">
                <Image
                  src="/images/equipments-overview.jpg"
                  alt="Équipements ATHLETIS"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-athletis-green-600 rounded-lg p-6 shadow-athletis-lg max-w-[240px]">
                <p className="text-white font-semibold text-xl mb-2">+30</p>
                <p className="text-white">Machines haut de gamme</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full">
                <span className="text-athletis-green-500 font-medium">Équipements Premium</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Le meilleur pour <span className="text-athletis-green-500">vos performances</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Chez ATHLETIS, nous avons sélectionné les meilleurs équipements du marché pour vous offrir une expérience d'entraînement optimale. Nos machines Hammer Strength, reconnues mondialement pour leur qualité et leur biomécanique parfaite, vous permettent de progresser efficacement et en toute sécurité.
              </p>
              
              <div className="border-l-4 border-athletis-green-500 pl-4 py-2 my-6">
                <p className="text-white italic">
                  "La qualité des équipements est la fondation d'un entraînement efficace. C'est pourquoi nous n'utilisons que le meilleur."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Hammer Strength</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Life Fitness</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Poids libres</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-athletis-green-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Accessoires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Catégories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Nos Catégories d'<span className="text-athletis-green-500">Équipements</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Découvrez notre large gamme d'équipements classés par catégories pour faciliter votre navigation et trouver exactement ce dont vous avez besoin pour votre entraînement.
            </p>
          </div>

          <div className="flex flex-wrap justify-center mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 m-2 rounded-full transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 m-2 rounded-full transition-colors flex items-center ${
                  selectedCategory === category.id
                    ? 'bg-athletis-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-athletis-green-500 transition-colors shadow-athletis flex flex-col h-full"
              >
                <div className="bg-athletis-green-900/30 p-4 rounded-xl inline-flex mb-4">
                  <div className="text-athletis-green-500">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{category.name}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{category.description}</p>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className="mt-auto inline-flex items-center text-athletis-green-500 hover:text-athletis-green-400 transition-colors"
                >
                  <span>Voir les équipements</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Liste des équipements */}
      <section className="py-20 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {selectedCategory === 'all' 
                ? 'Tous nos Équipements' 
                : `Équipements ${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {selectedCategory === 'all'
                ? 'Découvrez notre sélection complète d\'équipements haut de gamme pour optimiser vos entraînements.'
                : categories.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>

          {filteredEquipments.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEquipments.map((equipment) => (
                <motion.div
                  key={equipment.id}
                  variants={itemVariants}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-athletis border border-gray-800 hover:border-athletis-green-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedEquipment(equipment)}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={equipment.image}
                      alt={equipment.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-athletis-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {categories.find(c => c.id === equipment.category)?.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{equipment.name}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{equipment.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {equipment.muscleGroups.map((muscle, index) => (
                        <span key={index} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
                          {muscle}
                        </span>
                      ))}
                    </div>
                    <button className="inline-flex items-center text-athletis-green-500 hover:text-athletis-green-400 transition-colors">
                      <span>Voir détails</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl text-gray-400">Aucun équipement trouvé dans cette catégorie</h3>
            </div>
          )}
        </div>
      </section>

      {/* Modal pour afficher les détails d'un équipement */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-80 w-full">
              <Image
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedEquipment(null)}
                className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-24"></div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedEquipment.name}</h3>
                  <div className="flex items-center text-sm text-athletis-green-500 mb-4">
                    <span className="mr-2">{categories.find(c => c.id === selectedEquipment.category)?.name}</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span className="mx-2">{selectedEquipment.muscleGroups.join(', ')}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{selectedEquipment.description}</p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Caractéristiques</h4>
                <ul className="space-y-2">
                  {selectedEquipment.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Groupes musculaires travaillés</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEquipment.muscleGroups.map((muscle, index) => (
                    <span key={index} className="bg-athletis-green-900/30 text-athletis-green-500 px-3 py-1 rounded-full text-sm">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-800">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors"
                >
                  Demander plus d'informations
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-athletis-green-700 via-athletis-green-500 to-athletis-green-700"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-800 shadow-athletis-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Prêt à transformer votre <span className="text-athletis-green-500">entraînement</span>?
                </h2>
                <p className="text-gray-300 mb-6">
                  Venez essayer nos équipements de qualité professionnelle et bénéficiez des conseils de nos experts pour optimiser vos séances et atteindre vos objectifs plus rapidement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors text-center"
                  >
                    Contacter nous
                  </Link>
                  <Link
                    href="/tarifs"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors text-center"
                  >
                    Voir nos tarifs
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="/images/cta-equipments.jpg"
                  alt="Équipements ATHLETIS"
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-athletis-green-500 p-2 rounded-md mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Ouvert 7j/7</p>
                      <p className="text-athletis-green-400 text-sm">6:00 - 23:00</p>
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