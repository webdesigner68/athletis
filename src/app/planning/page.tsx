"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types pour les cours et créneaux
interface TimeSlot {
  id: string;
  day: number; // 0-6 (lundi-dimanche)
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  isRecurring: boolean;
}

interface Class {
  id: string;
  name: string;
  description: string;
  trainer: string;
  image: string;
  intensity: 1 | 2 | 3; // 1 = léger, 2 = moyen, 3 = intense
  category: 'musculation' | 'cardio' | 'yoga' | 'hiit';
  timeSlots: TimeSlot[];
}

// Données fictives pour les cours (utilisées uniquement si aucune donnée n'est trouvée dans le localStorage)
const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const fallbackClasses: Class[] = [
  {
    id: '1',
    name: 'Power Lifting',
    description: 'Cours de musculation intensif pour améliorer votre force et votre puissance.',
    trainer: 'Thomas Renault',
    image: '/images/classes/power-lifting.jpg',
    intensity: 3,
    category: 'musculation',
    timeSlots: [
      { id: '1-1', day: 0, startTime: '08:00', endTime: '09:30', maxParticipants: 12, currentParticipants: 8, isRecurring: false },
      { id: '1-2', day: 4, startTime: '18:00', endTime: '19:30', maxParticipants: 12, currentParticipants: 10, isRecurring: false },
    ],
  },
  {
    id: '2',
    name: 'Cardio Box',
    description: 'Un mélange explosif de boxe et de cardio pour brûler un maximum de calories.',
    trainer: 'Sophie Martin',
    image: '/images/classes/cardio-box.jpg',
    intensity: 3,
    category: 'cardio',
    timeSlots: [
      { id: '2-1', day: 1, startTime: '10:00', endTime: '11:00', maxParticipants: 15, currentParticipants: 12, isRecurring: false },
      { id: '2-2', day: 5, startTime: '17:00', endTime: '18:00', maxParticipants: 15, currentParticipants: 7, isRecurring: false },
    ],
  },
  {
    id: '3',
    name: 'Yoga Flow',
    description: 'Séance de yoga dynamique pour améliorer votre souplesse et votre équilibre.',
    trainer: 'Léa Dubois',
    image: '/images/classes/yoga-flow.jpg',
    intensity: 1,
    category: 'yoga',
    timeSlots: [
      { id: '3-1', day: 0, startTime: '07:00', endTime: '08:00', maxParticipants: 20, currentParticipants: 15, isRecurring: false },
      { id: '3-2', day: 4, startTime: '19:30', endTime: '20:30', maxParticipants: 20, currentParticipants: 18, isRecurring: false },
    ],
  },
  {
    id: '4',
    name: 'HIIT Challenge',
    description: 'Entraînement par intervalles à haute intensité pour des résultats rapides.',
    trainer: 'Marc Leblanc',
    image: '/images/classes/hiit.jpg',
    intensity: 3,
    category: 'hiit',
    timeSlots: [
      { id: '4-1', day: 2, startTime: '12:00', endTime: '13:00', maxParticipants: 15, currentParticipants: 14, isRecurring: false },
      { id: '4-2', day: 5, startTime: '19:00', endTime: '20:00', maxParticipants: 15, currentParticipants: 9, isRecurring: false },
    ],
  },
  {
    id: '5',
    name: 'Core Training',
    description: 'Cours axé sur le renforcement des abdominaux et du dos.',
    trainer: 'Julien Bernard',
    image: '/images/classes/core.jpg',
    intensity: 2,
    category: 'musculation',
    timeSlots: [
      { id: '5-1', day: 1, startTime: '09:00', endTime: '10:00', maxParticipants: 18, currentParticipants: 12, isRecurring: false },
      { id: '5-2', day: 5, startTime: '17:30', endTime: '18:30', maxParticipants: 18, currentParticipants: 16, isRecurring: false },
    ],
  },
  {
    id: '6',
    name: 'Stretch & Relax',
    description: 'Session d\'étirements pour améliorer la récupération et réduire les courbatures.',
    trainer: 'Emma Petit',
    image: '/images/classes/stretch.jpg',
    intensity: 1,
    category: 'yoga',
    timeSlots: [
      { id: '6-1', day: 2, startTime: '11:00', endTime: '12:00', maxParticipants: 20, currentParticipants: 16, isRecurring: false },
      { id: '6-2', day: 6, startTime: '20:30', endTime: '21:30', maxParticipants: 20, currentParticipants: 13, isRecurring: false },
    ],
  },
];

