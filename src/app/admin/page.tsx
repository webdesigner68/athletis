"use client";

import { useState, useEffect } from 'react';

// Types pour les cours et créneaux
interface TimeSlot {
  id: string;
  day: number; // 0-6 (lundi-dimanche)
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  isRecurring: boolean; // Si le cours est récurrent chaque semaine
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

// Données initiales (même structure que dans planning/page.tsx)
// Plus tard, ces données seront remplacées par des données provenant du stockage persistant
const initialClasses: Class[] = [
  {
    id: '1',
    name: 'Power Lifting',
    description: 'Cours de musculation intensif pour améliorer votre force et votre puissance.',
    trainer: 'Thomas Renault',
    image: '/images/classes/power-lifting.jpg',
    intensity: 3,
    category: 'musculation',
    timeSlots: [
      { id: '1-1', day: 0, startTime: '08:00', endTime: '09:30', maxParticipants: 12, currentParticipants: 8, isRecurring: true },
      { id: '1-2', day: 4, startTime: '18:00', endTime: '19:30', maxParticipants: 12, currentParticipants: 10, isRecurring: true },
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
      { id: '2-1', day: 1, startTime: '10:00', endTime: '11:00', maxParticipants: 15, currentParticipants: 12, isRecurring: true },
      { id: '2-2', day: 5, startTime: '17:00', endTime: '18:00', maxParticipants: 15, currentParticipants: 7, isRecurring: true },
    ],
  },
];

// Clé pour le stockage local
const STORAGE_KEY = 'athletis-classes';

export default function AdminPage() {
  // État pour stocker les cours
  const [classes, setClasses] = useState<Class[]>([]);
  
  // État pour le formulaire d'ajout/modification
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  
  // États pour le formulaire de cours
  const [formClass, setFormClass] = useState<Omit<Class, 'id' | 'timeSlots'>>({
    name: '',
    description: '',
    trainer: '',
    image: '',
    intensity: 1,
    category: 'musculation',
  });
  
  // État pour le formulaire de créneau horaire
  const [timeSlotForm, setTimeSlotForm] = useState<Omit<TimeSlot, 'id'>>({
    day: 0, // Lundi par défaut
    startTime: '',
    endTime: '',
    maxParticipants: 10,
    currentParticipants: 0,
    isRecurring: true // Récurrent par défaut
  });
  
  // État pour les créneaux horaires temporaires
  const [tempTimeSlots, setTempTimeSlots] = useState<TimeSlot[]>([]);
  
  // État pour les erreurs
  const [error, setError] = useState<string | null>(null);
  
  // Chargement des données depuis le stockage local (localStorage)
  useEffect(() => {
    const savedClasses = localStorage.getItem(STORAGE_KEY);
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    } else {
      // Utiliser les données initiales si rien n'est sauvegardé
      setClasses(initialClasses);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialClasses));
    }
  }, []);
  
  // Sauvegarde des données dans le stockage local
  useEffect(() => {
    if (classes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
    }
  }, [classes]);
  
  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormClass({
      name: '',
      description: '',
      trainer: '',
      image: '',
      intensity: 1,
      category: 'musculation',
    });
    setTempTimeSlots([]);
    setTimeSlotForm({
      day: 0,
      startTime: '',
      endTime: '',
      maxParticipants: 10,
      currentParticipants: 0,
      isRecurring: true
    });
    setFormMode('add');
    setEditingClassId(null);
  };
  
  // Charger un cours pour édition
  const loadClassForEdit = (classId: string) => {
    const classToEdit = classes.find(c => c.id === classId);
    if (classToEdit) {
      setFormClass({
        name: classToEdit.name,
        description: classToEdit.description,
        trainer: classToEdit.trainer,
        image: classToEdit.image,
        intensity: classToEdit.intensity,
        category: classToEdit.category,
      });
      setTempTimeSlots([...classToEdit.timeSlots]);
      setFormMode('edit');
      setEditingClassId(classId);
    }
  };
  
  // Ajouter un créneau horaire à la liste temporaire
  const addTimeSlot = () => {
    if (!timeSlotForm.startTime || !timeSlotForm.endTime) {
      setError("Veuillez spécifier l'heure de début et de fin du créneau");
      return;
    }
    
    const newTimeSlot: TimeSlot = {
      id: `ts-${Date.now()}`,
      day: timeSlotForm.day,
      startTime: timeSlotForm.startTime,
      endTime: timeSlotForm.endTime,
      maxParticipants: timeSlotForm.maxParticipants,
      currentParticipants: timeSlotForm.currentParticipants,
      isRecurring: timeSlotForm.isRecurring
    };
    
    setTempTimeSlots([...tempTimeSlots, newTimeSlot]);
    
    // Réinitialiser le formulaire de créneau
    setTimeSlotForm({
      day: timeSlotForm.day, // Garder le même jour pour faciliter l'ajout de plusieurs créneaux
      startTime: '',
      endTime: '',
      maxParticipants: 10,
      currentParticipants: 0,
      isRecurring: timeSlotForm.isRecurring // Garder le même statut de récurrence
    });
  };
  
  // Supprimer un créneau horaire temporaire
  const removeTempTimeSlot = (id: string) => {
    setTempTimeSlots(tempTimeSlots.filter(slot => slot.id !== id));
  };
  
  // Gérer la soumission du formulaire de cours
  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Préparer les données du cours avec une image par défaut si nécessaire
    const classData = {
      ...formClass,
      image: formClass.image || '/images/classes/default-class.jpg' // Utiliser une image par défaut si non spécifiée
    };
    
    if (formMode === 'add') {
      // Ajouter un nouveau cours
      const newClass: Class = {
        id: Date.now().toString(),
        ...classData,
        timeSlots: tempTimeSlots
      };
      setClasses([...classes, newClass]);
    } else {
      // Modifier un cours existant
      setClasses(classes.map(c => 
        c.id === editingClassId 
          ? { ...c, ...classData, timeSlots: tempTimeSlots } 
          : c
      ));
    }
    
    // Réinitialiser le formulaire
    resetForm();
  };
  
  // Supprimer un cours
  const deleteClass = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading">Gestion du Planning</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire d'ajout/modification */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-heading mb-4">
            {formMode === 'add' ? 'Ajouter un nouveau cours' : 'Modifier le cours'}
          </h2>
          
          <form onSubmit={handleClassSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Nom du cours</label>
                <input 
                  type="text" 
                  value={formClass.name} 
                  onChange={(e) => setFormClass({...formClass, name: e.target.value})}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea 
                  value={formClass.description}
                  onChange={(e) => setFormClass({...formClass, description: e.target.value})}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Coach</label>
                <input 
                  type="text" 
                  value={formClass.trainer}
                  onChange={(e) => setFormClass({...formClass, trainer: e.target.value})}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">URL de l'image (optionnel)</label>
                <input 
                  type="text" 
                  value={formClass.image}
                  onChange={(e) => setFormClass({...formClass, image: e.target.value})}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  placeholder="/images/classes/nom-image.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">Si vide, une image par défaut sera utilisée</p>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Intensité</label>
                <select 
                  value={formClass.intensity}
                  onChange={(e) => setFormClass({...formClass, intensity: Number(e.target.value) as 1 | 2 | 3})}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                >
                  <option value={1}>1 - Légère</option>
                  <option value={2}>2 - Moyenne</option>
                  <option value={3}>3 - Intense</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium">Catégorie</label>
                <select 
                  value={formClass.category}
                  onChange={(e) => setFormClass({...formClass, category: e.target.value as 'musculation' | 'cardio' | 'yoga' | 'hiit'})}
                  className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                >
                  <option value="musculation">Musculation</option>
                  <option value="cardio">Cardio</option>
                  <option value="yoga">Yoga</option>
                  <option value="hiit">HIIT</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-heading mb-4">Créneaux horaires</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-1">
                  <label className="block mb-1 text-xs font-medium">Jour</label>
                  <select 
                    value={timeSlotForm.day}
                    onChange={(e) => setTimeSlotForm({...timeSlotForm, day: Number(e.target.value)})}
                    className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  >
                    <option value={0}>Lundi</option>
                    <option value={1}>Mardi</option>
                    <option value={2}>Mercredi</option>
                    <option value={3}>Jeudi</option>
                    <option value={4}>Vendredi</option>
                    <option value={5}>Samedi</option>
                    <option value={6}>Dimanche</option>
                  </select>
                </div>
                
                <div className="md:col-span-1">
                  <label className="block mb-1 text-xs font-medium">Heure début</label>
                  <input 
                    type="time" 
                    value={timeSlotForm.startTime}
                    onChange={(e) => setTimeSlotForm({...timeSlotForm, startTime: e.target.value})}
                    className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block mb-1 text-xs font-medium">Heure fin</label>
                  <input 
                    type="time" 
                    value={timeSlotForm.endTime}
                    onChange={(e) => setTimeSlotForm({...timeSlotForm, endTime: e.target.value})}
                    className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block mb-1 text-xs font-medium">Places max</label>
                  <input 
                    type="number" 
                    value={timeSlotForm.maxParticipants}
                    onChange={(e) => setTimeSlotForm({...timeSlotForm, maxParticipants: Number(e.target.value)})}
                    className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                    min="1"
                  />
                </div>
                
                <div className="md:col-span-1">
                  <label className="block mb-1 text-xs font-medium">Places occupées</label>
                  <input 
                    type="number" 
                    value={timeSlotForm.currentParticipants}
                    onChange={(e) => setTimeSlotForm({...timeSlotForm, currentParticipants: Number(e.target.value)})}
                    className="w-full bg-gray-700 px-3 py-2 rounded-md focus:ring-athletis-green-500 focus:border-athletis-green-500"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={timeSlotForm.isRecurring}
                    onChange={(e) => setTimeSlotForm({...timeSlotForm, isRecurring: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Récurrent</span>
                </label>
              </div>
              
              <button 
                type="button"
                onClick={addTimeSlot}
                disabled={!timeSlotForm.startTime || !timeSlotForm.endTime}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter un créneau
              </button>
              
              {tempTimeSlots.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Créneaux ajoutés :</h4>
                  <ul className="space-y-2">
                    {tempTimeSlots.map((slot) => (
                      <li key={slot.id} className="flex justify-between items-center bg-gray-700 rounded-md px-3 py-2">
                        <span className="text-sm">
                          {slot.day === 0 ? 'Lundi' : slot.day === 1 ? 'Mardi' : slot.day === 2 ? 'Mercredi' : slot.day === 3 ? 'Jeudi' : slot.day === 4 ? 'Vendredi' : slot.day === 5 ? 'Samedi' : 'Dimanche'}
                          {slot.startTime} - {slot.endTime} ({slot.currentParticipants}/{slot.maxParticipants})
                        </span>
                        <button
                          type="button"
                          onClick={() => removeTempTimeSlot(slot.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="submit"
                className="px-5 py-2 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors"
              >
                {formMode === 'add' ? 'Ajouter' : 'Enregistrer les modifications'}
              </button>
              
              {formMode === 'edit' && (
                <button 
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Liste des cours */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-heading mb-4">Liste des cours</h2>
          
          {classes.length === 0 ? (
            <p className="text-gray-400">Aucun cours disponible.</p>
          ) : (
            <div className="space-y-4">
              {classes.map((classItem) => (
                <div key={classItem.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{classItem.name}</h3>
                    <span className="px-2 py-1 bg-gray-700 text-xs rounded-md">{classItem.category}</span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">{classItem.description}</p>
                  <p className="text-xs text-gray-400 mb-3">Coach: {classItem.trainer}</p>
                  
                  <h4 className="text-xs uppercase font-semibold text-gray-400 mb-1">Créneaux:</h4>
                  <ul className="space-y-1 mb-3">
                    {classItem.timeSlots.map((slot) => (
                      <li key={slot.id} className="text-xs text-gray-300">
                        {slot.day === 0 ? 'Lundi' : slot.day === 1 ? 'Mardi' : slot.day === 2 ? 'Mercredi' : slot.day === 3 ? 'Jeudi' : slot.day === 4 ? 'Vendredi' : slot.day === 5 ? 'Samedi' : 'Dimanche'}
                        {slot.startTime} - {slot.endTime} ({slot.currentParticipants}/{slot.maxParticipants})
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => loadClassForEdit(classItem.id)}
                      className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteClass(classItem.id)}
                      className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 