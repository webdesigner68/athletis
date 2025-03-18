"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Types pour les réservations
interface Reservation {
  id: string;
  className: string;
  day: string;
  date: string;
  time: string;
  trainer: string;
  status: 'confirmed' | 'pending' | 'cancelled';
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

// Clé pour le stockage local (identique à celle utilisée dans la page admin)
const STORAGE_KEY = 'athletis-classes';
const RESERVATIONS_KEY = 'athletis-reservations';

// Jours de la semaine
const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Données fictives pour les réservations (utilisées si aucune donnée n'est trouvée)
const mockReservations: Reservation[] = [
  {
    id: 'res-001',
    className: 'Power Lifting',
    day: 'Lundi',
    date: '22/03/2025',
    time: '18:00 - 19:30',
    trainer: 'Thomas Renault',
    status: 'confirmed',
  },
  {
    id: 'res-002',
    className: 'Yoga Flow',
    day: 'Mercredi',
    date: '24/03/2025',
    time: '07:00 - 08:00',
    trainer: 'Léa Dubois',
    status: 'pending',
  },
  {
    id: 'res-003',
    className: 'HIIT Challenge',
    day: 'Vendredi',
    date: '26/03/2025',
    time: '19:00 - 20:00',
    trainer: 'Marc Leblanc',
    status: 'confirmed',
  },
  {
    id: 'res-004',
    className: 'Cardio Box',
    day: 'Samedi',
    date: '27/03/2025',
    time: '10:00 - 11:00',
    trainer: 'Sophie Martin',
    status: 'cancelled',
  },
];

// Fonction pour générer des réservations à partir des cours
function generateReservationsFromClasses(classes: Class[]): Reservation[] {
  const reservations: Reservation[] = [];
  const now = new Date();
  
  classes.forEach(classItem => {
    classItem.timeSlots.forEach(slot => {
      // Utiliser le jour du créneau pour calculer la prochaine date
      const currentDay = now.getDay(); // 0 est dimanche, 1 est lundi, etc.
      const targetDay = slot.day; // 0 est lundi dans notre système, 6 est dimanche
      
      // Convertir notre système (où 0=lundi) vers le système de JavaScript (où 0=dimanche)
      const jsTargetDay = targetDay === 6 ? 0 : targetDay + 1;
      
      // Calculer le nombre de jours à ajouter pour atteindre le prochain jour cible
      let daysToAdd = jsTargetDay - currentDay;
      if (daysToAdd <= 0) daysToAdd += 7; // Si le jour est déjà passé cette semaine, aller à la semaine prochaine
      
      const reservationDate = new Date(now);
      reservationDate.setDate(now.getDate() + daysToAdd);
      
      // Format de date DD/MM/YYYY
      const dateStr = `${String(reservationDate.getDate()).padStart(2, '0')}/${
        String(reservationDate.getMonth() + 1).padStart(2, '0')}/${
        reservationDate.getFullYear()}`;
      
      // Statut aléatoire
      const statuses: Array<'confirmed' | 'pending' | 'cancelled'> = ['confirmed', 'pending', 'cancelled'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      reservations.push({
        id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        className: classItem.name,
        day: daysOfWeek[slot.day], // Utiliser le jour du créneau
        date: dateStr,
        time: `${slot.startTime} - ${slot.endTime}`,
        trainer: classItem.trainer,
        status: status
      });
    });
  });
  
  return reservations;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Chargement des réservations depuis le localStorage
  useEffect(() => {
    const loadReservations = () => {
      try {
        // D'abord, essayer de charger les réservations existantes
        const savedReservations = localStorage.getItem(RESERVATIONS_KEY);
        if (savedReservations && savedReservations !== 'undefined') {
          setReservations(JSON.parse(savedReservations));
          setIsLoading(false);
          return;
        }
        
        // Si pas de réservations, générer à partir des cours
        const savedClasses = localStorage.getItem(STORAGE_KEY);
        if (savedClasses && savedClasses !== 'undefined') {
          const classes: Class[] = JSON.parse(savedClasses);
          const generatedReservations = generateReservationsFromClasses(classes);
          setReservations(generatedReservations);
          localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(generatedReservations));
        } else {
          // Si pas de cours non plus, utiliser les données fictives
          setReservations(mockReservations);
          localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(mockReservations));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
        setReservations(mockReservations);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReservations();
  }, []);
  
  // Sauvegarder les réservations dans le localStorage lors des modifications
  useEffect(() => {
    if (reservations.length > 0 && !isLoading) {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    }
  }, [reservations, isLoading]);
  
  // Filtrer les réservations selon le filtre actif
  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.status === filter);
  
  // Annuler une réservation
  const handleCancelReservation = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));
    }
  };
  
  // Obtenir l'affichage du statut
  const getStatusDisplay = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Confirmée
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            En attente
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Annulée
          </span>
        );
    }
  };
  
  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-athletis-green-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Chargement des réservations...</p>
        </div>
      </div>
    );
  }
  
  // Compteur des statuts
  const statusCount = {
    all: reservations.length,
    confirmed: reservations.filter(res => res.status === 'confirmed').length,
    pending: reservations.filter(res => res.status === 'pending').length,
    cancelled: reservations.filter(res => res.status === 'cancelled').length,
  };

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
              MES RÉSERVATIONS
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Gérez vos réservations de cours et votre planning d'entraînement
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 md:mt-0"
          >
            <Link 
              href="/planning" 
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors font-heading uppercase text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Réserver un cours
            </Link>
          </motion.div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-athletis overflow-hidden border border-gray-700">
          {/* Filtres */}
          <div className="bg-gray-900 p-3 sm:p-4 border-b border-gray-700 overflow-x-auto">
            <div className="flex flex-wrap gap-2 sm:gap-3 min-w-max">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center ${
                  filter === 'all'
                    ? 'bg-athletis-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Tous
                <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-gray-700 rounded-full text-xs">
                  {statusCount.all}
                </span>
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center ${
                  filter === 'confirmed'
                    ? 'bg-green-800 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Confirmés
                <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-gray-700 rounded-full text-xs">
                  {statusCount.confirmed}
                </span>
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center ${
                  filter === 'pending'
                    ? 'bg-yellow-800 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                En attente
                <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-gray-700 rounded-full text-xs">
                  {statusCount.pending}
                </span>
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center ${
                  filter === 'cancelled'
                    ? 'bg-red-800 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Annulés
                <span className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-gray-700 rounded-full text-xs">
                  {statusCount.cancelled}
                </span>
              </button>
            </div>
          </div>

          {/* Liste des réservations */}
          <div className="p-3 sm:p-4">
            {filteredReservations.length > 0 ? (
              <div className="overflow-x-auto">
                {/* Table pour desktop et tablette */}
                <table className="w-full hidden sm:table">
                  <thead className="text-xs uppercase text-gray-400 bg-gray-900 rounded-lg">
                    <tr>
                      <th className="px-3 sm:px-4 py-3 text-left">Cours</th>
                      <th className="px-3 sm:px-4 py-3 text-left">Jour & Date</th>
                      <th className="px-3 sm:px-4 py-3 text-left">Horaire</th>
                      <th className="px-3 sm:px-4 py-3 text-left">Coach</th>
                      <th className="px-3 sm:px-4 py-3 text-left">Statut</th>
                      <th className="px-3 sm:px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredReservations.map((reservation) => (
                      <motion.tr 
                        key={reservation.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-750"
                      >
                        <td className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-white">
                          {reservation.className}
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-300">
                          {reservation.day} <span className="text-gray-500 text-xs sm:text-sm">{reservation.date}</span>
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-300">
                          {reservation.time}
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-300">
                          {reservation.trainer}
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4">
                          {getStatusDisplay(reservation.status)}
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">
                          {reservation.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Annuler
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {/* Version mobile sous forme de cartes */}
                <div className="sm:hidden space-y-3">
                  {filteredReservations.map((reservation) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-750 rounded-lg p-3 border border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white">{reservation.className}</h3>
                        <div>{getStatusDisplay(reservation.status)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
                        <div>
                          <span className="block text-gray-500">Jour</span>
                          {reservation.day} {reservation.date}
                        </div>
                        <div>
                          <span className="block text-gray-500">Horaire</span>
                          {reservation.time}
                        </div>
                        <div>
                          <span className="block text-gray-500">Coach</span>
                          {reservation.trainer}
                        </div>
                      </div>
                      {reservation.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancelReservation(reservation.id)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors mt-1 w-full text-center py-1.5 border border-red-900/50 rounded-md bg-red-900/20"
                        >
                          Annuler la réservation
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-600 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg sm:text-xl font-heading text-gray-400 mb-2">Aucune réservation trouvée</h3>
                <p className="text-sm text-gray-500 mb-5 sm:mb-6">Vous n'avez aucune réservation correspondant au filtre sélectionné.</p>
                <Link 
                  href="/planning" 
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors font-heading uppercase text-sm"
                >
                  Réserver un cours
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Section d'aide */}
        <div className="mt-8 sm:mt-12 bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-heading text-white mb-4">INFORMATIONS SUR LES RÉSERVATIONS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-athletis-green-900 flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-heading text-white mb-1 sm:mb-2">Délai d'annulation</h3>
              <p className="text-xs sm:text-sm text-gray-400">Vous pouvez annuler votre réservation jusqu'à 4 heures avant le début du cours sans frais.</p>
            </div>
            
            <div className="p-3 sm:p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-athletis-green-900 flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-heading text-white mb-1 sm:mb-2">Absence non signalée</h3>
              <p className="text-xs sm:text-sm text-gray-400">Trois absences non signalées dans un délai d'un mois peuvent entraîner une restriction temporaire des réservations.</p>
            </div>
            
            <div className="p-3 sm:p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-athletis-green-900 flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-heading text-white mb-1 sm:mb-2">Liste d'attente</h3>
              <p className="text-xs sm:text-sm text-gray-400">Si un cours est complet, vous pouvez vous inscrire sur liste d'attente et serez notifié automatiquement en cas de désistement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 