// Clé pour le stockage local (identique à celle utilisée dans la page admin)
const STORAGE_KEY = 'athletis-classes';

export default function PlanningPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Jours de la semaine
  const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // Charger les données depuis le localStorage
  useEffect(() => {
    const loadClasses = () => {
      try {
        const savedClasses = localStorage.getItem(STORAGE_KEY);
        if (savedClasses && savedClasses !== 'undefined') {
          setClasses(JSON.parse(savedClasses));
        } else {
          // Utiliser les données de secours si aucune donnée n'est trouvée
          setClasses(fallbackClasses);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des classes:', error);
        setClasses(fallbackClasses);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  // Filtrer les cours par catégorie
  const filteredClasses = selectedCategory 
    ? classes.filter(c => c.category === selectedCategory) 
    : classes;

  // Fonction pour gérer la réservation
  const handleBooking = () => {
    if (selectedClass && selectedTimeSlot) {
      alert(`Réservation confirmée pour le cours "${selectedClass.name}" le ${daysOfWeek[selectedDay]} à ${selectedTimeSlot}`);
      // Ici, vous pourriez ajouter la logique pour enregistrer la réservation dans une base de données
    }
  };

  // Générer les intensités (niveau de difficulté)
  const renderIntensity = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-2 h-5 rounded-sm ${i <= level ? 'bg-athletis-green-500' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    );
  };

  // Afficher un message de chargement pendant le chargement des données
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-athletis-green-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Chargement du planning...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-athletis-dark/70 to-athletis-dark/90 z-10" />
        <Image
          src="/images/planning-hero.jpg"
          alt="Planning des cours"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-title text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            PLANNING DES COURS
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-athletis-light/90 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre programme complet de cours collectifs encadrés par nos coachs professionnels
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Sélection du jour */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl font-heading mb-4">CHOISISSEZ VOTRE JOUR</h2>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4">
            {daysOfWeek.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                className={`py-2 sm:py-3 px-1 sm:px-2 rounded-lg text-center transition-all duration-300 ${
                  selectedDay === index
                    ? 'bg-athletis-green-600 text-white font-medium shadow-athletis'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="block text-xs sm:text-sm md:text-base font-heading">{day.substring(0, 3)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl font-heading mb-4">FILTRER PAR CATÉGORIE</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedCategory('musculation')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === 'musculation'
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Musculation
            </button>
            <button
              onClick={() => setSelectedCategory('cardio')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === 'cardio'
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cardio
            </button>
            <button
              onClick={() => setSelectedCategory('yoga')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === 'yoga'
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Yoga
            </button>
            <button
              onClick={() => setSelectedCategory('hiit')}
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === 'hiit'
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              HIIT
            </button>
          </div>
        </div>

        {/* Message si aucun cours n'est disponible */}
        {filteredClasses.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-300 mb-2">Aucun cours disponible pour cette catégorie.</p>
            <p className="text-gray-400">Veuillez sélectionner une autre catégorie ou consulter notre programme ultérieurement.</p>
          </div>
        )}

        {/* Affichage des cours */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((classItem) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-gray-800 rounded-xl overflow-hidden shadow-athletis-lg hover:shadow-athletis-green-500/20 transition-all duration-300 border border-gray-700 ${
                selectedClass?.id === classItem.id ? 'ring-2 ring-athletis-green-500' : ''
              }`}
              onClick={() => setSelectedClass(classItem)}
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={classItem.image || '/images/classes/default-class.jpg'}
                  alt={classItem.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Si l'image ne peut pas être chargée, utiliser une image par défaut
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Éviter les boucles infinies
                    target.src = '/images/classes/default-class.jpg';
                  }}
                />
                <div className="absolute top-2 right-2 bg-athletis-dark/80 rounded-full px-3 py-1 text-xs font-medium text-white">
                  {classItem.category.toUpperCase()}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg sm:text-xl font-heading text-white">{classItem.name}</h3>
                  <div>{renderIntensity(classItem.intensity)}</div>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mb-4">{classItem.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-athletis-green-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-200">{classItem.trainer}</span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-xs sm:text-sm font-heading mb-2 text-gray-300">HORAIRES</h4>
                  <div className="space-y-2">
                    {classItem.timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTimeSlot(`${slot.startTime} - ${slot.endTime}`);
                          setSelectedClass(classItem);
                        }}
                        className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm flex justify-between items-center rounded-md transition-colors ${
                          selectedTimeSlot === `${slot.startTime} - ${slot.endTime}` && selectedClass?.id === classItem.id
                            ? 'bg-athletis-green-600 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                        disabled={slot.currentParticipants >= slot.maxParticipants}
                      >
                        <span>{slot.startTime} - {slot.endTime}</span>
                        <span className={slot.currentParticipants >= slot.maxParticipants ? 'text-red-400' : 'text-athletis-green-400'}>
                          {slot.currentParticipants}/{slot.maxParticipants}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Section de réservation */}
        {selectedClass && selectedTimeSlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 sm:mt-12 bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 shadow-athletis"
          >
            <h2 className="text-xl sm:text-2xl font-heading mb-4">RÉSERVER VOTRE COURS</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg sm:text-xl font-heading text-athletis-green-500 mb-2">{selectedClass.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{selectedClass.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-200">Coach: {selectedClass.trainer}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-200">Jour: {daysOfWeek[selectedDay]}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-200">Horaire: {selectedTimeSlot}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-200">Intensité: {selectedClass.intensity}/3</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 sm:p-5 mt-4 md:mt-0">
                <h3 className="text-base sm:text-lg font-heading mb-4 text-athletis-green-400">CONFIRMER VOTRE RÉSERVATION</h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-6">En confirmant votre réservation, vous vous engagez à participer au cours. Toute annulation doit être effectuée au moins 4 heures avant le début du cours.</p>
                <button
                  onClick={handleBooking}
                  className="w-full py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors flex items-center justify-center font-heading uppercase text-sm sm:text-base"
                >
                  <span>Réserver maintenant</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal détaillé d'un cours */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl max-w-md lg:max-w-lg w-full border border-gray-700 overflow-hidden shadow-athletis">
            <div className="relative h-40 sm:h-48">
              <Image
                src={selectedClass.image || '/images/classes/default-class.jpg'}
                alt={selectedClass.name}
                fill
                className="object-cover"
                onError={(e) => {
                  // Si l'image ne peut pas être chargée, utiliser une image par défaut
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Éviter les boucles infinies
                  target.src = '/images/classes/default-class.jpg';
                }}
              />
              <button 
                onClick={() => setSelectedClass(null)} 
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg sm:text-xl font-heading text-white">{selectedClass.name}</h3>
                <div>{renderIntensity(selectedClass.intensity)}</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-4">{selectedClass.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-athletis-green-500 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-200">{selectedClass.trainer}</span>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedClass.timeSlots.map(slot => (
                  <span 
                    key={slot.id} 
                    className="inline-block px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300"
                  >
                    {weekdays[slot.day]} {slot.startTime}
                    {slot.isRecurring && <span className="ml-1 text-athletis-green-400">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 