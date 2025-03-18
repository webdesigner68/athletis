"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// Types
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

// Props du composant
interface WeeklyCalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

export default function WeeklyCalendar({ events, onEventClick }: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleDays, setVisibleDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  
  // Jours de la semaine
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  // Heures d'ouverture (de 6h à 23h)
  const hours = Array.from({ length: 18 }, (_, i) => i + 6);

  // Formater l'heure
  const formatHour = (hour: number) => {
    return `${hour}:00`;
  };

  // Obtenir la position verticale de l'événement
  const getEventTop = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    return (hours - 6) * 60 + minutes;
  };

  // Obtenir la hauteur de l'événement
  const getEventHeight = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    return endTotalMinutes - startTotalMinutes;
  };

  // Obtenir le nom de la couleur pour le fond et le texte
  const getEventColors = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string, border: string }> = {
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500' },
      athletis: { bg: 'bg-athletis-green-600/20', text: 'text-athletis-green-400', border: 'border-athletis-green-500' },
    };
    
    return colorMap[color] || colorMap.athletis;
  };

  // Changer de semaine
  const changeWeek = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (increment * 7));
    setCurrentDate(newDate);
  };

  // Formatage de la date pour l'en-tête
  const getWeekDateRange = () => {
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = (day === 0 ? 6 : day - 1);
    startOfWeek.setDate(currentDate.getDate() - diff);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short',
      }).format(date);
    };
    
    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  // Obtenir la date pour chaque jour
  const getDayDate = (dayIndex: number) => {
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = (day === 0 ? 6 : day - 1);
    startOfWeek.setDate(currentDate.getDate() - diff);
    
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + dayIndex);
    
    return dayDate.getDate();
  };

  // Vérifier si le jour est aujourd'hui
  const isToday = (dayIndex: number) => {
    const today = new Date();
    const startOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    const diff = (day === 0 ? 6 : day - 1);
    startOfWeek.setDate(currentDate.getDate() - diff);
    
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + dayIndex);
    
    return (
      today.getDate() === dayDate.getDate() &&
      today.getMonth() === dayDate.getMonth() &&
      today.getFullYear() === dayDate.getFullYear()
    );
  };

  // Filtrer les événements pour les jours visibles (utile en mode mobile)
  const getFilteredEvents = () => {
    return events.filter(event => visibleDays.includes(event.day));
  };

  // Navigation mobile - changement de jour
  const handleDayChange = (dayIndex: number) => {
    if (window.innerWidth < 640) {
      setVisibleDays([dayIndex]);
    }
  };

  // Réinitialiser tous les jours visibles pour desktop
  const resetVisibleDays = () => {
    setVisibleDays([0, 1, 2, 3, 4, 5, 6]);
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-athletis">
      {/* En-tête du calendrier */}
      <div className="bg-gray-900 p-3 sm:p-4 border-b border-gray-700 flex justify-between items-center">
        <button 
          onClick={() => changeWeek(-1)}
          className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-heading text-white">{getWeekDateRange()}</h2>
          <p className="text-xs sm:text-sm text-gray-400">Semaine {new Date(currentDate).getWeek()}</p>
        </div>
        
        <button 
          onClick={() => changeWeek(1)}
          className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Version mobile - sélecteur de jour */}
      <div className="sm:hidden bg-gray-900 border-b border-gray-700 p-2 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {daysOfWeek.map((day, index) => (
            <button
              key={day}
              onClick={() => handleDayChange(index)}
              className={`px-3 py-2 rounded-lg text-center transition-all duration-200 min-w-[70px] ${
                visibleDays.includes(index)
                  ? 'bg-athletis-green-600 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              <span className="block text-xs font-medium">{day.substring(0, 3)}</span>
              <span className={`text-lg font-heading ${isToday(index) ? 'text-athletis-green-300' : ''}`}>
                {getDayDate(index)}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Corps du calendrier */}
      <div className="relative overflow-auto" style={{ maxHeight: '600px' }}>
        <div className="grid grid-cols-8 border-b border-gray-700 sticky top-0 z-10 bg-gray-900">
          <div className="p-2 text-center border-r border-gray-700 text-gray-400 w-16 sm:w-20"></div>
          {daysOfWeek.map((day, index) => (
            <div 
              key={day} 
              className={`p-2 text-center border-r border-gray-700 ${
                isToday(index) ? 'bg-athletis-green-900/30' : ''
              } ${window.innerWidth < 640 && !visibleDays.includes(index) ? 'hidden' : ''}`}
            >
              <div className="text-xs sm:text-sm font-medium text-gray-300 hidden sm:block">{day}</div>
              <div className={`text-base sm:text-xl font-heading hidden sm:block ${isToday(index) ? 'text-athletis-green-400' : 'text-white'}`}>
                {getDayDate(index)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative">
          {/* Lignes des heures */}
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-700">
              <div className="p-1 sm:p-2 text-right pr-2 sm:pr-3 border-r border-gray-700 text-gray-400 text-xs sm:text-sm w-16 sm:w-20">
                {formatHour(hour)}
              </div>
              {daysOfWeek.map((_, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className={`border-r border-gray-700 h-12 sm:h-14 ${
                    isToday(dayIndex) ? 'bg-athletis-green-900/10' : ''
                  } ${window.innerWidth < 640 && !visibleDays.includes(dayIndex) ? 'hidden' : ''}`}
                >
                  {/* Indicateur de demi-heure */}
                  <div className="border-t border-gray-700 border-dashed mt-6 opacity-70"></div>
                </div>
              ))}
            </div>
          ))}
          
          {/* Événements */}
          {getFilteredEvents().map((event) => {
            const top = getEventTop(event.startTime);
            const height = getEventHeight(event.startTime, event.endTime);
            const { bg, text, border } = getEventColors(event.color);
            
            // Calculer la largeur et la position en fonction du mode d'affichage (mobile ou desktop)
            const isDesktop = visibleDays.length > 1;
            const left = isDesktop ? `${(event.day + 1) * 12.5}%` : '12.5%';
            const width = isDesktop ? '11%' : '87%';
            
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: left,
                  height: `${height}px`,
                  width: width,
                  zIndex: 20,
                }}
                className={`rounded-md ${bg} ${border} border p-1 sm:p-2 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => onEventClick && onEventClick(event)}
              >
                <div className={`text-xs sm:text-sm font-medium ${text} truncate`}>{event.title}</div>
                <div className="text-xxs sm:text-xs text-gray-300 truncate">{event.startTime} - {event.endTime}</div>
                {event.location && (
                  <div className="text-xxs sm:text-xs text-gray-400 mt-0.5 sm:mt-1 truncate">{event.location}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Légende */}
      <div className="p-3 sm:p-4 bg-gray-900 border-t border-gray-700">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-athletis-green-500 mr-1.5 sm:mr-2"></span>
            <span className="text-xs sm:text-sm text-gray-300">Cours collectifs</span>
          </div>
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-1.5 sm:mr-2"></span>
            <span className="text-xs sm:text-sm text-gray-300">Entraînement personnel</span>
          </div>
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500 mr-1.5 sm:mr-2"></span>
            <span className="text-xs sm:text-sm text-gray-300">Coaching privé</span>
          </div>
        </div>
        
        {/* Bouton pour afficher tous les jours (Mobile) */}
        <button
          onClick={resetVisibleDays}
          className="mt-3 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-xs font-medium sm:hidden"
        >
          Afficher toute la semaine
        </button>
      </div>
    </div>
  );
}

// Extension pour obtenir le numéro de la semaine
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}; 