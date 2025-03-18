"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    isInscription: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // This would be replaced with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        isInscription: false,
      });
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Contactez <span className="text-athletis-green-500">ATHLETIS</span>
            </h1>
            <p className="text-xl text-gray-300">
              Des questions ? Besoin d'informations supplémentaires ? Contactez-nous ou venez nous rendre visite !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Address Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-athletis border border-gray-800 hover:border-athletis-green-600 transition-colors">
              <div className="flex items-start">
                <div className="bg-athletis-green-900/30 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                  <p className="text-gray-400">241 Rue de Belfort<br />68100 Mulhouse<br />France</p>
                  <a 
                    href="https://maps.google.com/?q=241+Rue+de+Belfort+68100+Mulhouse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-athletis-green-500 hover:text-athletis-green-400 mt-3 text-sm"
                  >
                    <span>Voir sur Google Maps</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-athletis border border-gray-800 hover:border-athletis-green-600 transition-colors">
              <div className="flex items-start">
                <div className="bg-athletis-green-900/30 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact</h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <span className="block text-sm text-gray-500">Téléphone:</span>
                      <a href="tel:+33775717838" className="hover:text-athletis-green-500 transition-colors">
                        07 75 71 78 38
                      </a>
                    </p>
                    <p className="text-gray-400">
                      <span className="block text-sm text-gray-500">Email:</span>
                      <a href="mailto:untersingersherazad@gmail.com" className="hover:text-athletis-green-500 transition-colors break-all">
                        untersingersherazad@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-gray-900 rounded-xl p-6 shadow-athletis border border-gray-800 hover:border-athletis-green-600 transition-colors">
              <div className="flex items-start">
                <div className="bg-athletis-green-900/30 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Horaires d'ouverture</h3>
                  <ul className="space-y-1 text-gray-400">
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((day) => (
                      <li key={day} className="flex justify-between text-sm">
                        <span className="capitalize">{day}</span>
                        <span>06:00 – 23:00</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Contact Form */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                Notre emplacement
              </h2>
              <div className="rounded-xl overflow-hidden shadow-athletis h-[400px] md:h-[500px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.1123422889074!2d7.325772300000001!3d47.747698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47919b7b8a94d57d%3A0xbdd2cbca62ee8b6d!2s241%20Rue%20de%20Belfort%2C%2068200%20Mulhouse%2C%20France!5e0!3m2!1sen!2sus!4v1660000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ATHLETIS PURE MUSCULATION location"
                  className="absolute inset-0"
                ></iframe>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Comment nous trouver</h3>
                <div className="flex items-start mb-4">
                  <div className="bg-athletis-green-900/30 p-2 rounded-md mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Parking gratuit et spacieux disponible sur place pour tous nos membres.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-athletis-green-900/30 p-2 rounded-md mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      Facilement accessible depuis le centre-ville de Mulhouse, situé dans la zone du Trident.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="inscription">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                Envoyez-nous un message
              </h2>

              {isSubmitted ? (
                <div className="bg-athletis-green-900/30 border border-athletis-green-600 rounded-xl p-6 text-center">
                  <div className="bg-athletis-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Message envoyé avec succès !</h3>
                  <p className="text-gray-300 mb-4">
                    Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-athletis-green-500 focus:border-transparent text-white"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-athletis-green-500 focus:border-transparent text-white"
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-athletis-green-500 focus:border-transparent text-white"
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="inscription">Inscription</option>
                      <option value="pass-decouverte">Pass Découverte (8,95€)</option>
                      <option value="tarifs">Renseignements tarifs</option>
                      <option value="question">Question générale</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-athletis-green-500 focus:border-transparent text-white resize-none"
                      placeholder="Votre message"
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isInscription"
                        name="isInscription"
                        type="checkbox"
                        checked={formData.isInscription}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-athletis-green-600 rounded border-gray-700 focus:ring-athletis-green-500 bg-gray-800 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="isInscription" className="ml-3 text-sm text-gray-400">
                      Je suis intéressé(e) par une inscription à ATHLETIS PURE MUSCULATION
                    </label>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/30 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-athletis-green-600 hover:bg-athletis-green-700 text-white rounded-md transition-colors w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-4">
                    Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires. Vos données personnelles ne seront utilisées que pour répondre à votre demande.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pass Découverte Section */}
      <section className="py-16 bg-gray-900" id="pass-decouverte">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-athletis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full mb-5">
                  <span className="text-athletis-green-500 font-medium">Essayez notre salle</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                  Pass Découverte
                </h2>
                <div className="mt-4 mb-6 flex items-center">
                  <span className="text-3xl md:text-4xl font-bold text-white">8,95€</span>
                  <span className="text-gray-400 ml-2">/ séance</span>
                </div>
                <p className="text-gray-300 mb-6">
                  Venez découvrir notre salle et nos équipements haut de gamme avec notre Pass Découverte. Une séance complète pour vous familiariser avec notre environnement et nos machines Hammer Strength.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Accès à toutes les machines</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Conseils personnalisés</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Sans engagement</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-athletis-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Pièce d'identité requise</span>
                  </li>
                </ul>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Pièces à fournir :</strong> pièce d'identité, moyen de paiement, tenue adaptée pour l'entraînement.
                  </p>
                  <Link 
                    href="#inscription" 
                    className="btn-athletis inline-flex items-center"
                    onClick={() => {
                      // Pré-remplir le formulaire pour le Pass Découverte
                      setFormData({
                        ...formData,
                        subject: 'pass-decouverte',
                        message: "Bonjour,\n\nJe souhaite réserver un Pass Découverte à 8,95€ pour essayer votre salle.\n\nMerci de me contacter pour confirmer la réservation.\n\nCordialement,"
                      });
                    }}
                  >
                    <span>Réserver un essai</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-athletis">
                <Image
                  src="/images/gym-interior.jpg" 
                  alt="Pass Découverte ATHLETIS"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-athletis-green-500 p-2 rounded-md mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Valable 1 séance</p>
                        <p className="text-athletis-green-400 text-sm">Accessible 7j/7 • 6h-23h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gray-900 rounded-xl p-8 md:p-10 border border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                Questions fréquentes
              </h2>
              <p className="text-gray-400 mt-2">
                Consultez notre FAQ pour trouver rapidement des réponses à vos questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/faq#horaires" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-colors group">
                <h3 className="text-lg font-medium mb-2 group-hover:text-athletis-green-500 transition-colors">Horaires et accès</h3>
                <p className="text-gray-400 text-sm">Informations sur nos horaires d'ouverture et modalités d'accès</p>
              </Link>
              
              <Link href="/faq#tarifs" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-colors group">
                <h3 className="text-lg font-medium mb-2 group-hover:text-athletis-green-500 transition-colors">Tarifs et abonnements</h3>
                <p className="text-gray-400 text-sm">Détails sur nos formules d'abonnement et tarifs</p>
              </Link>
              
              <Link href="/faq#inscription" className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition-colors group">
                <h3 className="text-lg font-medium mb-2 group-hover:text-athletis-green-500 transition-colors">Processus d'inscription</h3>
                <p className="text-gray-400 text-sm">Comment s'inscrire et quels documents sont nécessaires</p>
              </Link>
            </div>

            <div className="text-center mt-8">
              <Link href="/faq" className="inline-flex items-center text-athletis-green-500 hover:text-athletis-green-400 font-medium">
                <span>Voir toutes les questions fréquentes</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 