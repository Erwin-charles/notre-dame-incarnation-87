
import React from 'react';
import SaintSacrement from './SaintSacrement';
import Cross3D from './Cross3D';
import PageParticles from './PageParticles';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Heart, Book, MapPin, Clock } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <>
      <PageParticles count={12} />
      
      {/* Section Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-blue-400 mb-6 drop-shadow-lg">
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

      {/* Section Horaires */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Horaires des Célébrations
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Rejoignez-nous pour la prière et la communion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                Messes Dominicales
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Samedi soir</span>
                  <span className="font-medium">18h30</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche matin</span>
                  <span className="font-medium">9h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche midi</span>
                  <span className="font-medium">11h00</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                Messes en Semaine
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Mardi - Vendredi</span>
                  <span className="font-medium">18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Mercredi matin</span>
                  <span className="font-medium">9h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Adoration</span>
                  <span className="font-medium">Jeudi 19h00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
            Nos Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <Heart className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Célébrations Eucharistiques
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Participez à nos messes et vivez un moment de communion et de prière.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <Book className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Catéchèse
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez nos programmes de catéchèse pour enfants et adultes.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <Users className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Groupes de Prière
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rejoignez nos groupes de prière pour partager votre foi et votre spiritualité.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <Calendar className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Événements Paroissiaux
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Participez à nos événements communautaires et festivités religieuses.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <Heart className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Action Caritative
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Engagez-vous dans nos actions de solidarité et d'aide aux plus démunis.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Visites et Accompagnement
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Demandez une visite pastorale ou un accompagnement spirituel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
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
