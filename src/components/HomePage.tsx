
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Cross3D from './Cross3D';
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
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'groupes',
      title: 'Groupes & Mouvements',
      description: 'Rejoignez nos communautés paroissiales',
      icon: Users,
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'activites',
      title: 'Activités',
      description: 'Calendrier et événements de la paroisse',
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'dashboard',
      title: 'Mon Espace',
      description: 'Accédez à votre tableau de bord personnel',
      icon: User,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <Cross3D />
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Notre Dame de l'
              <span className="text-primary">Incarnation</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Bienvenue dans notre communauté paroissiale. 
              Découvrez la foi, partagez l'amour et grandissez ensemble dans l'esprit du Christ.
            </p>
            
            <Button 
              size="lg" 
              className="animate-glow"
              onClick={() => onNavigate('catechese')}
            >
              <Church className="w-5 h-5 mr-2" />
              Découvrir nos services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nos Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onNavigate(service.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Horaires des Célébrations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Messes Dominicales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span className="font-semibold">18h30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="font-semibold">9h00 - 11h00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Messes en Semaine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mardi - Vendredi</span>
                      <span className="font-semibold">18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mercredi</span>
                      <span className="font-semibold">9h00</span>
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
