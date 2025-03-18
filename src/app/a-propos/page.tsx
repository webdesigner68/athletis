import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-dark.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              À propos d'<span className="text-athletis-green-500">ATHLETIS</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez notre histoire, notre philosophie et ce qui fait d'ATHLETIS une salle unique, dédiée aux véritables passionnés de musculation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-athletis-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-athletis-lg">
                <Image
                  src="/images/about-1.jpg"
                  alt="Notre histoire"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-athletis-green-600 rounded-lg p-6 shadow-athletis-lg max-w-[240px]">
                <p className="text-white font-semibold text-xl mb-2">Depuis 2018</p>
                <p className="text-white">À votre service à Mulhouse</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full">
                <span className="text-athletis-green-500 font-medium">Notre histoire</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Une passion devenue réalité
              </h2>
              <p className="text-gray-400 text-lg">
                ATHLETIS PURE MUSCULATION est né d'une passion pour la musculation et d'une vision claire : créer une salle différente de ce qui existait déjà à Mulhouse. Nous voulions un espace dédié exclusivement à la musculation, avec des équipements haut de gamme et une atmosphère propice à l'entraînement sérieux.
              </p>
              
              <p className="text-gray-400 text-lg">
                En 2018, après des mois de préparation, notre vision est devenue réalité avec l'ouverture de notre salle rue de Belfort. Notre objectif était simple : offrir aux passionnés de musculation un lieu qui réponde parfaitement à leurs besoins, sans compromis sur la qualité.
              </p>
              
              <p className="text-gray-400 text-lg">
                Aujourd'hui, ATHLETIS est fier d'être reconnu comme l'une des meilleures salles de musculation de la région, un lieu où les membres se sentent chez eux et peuvent atteindre leurs objectifs dans les meilleures conditions possibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full">
              <span className="text-athletis-green-500 font-medium">Nos valeurs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-6">
              Ce qui nous définit
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Notre philosophie repose sur des valeurs fondamentales qui guident toutes nos décisions et façonnent l'expérience unique d'ATHLETIS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-athletis-green-600 transition-colors group">
              <div className="bg-athletis-green-900/30 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-athletis-green-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-400">
                Nous ne faisons aucun compromis sur la qualité de nos équipements, de nos installations et de nos services. L'excellence est notre standard.
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-athletis-green-600 transition-colors group">
              <div className="bg-athletis-green-900/30 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-athletis-green-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Respect</h3>
              <p className="text-gray-400">
                Le respect mutuel est fondamental chez ATHLETIS. Chaque membre mérite de s'entraîner dans un environnement positif et respectueux.
              </p>
            </div>

            {/* Value Card 3 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-athletis-green-600 transition-colors group">
              <div className="bg-athletis-green-900/30 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-athletis-green-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Passion</h3>
              <p className="text-gray-400">
                La passion pour la musculation est au cœur de notre identité. Nous comprenons la détermination et l'engagement que requiert un entraînement sérieux.
              </p>
            </div>

            {/* Value Card 4 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-athletis-green-600 transition-colors group">
              <div className="bg-athletis-green-900/30 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-athletis-green-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Accessibilité</h3>
              <p className="text-gray-400">
                Nous croyons que l'entraînement devrait s'adapter à votre emploi du temps, pas l'inverse. C'est pourquoi nous offrons des horaires étendus 7j/7.
              </p>
            </div>

            {/* Value Card 5 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-athletis-green-600 transition-colors group">
              <div className="bg-athletis-green-900/30 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-athletis-green-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Propreté</h3>
              <p className="text-gray-400">
                L'hygiène est une priorité absolue. Nous maintenons des standards de propreté exceptionnels pour votre confort et votre santé.
              </p>
            </div>

            {/* Value Card 6 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-athletis-green-600 transition-colors group">
              <div className="bg-athletis-green-900/30 p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-athletis-green-600/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Communauté</h3>
              <p className="text-gray-400">
                ATHLETIS est plus qu'une salle — c'est une communauté de personnes partageant la même passion et se soutenant mutuellement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-athletis-dark relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-athletis-green-800 rounded-full opacity-10 blur-[150px]"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-athletis-green-900/30 px-4 py-2 rounded-full">
              <span className="text-athletis-green-500 font-medium">Pourquoi nous choisir</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-6">
              Ce qui fait notre différence
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              ATHLETIS se démarque par son approche unique de la musculation, conçue pour offrir la meilleure expérience possible à nos membres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <ul className="space-y-8">
                <li className="flex">
                  <div className="mr-6 bg-athletis-green-900/30 p-3 rounded-lg h-max mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Équipements haut de gamme</h3>
                    <p className="text-gray-400">
                      Nos machines Hammer Strength sont reconnues mondialement pour leur qualité et leur efficacité. Elles offrent des sensations incomparables et des résultats optimaux.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-6 bg-athletis-green-900/30 p-3 rounded-lg h-max mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Focus sur la musculation</h3>
                    <p className="text-gray-400">
                      Contrairement aux salles multisport, ATHLETIS est 100% dédié à la musculation. Cela signifie un environnement optimisé pour cette discipline, sans distractions.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-6 bg-athletis-green-900/30 p-3 rounded-lg h-max mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Intimité et confort</h3>
                    <p className="text-gray-400">
                      Nos cabines individuelles pour se changer et se doucher offrent une intimité rare dans les salles de sport traditionnelles.
                    </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="mr-6 bg-athletis-green-900/30 p-3 rounded-lg h-max mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-athletis-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Horaires étendus</h3>
                    <p className="text-gray-400">
                      Avec une ouverture de 6h à 23h tous les jours, ATHLETIS s'adapte à tous les emplois du temps, vous permettant de vous entraîner quand cela vous convient le mieux.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-athletis-lg">
                <Image
                  src="/images/about-2.jpg"
                  alt="Ce qui fait notre différence"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-8 -left-8 bg-black/80 backdrop-blur-sm rounded-lg p-6 shadow-athletis-lg max-w-[240px]">
                <div className="bg-athletis-green-500 p-2 rounded-md inline-block mb-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-medium">
                  100% dédié à la musculation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-athletis-green-900 to-athletis-green-800 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-white">
              Prêt à découvrir ATHLETIS ?
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto mb-8 text-lg">
              Venez visiter notre salle et découvrez par vous-même ce qui fait d'ATHLETIS la référence en matière de musculation à Mulhouse.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white hover:bg-gray-100 text-athletis-green-800 rounded-md transition-colors duration-300 font-medium text-center"
              >
                Nous contacter
              </Link>
              <Link 
                href="/tarifs" 
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-md transition-colors duration-300 font-medium text-center"
              >
                Voir nos tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 