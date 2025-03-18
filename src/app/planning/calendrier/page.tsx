"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WeeklyCalendar from '@/components/planning/WeeklyCalendar';

// Types pour les événements du calendrier
interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  day: number; // 0-6 (lundi-dimanche)
  category: 'cours' | 'personnel' | 'coaching';
  location?: string;
  color: string;
  isRecurring: boolean;
}

// Types pour les cours du planning principal
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
  intensity: 1 | 2 | 3;
  category: 'musculation' | 'cardio' | 'yoga' | 'hiit';
  timeSlots: TimeSlot[];
}

// Événements de démonstration (utilisés seulement si aucune donnée n'est trouvée)
const demoEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Power Lifting',
    startTime: '18:00',
    endTime: '19:30',
    day: 0, // Lundi
    category: 'cours',
    location: 'Salle principale',
    color: 'athletis',
    isRecurring: false
  },
  {
    id: 'event-2',
    title: 'Cardio Box',
    startTime: '17:00',
    endTime: '18:00',
    day: 1, // Mardi
    category: 'cours',
    location: 'Salle de combat',
    color: 'athletis',
    isRecurring: false
  },
  {
    id: 'event-3',
    title: 'Yoga Flow',
    startTime: '7:00',
    endTime: '8:00',
    day: 2, // Mercredi
    category: 'cours',
    location: 'Espace zen',
    color: 'athletis',
    isRecurring: false
  },
  {
    id: 'event-4',
    title: 'Entraînement Jambes',
    startTime: '16:00',
    endTime: '17:30',
    day: 3, // Jeudi
    category: 'personnel',
    color: 'blue',
    isRecurring: false
  },
  {
    id: 'event-5',
    title: 'Coaching Personnalisé',
    startTime: '10:00',
    endTime: '11:00',
    day: 5, // Samedi
    category: 'coaching',
    location: 'Espace coaching',
    color: 'green',
    isRecurring: false
  },
  {
    id: 'event-6',
    title: 'HIIT Challenge',
    startTime: '19:00',
    endTime: '20:00',
    day: 4, // Vendredi
    category: 'cours',
    location: 'Salle fitness',
    color: 'athletis',
    isRecurring: false
  },
];

// Clé pour le stockage local (identique à celle utilisée dans la page admin)
const STORAGE_KEY = 'athletis-classes';

