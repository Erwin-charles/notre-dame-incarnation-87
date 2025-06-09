
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Cross3D from './Cross3D';
import SaintSacrement from './SaintSacrement';
import { 
  Church,
  Users,
  Calendar,
  Book,
  User
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  const services = [
    {
      id: 'catechese',
      title: 'Catéchèse',
      description: 'Inscription et suivi de la formation religieuse',
      icon: Book,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      id: 'groupes',
      title: 'Groupes & Mouvements',
      description: 'Rejoignez nos communautés paroissiales',
      icon: Users,
      color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      id: 'activites',
      title: 'Activités',
      description: 'Calendrier et événements de la paroisse',
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      id: 'dashboard',
      title: 'Mon Espace',
      description: 'Accédez à votre tableau de bord personnel',
      icon: User,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <Cross3D />
              <SaintSacrement />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Notre Dame de l'
              <span className="text-primary">Incarnation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bienvenue dans notre communauté paroissiale. 
              Découvrez la foi, partagez l'amour et grandissez ensemble dans l'esprit du Christ.
            </p>
            
            <Button 
              size="lg" 
              className="animate-glow glass-button"
              onClick={() => onNavigate('catechese')}
            >
              <Church className="w-5 h-5 mr-2" />
              Découvrir nos services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background/50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Nos Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="group glass-card hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-up border-white/20 dark:border-gray-700/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onNavigate(service.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horaires Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Horaires des Célébrations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card border-white/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-primary">Messes Dominicales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samedi</span>
                      <span className="font-semibold text-foreground">18h30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche</span>
                      <span className="font-semibold text-foreground">9h00 - 11h00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-white/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-primary">Messes en Semaine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mardi - Vendredi</span>
                      <span className="font-semibold text-foreground">18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mercredi</span>
                      <span className="font-semibold text-foreground">9h00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
