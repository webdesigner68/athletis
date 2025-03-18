"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="relative h-screen flex items-center text-white overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-red-600">ATHLETIS</span> PURE MUSCULATION
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Votre salle de musculation premium à Mulhouse, équipée des dernières machines Hammer Strength.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/#tarifs" 
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-md text-lg font-medium transition duration-300 text-center"
            >
              Voir les tarifs
            </Link>
            <Link 
              href="/#about" 
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white py-3 px-8 rounded-md text-lg font-medium transition duration-300 text-center"
            >
              Découvrir
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-6">
            <div className="flex items-center">
              <div className="bg-red-600 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Ouvert 7j/7</span>
            </div>
            <div className="flex items-center">
              <div className="bg-red-600 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span>Coachs professionnels</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a href="#about" className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
} 