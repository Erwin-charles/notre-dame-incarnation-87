import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Church, Users, Calendar, Book, Heart, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Cross3D from './Cross3D';
import SaintSacrement from './SaintSacrement';
import PageParticles from './PageParticles';
import ImageCarousel from './ImageCarousel';
import BiblicalVerse from './BiblicalVerse';
import VisitorGuide from './VisitorGuide';
import carouselChurch from '@/assets/carousel-church.jpg';
import carouselCommunity from '@/assets/carousel-community.jpg';
import carouselLiturgy from '@/assets/carousel-liturgy.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const goTo = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  const quickActions = [
    {
      title: "Inscriptions Catéchèse",
      description: "Inscrivez-vous aux parcours de catéchèse",
      icon: Book,
      onClick: () => goTo('catechese'),
      color: "bg-primary/5 hover:bg-primary/10 border-primary/20"
    },
    {
      title: "Horaires des Messes",
      description: "Consultez les horaires de célébration",
      icon: Clock,
      onClick: () => goTo('activites'),
      color: "bg-accent/30 hover:bg-accent/50 border-accent/40"
    },
    {
      title: "Groupes Paroissiaux",
      description: "Rejoignez nos communautés",
      icon: Users,
      onClick: () => goTo('groupes'),
      color: "bg-secondary hover:bg-secondary/80 border-secondary"
    },
    {
      title: "Événements",
      description: "Découvrez nos prochains événements",
      icon: Calendar,
      onClick: () => goTo('evenements'),
      color: "bg-muted hover:bg-muted/80 border-border"
    }
  ];

  const parishInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Riviera Palmeraie, Cocody, Abidjan"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+225 27 22 44 55 66"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@ndincarnation-cocody.ci"
    },
    {
      icon: Clock,
      title: "Horaires du Secrétariat",
      content: "Lundi - Vendredi: 8h - 17h"
    }
  ];

  const carouselImages = [
    carouselChurch,
    carouselCommunity,
    carouselLiturgy,
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      <PageParticles count={15} />
      <VisitorGuide />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/10 dark:from-background dark:to-primary/5 py-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-8 space-x-8">
            <SaintSacrement />
            <Cross3D />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Bienvenue
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Paroisse Notre Dame de l'Incarnation
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Une communauté de foi vivante au cœur de Cocody, Riviera Palmeraie, où chacun est accueilli avec amour et bienveillance.
          </p>
          <Button 
            onClick={() => goTo('contact')} 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
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

      {/* Verset du jour */}
      <section className="container mx-auto px-4 py-8">
        <BiblicalVerse />
      </section>

      {/* Services et Missions */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4 flex items-center justify-center">
                <Church className="w-8 h-8 mr-3 text-primary" />
                Nos Services et Missions
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg mx-auto">
              <p className="text-muted-foreground leading-relaxed mb-6">
                La Paroisse Notre Dame de l'Incarnation de Cocody offre une gamme complète de services 
                spirituels et sociaux pour accompagner nos fidèles dans leur cheminement de foi.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nos catéchistes expérimentés dispensent une formation religieuse de qualité à travers 
                nos programmes de catéchèse adaptés à tous les âges. Notre librairie paroissiale propose 
                des ouvrages spirituels et notre service Caritas s'engage dans l'aide aux plus démunis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nous organisons également des événements communautaires, des retraites spirituelles 
                et des activités caritatives pour renforcer les liens fraternels au sein de notre communauté.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Actions Rapides */}
      <section className="py-16 bg-muted/50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Actions Rapides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className={`cursor-pointer transition-all hover:scale-105 ${action.color}`}>
                <CardHeader className="text-center pb-2">
                  <action.icon className="w-12 h-12 mx-auto text-primary mb-4" />
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
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Informations Pratiques
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parishInfo.map((info, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <info.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="text-muted-foreground">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires des Messes */}
      <section className="py-16 bg-primary text-primary-foreground relative z-10">
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
