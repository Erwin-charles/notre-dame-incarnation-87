
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Church, Users, Calendar, Book, Heart, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Cross3D from './Cross3D';
import SaintSacrement from './SaintSacrement';
import PageParticles from './PageParticles';
import ImageCarousel from './ImageCarousel';
import libraryHero from '@/assets/library-hero.jpg';
import caritasHero from '@/assets/caritas-hero.jpg';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const quickActions = [
    {
      title: "Inscriptions Catéchèse",
      description: "Inscrivez-vous aux parcours de catéchèse",
      icon: Book,
      onClick: () => onNavigate('catechese'),
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      title: "Horaires des Messes",
      description: "Consultez les horaires de célébration",
      icon: Clock,
      onClick: () => onNavigate('activites'),
      color: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      title: "Groupes Paroissiaux",
      description: "Rejoignez nos communautés",
      icon: Users,
      onClick: () => onNavigate('groupes'),
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    },
    {
      title: "Événements",
      description: "Découvrez nos prochains événements",
      icon: Calendar,
      onClick: () => onNavigate('evenements'),
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200"
    }
  ];

  const parishInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Rue des Jardins, Cocody Riviera Golf, Abidjan"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+225 22 44 XX XX"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@paroisse-cocody.ci"
    },
    {
      icon: Clock,
      title: "Horaires du Secrétariat",
      content: "Lundi - Vendredi: 8h - 17h"
    }
  ];

  const carouselImages = [
    libraryHero,
    caritasHero,
    libraryHero,
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      <PageParticles count={15} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8 space-x-8">
            <SaintSacrement />
            <Cross3D />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-blue-400 mb-6">
            Bienvenue
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-church-blue mb-4">
            Paroisse Notre Dame de l'Incarnation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Une communauté de foi vivante au cœur de Cocody, où chacun est accueilli avec amour et bienveillance.
          </p>
          <Button 
            onClick={() => onNavigate('contact')} 
            size="lg"
            className="bg-church-blue hover:bg-church-blue/90 text-white px-8 py-3"
          >
            <Heart className="w-5 h-5 mr-2" />
            Rejoignez-nous
          </Button>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="container mx-auto px-4 py-8">
        <ImageCarousel images={carouselImages} />
      </section>

      {/* Services et Missions de la Paroisse */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4 flex items-center justify-center">
                <Church className="w-8 h-8 mr-3 text-church-blue" />
                Nos Services et Missions
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg mx-auto">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                La Paroisse Notre Dame de l'Incarnation de Cocody offre une gamme complète de services 
                spirituels et sociaux pour accompagner nos fidèles dans leur cheminement de foi.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Nos catéchistes expérimentés dispensent une formation religieuse de qualité à travers 
                nos programmes de catéchèse adaptés à tous les âges. Notre librairie paroissiale propose 
                des ouvrages spirituels et notre service Caritas s'engage dans l'aide aux plus démunis.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nous organisons également des événements communautaires, des retraites spirituelles 
                et des activités caritatives pour renforcer les liens fraternels au sein de notre communauté.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Actions Rapides */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Actions Rapides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className={`cursor-pointer transition-all hover:scale-105 ${action.color}`}>
                <CardHeader className="text-center pb-2">
                  <action.icon className="w-12 h-12 mx-auto text-church-blue mb-4" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{action.description}</CardDescription>
                  <Button 
                    onClick={action.onClick}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Accéder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Informations Pratiques */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Informations Pratiques
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parishInfo.map((info, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <info.icon className="w-8 h-8 mx-auto text-church-blue mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires des Messes */}
      <section className="py-16 bg-church-blue text-white relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Horaires des Célébrations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">En Semaine</h3>
              <p className="mb-2">Lundi - Vendredi</p>
              <p className="text-lg">6h30 & 19h</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Samedi</h3>
              <p className="mb-2">Messe du soir</p>
              <p className="text-lg">6h30 & 19h</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Dimanche</h3>
              <p className="mb-2">Messes dominicales</p>
              <p className="text-lg">6h30, 8h, 9h30, 11h & 19h</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
