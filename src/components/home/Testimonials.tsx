"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Thomas L.',
    role: 'Client depuis 2 ans',
    image: '/images/testimonial-1.jpg',
    content: 'Athletis a complètement changé ma vision de la musculation. L\'ambiance est incroyable, les machines sont de toute première qualité, et l\'environnement est parfait pour se concentrer sur ses objectifs. Je recommande sans hésitation !',
    rating: 5,
  },
  {
    name: 'Sophie M.',
    role: 'Cliente depuis 8 mois',
    image: '/images/testimonial-2.jpg',
    content: 'En tant que femme, je cherchais une salle où je pourrais m\'entraîner sereinement. Chez Athletis, j\'ai trouvé un environnement respectueux, des cabines individuelles et un personnel attentif. C\'est exactement ce que je recherchais !',
    rating: 5,
  },
  {
    name: 'Lucas D.',
    role: 'Client depuis 1 an',
    image: '/images/testimonial-3.jpg',
    content: 'Les horaires étendus sont parfaits pour mon emploi du temps chargé. Je peux m\'entraîner tôt le matin ou tard le soir. Les équipements Hammer Strength font vraiment la différence, on sent immédiatement leur qualité.',
    rating: 5,
  },
  {
    name: 'Emilie R.',
    role: 'Cliente depuis 6 mois',
    image: '/images/testimonial-4.jpg',
    content: 'La propreté des lieux est exemplaire, et l\'ambiance est parfaite pour se concentrer sur son entraînement. Le rapport qualité-prix est imbattable pour des équipements de cette qualité.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay when hovering
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <section className="py-24 bg-gray-900" id="temoignages">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full mb-5">
            <span className="text-athletis-green-500 font-medium">Ils nous font confiance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ce que nos membres disent
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Découvrez les témoignages de nos membres qui ont transformé leur pratique de musculation grâce à ATHLETIS.
          </p>
        </div>

        <div 
          className="max-w-5xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Large Screen Testimonial Carousel */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-athletis-lg">
                <div className="grid grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex flex-col justify-center p-10 bg-gradient-to-l from-gray-900 to-black/80">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {/* Quote Icon */}
                      <div className="text-athletis-green-500">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.028 6C6.684 11.184 2.286 18.096 2.286 26.088C2.286 33.648 7.398 38.484 13.596 38.484C19.146 38.484 23.112 34.512 23.112 29.244C23.112 24.192 19.578 20.652 14.454 20.652C13.374 20.652 12.15 20.94 11.646 21.156C12.582 16.536 16.692 12.132 21.744 9.468L14.028 6ZM38.43 6C31.158 11.184 26.76 18.096 26.76 26.088C26.76 33.648 31.872 38.484 38.07 38.484C43.62 38.484 47.586 34.512 47.586 29.244C47.586 24.192 44.052 20.652 38.928 20.652C37.848 20.652 36.624 20.94 36.12 21.156C37.056 16.536 41.166 12.132 46.218 9.468L38.43 6Z" fill="currentColor"/>
                        </svg>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex">
                        {[...Array(testimonials[current].rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      
                      {/* Testimonial Content */}
                      <p className="text-gray-300 text-lg italic">{testimonials[current].content}</p>
                      
                      {/* Author Info */}
                      <div>
                        <h3 className="text-white font-semibold text-xl">{testimonials[current].name}</h3>
                        <p className="text-athletis-green-500">{testimonials[current].role}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      current === index ? 'bg-athletis-green-500' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-athletis-green-700 text-white rounded-full p-2 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrent((current + 1) % testimonials.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-athletis-green-700 text-white rounded-full p-2 transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Testimonial Card */}
          <div className="md:hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-athletis"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-athletis-green-500 mb-4">
                  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.028 6C6.684 11.184 2.286 18.096 2.286 26.088C2.286 33.648 7.398 38.484 13.596 38.484C19.146 38.484 23.112 34.512 23.112 29.244C23.112 24.192 19.578 20.652 14.454 20.652C13.374 20.652 12.15 20.94 11.646 21.156C12.582 16.536 16.692 12.132 21.744 9.468L14.028 6ZM38.43 6C31.158 11.184 26.76 18.096 26.76 26.088C26.76 33.648 31.872 38.484 38.07 38.484C43.62 38.484 47.586 34.512 47.586 29.244C47.586 24.192 44.052 20.652 38.928 20.652C37.848 20.652 36.624 20.94 36.12 21.156C37.056 16.536 41.166 12.132 46.218 9.468L38.43 6Z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-6">{testimonials[current].content}</p>

                <div className="mt-4 flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3">
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold">{testimonials[current].name}</h3>
                  <p className="text-athletis-green-500 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
              
              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      current === index ? 'bg-athletis-green-500' : 'bg-gray-700'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 