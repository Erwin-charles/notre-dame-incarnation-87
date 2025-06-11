
import React from 'react';
import SaintSacrement from './SaintSacrement';
import Cross3D from './Cross3D';
import Particle from './Particle';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <>
      {/* Section Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background particles */}
        {[...Array(10)].map((_, i) => (
          <Particle key={i} />
        ))}

        {/* Background image with radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-church-blue/80 via-church-light/60 to-white/40 dark:from-church-blue/90 dark:via-church-light/70 dark:to-gray-900/50 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
          {/* Container pour Saint Sacrement et Cross3D côte à côte */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Saint Sacrement component */}
            <SaintSacrement />
            
            {/* Croix 3D bleue */}
            <div className="flex-shrink-0">
              <Cross3D />
            </div>
          </div>

          {/* Titles and Description */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 drop-shadow-lg">
            Bienvenue à Notre Dame de l'Incarnation
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Une communauté de foi, d'amour et d'espérance au cœur de Cocody, Abidjan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => onNavigate('activites')}
            >
              Découvrir nos services
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => onNavigate('contact')}
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Section Services (Example) */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
            Nos Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Service Card */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Célébrations Eucharistiques
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Participez à nos messes et vivez un moment de communion et de prière.
              </p>
            </div>
            {/* Add more service cards here */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Catéchèse
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez nos programmes de catéchèse pour enfants et adultes.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Groupes de Prière
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rejoignez nos groupes de prière pour partager votre foi et votre spiritualité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact (Example) */}
      <section className="py-16 bg-church-light dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Restons en Contact
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Pour toute question ou information, n'hésitez pas à nous contacter.
          </p>
          <Button size="lg" onClick={() => onNavigate('contact')}>
            Contactez-nous
          </Button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