// Fonction pour convertir les cours du planning en événements pour le calendrier
function convertClassesToEvents(classes: Class[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  
  // Pour chaque cours
  classes.forEach(classItem => {
    // Pour chaque créneau horaire du cours
    classItem.timeSlots.forEach(slot => {
      // Utiliser le jour spécifié dans le créneau
      const day = slot.day;
      
      // Créer un événement pour ce cours
      events.push({
        id: `${classItem.id}-${slot.id}`,
        title: classItem.name,
        startTime: slot.startTime,
        endTime: slot.endTime,
        day: day,
        category: 'cours',
        location: getCategoryLocation(classItem.category),
        color: getCategoryColor(classItem.category),
        isRecurring: slot.isRecurring
      });
    });
  });
  
  return events;
}

// Fonction pour obtenir un emplacement en fonction de la catégorie
function getCategoryLocation(category: string): string {
  switch (category) {
    case 'musculation':
      return 'Salle de musculation';
    case 'cardio':
      return 'Espace cardio';
    case 'yoga':
      return 'Espace zen';
    case 'hiit':
      return 'Salle fitness';
    default:
      return 'Salle principale';
  }
}

// Fonction pour obtenir une couleur en fonction de la catégorie
function getCategoryColor(category: string): string {
  switch (category) {
    case 'musculation':
      return 'athletis';
    case 'cardio':
      return 'orange';
    case 'yoga':
      return 'green';
    case 'hiit':
      return 'red';
    default:
      return 'blue';
  }
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [personalEvents, setPersonalEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // État pour le formulaire de nouvel événement
  const [newEvent, setNewEvent] = useState({
    title: '',
    day: '0',
    startTime: '08:00',
    endTime: '09:00',
    category: 'personnel',
    location: '',
  });

  // Chargement des données du planning depuis le localStorage
  useEffect(() => {
    const loadEvents = () => {
      try {
        // Chargement des événements personnels
        const savedPersonalEvents = localStorage.getItem('personal-events');
        if (savedPersonalEvents) {
          setPersonalEvents(JSON.parse(savedPersonalEvents));
        }
        
        // Chargement des cours du planning
        const savedClasses = localStorage.getItem(STORAGE_KEY);
        if (savedClasses && savedClasses !== 'undefined') {
          const classes: Class[] = JSON.parse(savedClasses);
          const courseEvents = convertClassesToEvents(classes);
          setEvents([...courseEvents, ...personalEvents]);
        } else {
          // Si aucun cours n'est trouvé, utiliser les événements de démonstration
          setEvents([...demoEvents, ...personalEvents]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        setEvents([...demoEvents, ...personalEvents]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [personalEvents]);
  
  // Enregistrer les événements personnels dans le localStorage
  useEffect(() => {
    if (personalEvents.length > 0) {
      localStorage.setItem('personal-events', JSON.stringify(personalEvents));
    }
  }, [personalEvents]);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };
  
  const closeEventDetail = () => {
    setSelectedEvent(null);
  };
  
  const deleteEvent = (id: string) => {
    // Ne supprimer que les événements personnels, pas les cours
    if (selectedEvent?.category === 'personnel' || selectedEvent?.category === 'coaching') {
      setPersonalEvents(personalEvents.filter(event => event.id !== id));
      setSelectedEvent(null);
    } else {
      alert("Vous ne pouvez pas supprimer un cours. Veuillez vous rendre dans l'administration pour gérer les cours.");
    }
  };
  
  const openAddEventModal = () => {
    setShowAddEventModal(true);
  };
  
  const closeAddEventModal = () => {
    setShowAddEventModal(false);
    setNewEvent({
      title: '',
      day: '0',
      startTime: '08:00',
      endTime: '09:00',
      category: 'personnel',
      location: '',
    });
  };
  
  const handleNewEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };
  
  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer un nouvel événement personnel
    const personalEvent: CalendarEvent = {
      id: `personal-${Date.now()}`,
      title: newEvent.title,
      day: parseInt(newEvent.day),
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      category: newEvent.category as 'personnel' | 'coaching',
      color: newEvent.category === 'coaching' ? 'green' : 'blue',
      location: newEvent.location || undefined,
      isRecurring: false
    };
    
    setPersonalEvents([...personalEvents, personalEvent]);
    closeAddEventModal();
  };

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-athletis-green-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Chargement du calendrier...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8">
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-title text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              MON CALENDRIER
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Visualisez et planifiez vos entraînements, cours et sessions de coaching
            </motion.p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={openAddEventModal}
              className="px-4 sm:px-5 py-2 sm:py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors flex items-center justify-center font-heading uppercase text-xs sm:text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter au planning
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link 
                href="/planning" 
                className="px-4 sm:px-5 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center font-heading uppercase text-xs sm:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Cours disponibles
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Calendrier hebdomadaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <WeeklyCalendar events={events} onEventClick={handleEventClick} />
        </motion.div>

        {/* Section d'aide rapide */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-athletis-green-900 flex items-center justify-center mb-3 sm:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-heading text-white mb-1 sm:mb-2">Synchronisation automatique</h3>
            <p className="text-xs sm:text-sm text-gray-400">Vos réservations de cours sont automatiquement ajoutées à votre calendrier personnel.</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-athletis-green-900 flex items-center justify-center mb-3 sm:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-heading text-white mb-1 sm:mb-2">Rappels personnalisés</h3>
            <p className="text-xs sm:text-sm text-gray-400">Recevez des notifications 30 minutes avant le début de vos sessions programmées.</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-athletis-green-900 flex items-center justify-center mb-3 sm:mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-heading text-white mb-1 sm:mb-2">Suivi de progression</h3>
            <p className="text-xs sm:text-sm text-gray-400">Le système analyse automatiquement votre fréquence d'entraînement et votre constance.</p>
          </div>
        </div>
      </div>

      {/* Modal des détails d'un événement */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full border border-gray-700 shadow-athletis"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg sm:text-xl font-heading text-white">{selectedEvent.title}</h3>
              <button onClick={closeEventDetail} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][selectedEvent.day]}
                  {selectedEvent.category === 'cours' && selectedEvent.isRecurring && 
                    <span className="ml-2 px-1.5 py-0.5 bg-athletis-green-900 text-athletis-green-300 text-xs rounded-sm">
                      hebdomadaire
                    </span>
                  }
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">{selectedEvent.startTime} - {selectedEvent.endTime}</span>
              </div>
              
              {selectedEvent.location && (
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300">{selectedEvent.location}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">
                  {selectedEvent.category === 'cours' ? 'Cours collectif' : 
                   selectedEvent.category === 'personnel' ? 'Entraînement personnel' : 'Coaching privé'}
                </span>
              </div>
            </div>
            
            <div className="mt-5 sm:mt-6 flex space-x-3">
              {selectedEvent.category === 'personnel' && (
                <button 
                  onClick={() => deleteEvent(selectedEvent.id)}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
              )}
              <button 
                onClick={closeEventDetail}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal d'ajout d'événement */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full border border-gray-700 shadow-athletis"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg sm:text-xl font-heading text-white">Ajouter au planning</h3>
              <button onClick={closeAddEventModal} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={addEvent} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleNewEventChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-athletis-green-500"
                  placeholder="Ex: Entraînement Dos/Biceps"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    Heure de début *
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={newEvent.startTime}
                    onChange={handleNewEventChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-athletis-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    Heure de fin *
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={newEvent.endTime}
                    onChange={handleNewEventChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-athletis-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="day" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Jour *
                </label>
                <select
                  id="day"
                  name="day"
                  value={newEvent.day}
                  onChange={handleNewEventChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-athletis-green-500"
                >
                  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, index) => (
                    <option key={day} value={index}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={newEvent.category}
                  onChange={handleNewEventChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-athletis-green-500"
                >
                  <option value="personnel">Entraînement personnel</option>
                  <option value="coaching">Coaching privé</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                  Emplacement (optionnel)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newEvent.location || ''}
                  onChange={handleNewEventChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-athletis-green-500"
                  placeholder="Ex: Zone de musculation"
                />
              </div>
              
              <div className="mt-5 sm:mt-6 flex space-x-3">
                <button 
                  type="button"
                  onClick={closeAddEventModal}
                  className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 