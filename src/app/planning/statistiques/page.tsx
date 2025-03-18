"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types pour les statistiques
interface ActivityData {
  day: string;
  value: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface MonthlyActivity {
  month: string;
  sessions: number;
}

interface ProgressData {
  name: string;
  current: number;
  target: number;
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

// Données de démonstration pour les statistiques (utilisées si aucune donnée n'est trouvée)
const defaultActivityHeatmap: ActivityData[] = [
  { day: 'Lun', value: 3 },
  { day: 'Mar', value: 2 },
  { day: 'Mer', value: 4 },
  { day: 'Jeu', value: 1 },
  { day: 'Ven', value: 3 },
  { day: 'Sam', value: 0 },
  { day: 'Dim', value: 2 },
];

const defaultCategoryDistribution: CategoryData[] = [
  { name: 'Musculation', value: 45 },
  { name: 'Cardio', value: 20 },
  { name: 'HIIT', value: 15 },
  { name: 'Yoga', value: 10 },
  { name: 'Autres', value: 10 },
];

const defaultMonthlyActivityData: MonthlyActivity[] = [
  { month: 'Jan', sessions: 15 },
  { month: 'Fév', sessions: 18 },
  { month: 'Mar', sessions: 22 },
  { month: 'Avr', sessions: 20 },
  { month: 'Mai', sessions: 25 },
  { month: 'Juin', sessions: 17 },
  { month: 'Juil', sessions: 16 },
  { month: 'Août', sessions: 14 },
  { month: 'Sep', sessions: 19 },
  { month: 'Oct', sessions: 23 },
  { month: 'Nov', sessions: 21 },
  { month: 'Déc', sessions: 12 },
];

const defaultGoalsProgress: ProgressData[] = [
  { name: 'Perte de poids', current: 4.5, target: 10 },
  { name: 'Musculation', current: 15, target: 20 },
  { name: 'Cardio', current: 8, target: 12 },
  { name: 'Étirements', current: 6, target: 15 },
];

// Fonction pour générer les données de catégorie à partir des cours
function generateCategoryData(classes: Class[]): CategoryData[] {
  // Compter le nombre de cours par catégorie
  const categoryCounts: Record<string, number> = {};
  let total = 0;
  
  classes.forEach(classItem => {
    if (!categoryCounts[classItem.category]) {
      categoryCounts[classItem.category] = 0;
    }
    // On compte chaque créneau comme une occurrence du cours
    categoryCounts[classItem.category] += classItem.timeSlots.length;
    total += classItem.timeSlots.length;
  });
  
  // Convertir en pourcentages
  const result: CategoryData[] = [];
  Object.entries(categoryCounts).forEach(([category, count]) => {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    result.push({
      name: categoryName,
      value: Math.round((count / total) * 100)
    });
  });
  
  // Si aucune catégorie n'est trouvée, utiliser les données par défaut
  if (result.length === 0) {
    return defaultCategoryDistribution;
  }
  
  return result;
}

// Fonction pour générer la heatmap d'activité à partir des cours
function generateActivityHeatmap(classes: Class[]): ActivityData[] {
  // Initialiser un tableau pour chaque jour de la semaine
  const activityByDay: ActivityData[] = [
    { day: 'Lundi', value: 0 },
    { day: 'Mardi', value: 0 },
    { day: 'Mercredi', value: 0 },
    { day: 'Jeudi', value: 0 },
    { day: 'Vendredi', value: 0 },
    { day: 'Samedi', value: 0 },
    { day: 'Dimanche', value: 0 },
  ];
  
  // Compter les cours par jour
  classes.forEach(classItem => {
    classItem.timeSlots.forEach(slot => {
      // Utiliser le jour du créneau
      activityByDay[slot.day].value += 1;
    });
  });
  
  return activityByDay;
}

// Composant pour le graphique de distribution des catégories
function CategoryDistributionChart({ data }: { data: CategoryData[] }) {
  // Calculer le total
  const total = data.reduce((sum, cat) => sum + cat.value, 0);
  
  // Couleurs pour chaque catégorie
  const colors = {
    'musculation': '#16a34a', // green-600
    'cardio': '#ea580c',      // orange-600
    'yoga': '#059669',        // emerald-600
    'hiit': '#dc2626'         // red-600
  };
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      {/* Anneau de fond */}
      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="20" />
      
      {/* Segments du graphique */}
      {(() => {
        let currentAngle = 0;
        const segments = [];
        
        for (const category of data) {
          const angle = (category.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          // Convertir les angles en radians et calculer les points de début et de fin
          const startRad = (startAngle - 90) * Math.PI / 180;
          const endRad = (endAngle - 90) * Math.PI / 180;
          
          const startX = 50 + 40 * Math.cos(startRad);
          const startY = 50 + 40 * Math.sin(startRad);
          const endX = 50 + 40 * Math.cos(endRad);
          const endY = 50 + 40 * Math.sin(endRad);
          
          // Flag pour déterminer si on dessine sur le grand arc
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          segments.push(
            <path
              key={category.name}
              d={`M ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`}
              fill="none"
              stroke={colors[category.name as keyof typeof colors] || '#6b7280'}
              strokeWidth="20"
            />
          );
          
          currentAngle = endAngle;
        }
        
        return segments;
      })()}
      
      {/* Cercle central */}
      <circle cx="50" cy="50" r="30" fill="#1f2937" />
      
      {/* Texte du centre */}
      <text
        x="50"
        y="47"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
      >
        {data.length} 
      </text>
      <text
        x="50"
        y="57"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#d1d5db"
        fontSize="6"
      >
        catégories
      </text>
    </svg>
  );
}

export default function StatisticsPage() {
  const [activityHeatmap, setActivityHeatmap] = useState<ActivityData[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<CategoryData[]>([]);
  const [monthlyActivityData, setMonthlyActivityData] = useState<MonthlyActivity[]>([]);
  const [goalsProgress, setGoalsProgress] = useState<ProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Chargement des données du planning pour générer les statistiques
  useEffect(() => {
    const loadStatistics = () => {
      try {
        const savedClasses = localStorage.getItem(STORAGE_KEY);
        
        if (savedClasses && savedClasses !== 'undefined') {
          const classes: Class[] = JSON.parse(savedClasses);
          
          // Générer les données de catégories
          setCategoryDistribution(generateCategoryData(classes));
          
          // Générer les données d'activité quotidienne
          setActivityHeatmap(generateActivityHeatmap(classes));
          
          // Pour les données mensuelles et les objectifs, on garde les données par défaut
          // car elles sont plus difficiles à générer à partir des cours seuls
          setMonthlyActivityData(defaultMonthlyActivityData);
          setGoalsProgress(defaultGoalsProgress);
        } else {
          // Utiliser les données par défaut si aucune donnée n'est trouvée
          setActivityHeatmap(defaultActivityHeatmap);
          setCategoryDistribution(defaultCategoryDistribution);
          setMonthlyActivityData(defaultMonthlyActivityData);
          setGoalsProgress(defaultGoalsProgress);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        // Utiliser les données par défaut en cas d'erreur
        setActivityHeatmap(defaultActivityHeatmap);
        setCategoryDistribution(defaultCategoryDistribution);
        setMonthlyActivityData(defaultMonthlyActivityData);
        setGoalsProgress(defaultGoalsProgress);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStatistics();
  }, []);
  
  // Calculer le total des séances mensuelles
  const totalMonthlySessions = monthlyActivityData.reduce(
    (total, month) => total + month.sessions, 0
  );
  
  // Calculer la moyenne mensuelle
  const averageMonthlySessions = Math.round(totalMonthlySessions / monthlyActivityData.length);
  
  // Trouver le mois le plus actif
  const mostActiveMouth = monthlyActivityData.reduce(
    (max, month) => max.sessions > month.sessions ? max : month, 
    monthlyActivityData[0]
  );

  // Calculer le score d'assiduité (sur 100)
  const consistencyScore = Math.round(
    (activityHeatmap.filter(day => day.value > 0).length / activityHeatmap.length) * 100
  );

  // Obtenir une couleur pour la heatmap en fonction de la valeur
  const getHeatmapColor = (value: number) => {
    if (value === 0) return 'bg-gray-600';
    if (value === 1) return 'bg-athletis-green-900';
    if (value === 2) return 'bg-athletis-green-700';
    if (value === 3) return 'bg-athletis-green-500';
    return 'bg-athletis-green-300';
  };
  
  // Calculer le pourcentage de progression
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-athletis-green-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Chargement des statistiques...</p>
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
              MES STATISTIQUES
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Suivez vos performances et votre assiduité d'entraînement
            </motion.p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/planning/calendrier" 
                className="px-4 sm:px-5 py-2 sm:py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-lg transition-colors flex items-center justify-center font-heading uppercase text-xs sm:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Mon calendrier
              </Link>
            </motion.div>
            
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

        {/* Filtres de période */}
        <div className="bg-gray-800 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 border border-gray-700">
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm w-full sm:w-auto" role="group">
              <button
                type="button"
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium border border-gray-600 rounded-l-lg flex-1 sm:flex-none ${
                  selectedPeriod === 'week'
                    ? 'bg-athletis-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Semaine
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium border-t border-b border-gray-600 flex-1 sm:flex-none ${
                  selectedPeriod === 'month'
                    ? 'bg-athletis-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Mois
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('year')}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium border border-gray-600 rounded-r-lg flex-1 sm:flex-none ${
                  selectedPeriod === 'year'
                    ? 'bg-athletis-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Année
              </button>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques clés */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-3 sm:p-6 border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-athletis-green-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm text-gray-400 font-medium mb-1 sm:mb-2">Séances ce mois</h3>
              <p className="text-2xl sm:text-4xl font-heading text-white mb-2 sm:mb-4">
                {monthlyActivityData[new Date().getMonth()].sessions}
              </p>
              <div className="flex items-center text-athletis-green-400 text-xs sm:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>+12% / mois dernier</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-3 sm:p-6 border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm text-gray-400 font-medium mb-1 sm:mb-2">Durée totale (h)</h3>
              <p className="text-2xl sm:text-4xl font-heading text-white mb-2 sm:mb-4">
                {Math.round(monthlyActivityData[new Date().getMonth()].sessions * 1.1)}
              </p>
              <div className="flex items-center text-blue-400 text-xs sm:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Moy: 65 min/séance</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-3 sm:p-6 border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm text-gray-400 font-medium mb-1 sm:mb-2">Score d'assiduité</h3>
              <p className="text-2xl sm:text-4xl font-heading text-white mb-2 sm:mb-4">
                {consistencyScore}%
              </p>
              <div className="flex items-center text-purple-400 text-xs sm:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Excellente constance</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-3 sm:p-6 border border-gray-700 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-orange-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm text-gray-400 font-medium mb-1 sm:mb-2">Calories brûlées</h3>
              <p className="text-2xl sm:text-4xl font-heading text-white mb-2 sm:mb-4">
                12,480
              </p>
              <div className="flex items-center text-orange-400 text-xs sm:text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>~3,120 / semaine</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Graphiques et statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Graphique d'activité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden lg:col-span-2"
          >
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h3 className="text-lg sm:text-xl font-heading text-white">Activité {selectedPeriod === 'week' ? 'hebdomadaire' : selectedPeriod === 'month' ? 'mensuelle' : 'annuelle'}</h3>
            </div>
            <div className="p-3 sm:p-6">
              {selectedPeriod === 'year' && (
                <div className="h-48 sm:h-64 flex items-end overflow-x-auto sm:overflow-visible">
                  {monthlyActivityData.map((month, index) => (
                    <div key={month.month} className="flex-1 flex flex-col items-center min-w-[20px]">
                      <div 
                        className="w-full max-w-[20px] sm:max-w-[30px] bg-athletis-green-600 rounded-t-sm"
                        style={{ 
                          height: `${(month.sessions / Math.max(...monthlyActivityData.map(m => m.sessions))) * 160}px`,
                          opacity: month.month === mostActiveMouth.month ? 1 : 0.7
                        }}
                      ></div>
                      <span className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2">{month.month}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {selectedPeriod === 'month' && (
                <div className="h-48 sm:h-64 flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Arc pour chaque catégorie */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="20" />
                      
                      {categoryDistribution.reduce<{ angle: number; paths: JSX.Element[] }>((acc, category, i) => {
                        const total = categoryDistribution.reduce((sum, cat) => sum + cat.value, 0);
                        const startAngle = acc.angle;
                        const angle = (category.value / total) * 360;
                        const endAngle = startAngle + angle;
                        
                        // Convertir les angles en coordonnées
                        const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                        const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                        const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                        
                        // Déterminer si l'arc est grand (> 180 degrés)
                        const largeArcFlag = angle > 180 ? 1 : 0;
                        
                        const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];
                        
                        return {
                          angle: endAngle,
                          paths: [
                            ...acc.paths,
                            <path 
                              key={i}
                              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                              fill={colors[i % colors.length]}
                              opacity="0.8"
                            />
                          ]
                        };
                      }, { angle: 0, paths: [] }).paths}
                      
                      {/* Cercle central */}
                      <circle cx="50" cy="50" r="30" fill="#1f2937" />
                      <text x="50" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        Total
                      </text>
                      <text x="50" y="58" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        {totalMonthlySessions}
                      </text>
                    </svg>
                  </div>
                </div>
              )}
              
              {selectedPeriod === 'week' && (
                <div className="space-y-3 sm:space-y-4">
                  {activityHeatmap.map((day) => (
                    <div key={day.day} className="flex items-center">
                      <span className="w-8 sm:w-12 text-gray-400 text-xs sm:text-sm">{day.day}</span>
                      <div className="flex-1 ml-2 sm:ml-4">
                        <div className="h-5 sm:h-6 rounded-md flex">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 ${i < day.value ? getHeatmapColor(day.value) : 'bg-gray-700'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <span className="ml-2 sm:ml-4 text-gray-300 text-xs sm:text-sm font-medium">
                        {day.value === 0 ? 'Repos' : `${day.value} séance${day.value > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Répartition des types d'entraînement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h3 className="text-lg sm:text-xl font-heading text-white">Types d'entraînement</h3>
            </div>
            <div className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {categoryDistribution.map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs sm:text-sm text-gray-300">{category.name}</span>
                      <span className="text-xs sm:text-sm text-gray-400">{category.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 sm:h-2.5">
                      <div 
                        className="bg-athletis-green-600 h-2 sm:h-2.5 rounded-full" 
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tableau de suivi des objectifs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6 sm:mb-8"
        >
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <h3 className="text-lg sm:text-xl font-heading text-white">Suivi des objectifs</h3>
          </div>
          
          {/* Version desktop du tableau */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs uppercase text-gray-400 bg-gray-900">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left">Objectif</th>
                  <th className="px-4 sm:px-6 py-3 text-center">Actuel</th>
                  <th className="px-4 sm:px-6 py-3 text-center">Cible</th>
                  <th className="px-4 sm:px-6 py-3 text-center">Progression</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {goalsProgress.map((item) => (
                  <tr key={item.name} className="hover:bg-gray-750">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-white font-medium">{item.name}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-300">{item.current}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-300">{item.target}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-[150px] bg-gray-700 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              calculateProgress(item.current, item.target) >= 100
                                ? 'bg-green-500'
                                : calculateProgress(item.current, item.target) >= 75
                                ? 'bg-athletis-green-600'
                                : calculateProgress(item.current, item.target) >= 50
                                ? 'bg-yellow-500'
                                : 'bg-orange-500'
                            }`}
                            style={{ width: `${calculateProgress(item.current, item.target)}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {calculateProgress(item.current, item.target)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Version mobile en cards */}
          <div className="sm:hidden p-3 space-y-3">
            {goalsProgress.map((item) => (
              <div key={item.name} className="bg-gray-750 rounded-lg p-3 border border-gray-700">
                <h4 className="text-sm font-medium text-white mb-2">{item.name}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
                  <div>
                    <span className="block text-gray-500">Actuel</span>
                    {item.current}
                  </div>
                  <div>
                    <span className="block text-gray-500">Cible</span>
                    {item.target}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      className={`h-2 rounded-full ${
                        calculateProgress(item.current, item.target) >= 100
                          ? 'bg-green-500'
                          : calculateProgress(item.current, item.target) >= 75
                          ? 'bg-athletis-green-600'
                          : calculateProgress(item.current, item.target) >= 50
                          ? 'bg-yellow-500'
                          : 'bg-orange-500'
                      }`}
                      style={{ width: `${calculateProgress(item.current, item.target)}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-xs whitespace-nowrap">
                    {calculateProgress(item.current, item.target)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conseils personnalisés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <h3 className="text-lg sm:text-xl font-heading text-white">Conseils personnalisés</h3>
          </div>
          <div className="p-3 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="bg-gray-750 p-3 sm:p-4 rounded-lg border border-gray-700">
                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium mb-1 sm:mb-2">Optimisez votre récupération</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Vous avez tendance à enchaîner plusieurs jours d'entraînement intensif. Pensez à intégrer un jour de repos complet.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-3 sm:p-4 rounded-lg border border-gray-700">
                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium mb-1 sm:mb-2">Équilibrez votre entraînement</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Votre focus sur la musculation est excellent, mais essayez d'intégrer plus de séances de cardio pour votre santé cardiovasculaire.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-3 sm:p-4 rounded-lg border border-gray-700">
                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium mb-1 sm:mb-2">Augmentez la durée des séances</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      La constance de vos entraînements est excellente ! Pour progresser davantage, essayez d'allonger vos séances de 15 minutes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-3 sm:p-4 rounded-lg border border-gray-700">
                <div className="flex items-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-athletis-green-900 flex items-center justify-center mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-athletis-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-medium mb-1 sm:mb-2">Essayez un nouveau cours</h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Basé sur votre profil, nous pensons que le cours de HIIT Challenge pourrait être parfait pour vous. Réservez votre première séance !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Affichage du graphique en anneau pour la distribution des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Heatmap de l'activité hebdomadaire */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-4 border border-gray-700"
          >
            <h3 className="text-base sm:text-lg font-heading text-white mb-4">Activité hebdomadaire</h3>
            <div className="grid grid-cols-7 gap-1">
              {activityHeatmap.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center">
                  <div 
                    className="w-full aspect-square rounded-md mb-1.5 flex items-center justify-center text-xs"
                    style={{ backgroundColor: getHeatmapColor(day.value) }}
                  >
                    {day.value > 0 && day.value}
                  </div>
                  <span className="text-xs text-gray-400">{day.day.substring(0, 1)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Nombre de cours par jour de la semaine
            </div>
          </motion.div>

          {/* Distribution par catégorie de cours */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-4 border border-gray-700"
          >
            <h3 className="text-base sm:text-lg font-heading text-white mb-4">Distribution par catégorie</h3>
            <div className="w-full h-60 flex justify-center items-center">
              <CategoryDistributionChart data={categoryDistribution} />
            </div>
            
            {/* Légende */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryDistribution.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ 
                      backgroundColor: 
                        category.name === 'musculation' ? '#16a34a' : 
                        category.name === 'cardio' ? '#ea580c' : 
                        category.name === 'yoga' ? '#059669' : 
                        category.name === 'hiit' ? '#dc2626' : '#6b7280'
                    }}
                  ></div>
                  <span className="text-xs text-gray-300">{category.name} ({category.value})</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 