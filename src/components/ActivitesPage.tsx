
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Church,
  Users,
  Book
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthPage from './AuthPage';

const ActivitesPage = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier l'état d'authentification
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  const activites = [
    {
      titre: "Messe Dominicale",
      description: "Célébration eucharistique hebdomadaire",
      date: "Dimanche 11h00",
      recurrent: true,
      type: "Liturgie",
      lieu: "Église principale"
    },
    {
      titre: "Adoration du Saint-Sacrement",
      description: "Temps de prière silencieuse",
      date: "Vendredi 18h30",
      recurrent: true,
      type: "Prière",
      lieu: "Chapelle"
    },
    {
      titre: "Retraite Paroissiale",
      description: "Weekend de ressourcement spirituel",
      date: "15-16 Juin 2024",
      recurrent: false,
      type: "Formation",
      lieu: "Maison Saint-Joseph"
    },
    {
      titre: "Fête Patronale",
      description: "Célébration de Notre-Dame de l'Incarnation",
      date: "25 Mars 2024",
      recurrent: false,
      type: "Fête",
      lieu: "Paroisse et salle des fêtes"
    },
    {
      titre: "Catéchèse Enfants",
      description: "Formation religieuse pour les 7-12 ans",
      date: "Mercredi 14h00",
      recurrent: true,
      type: "Formation",
      lieu: "Salle paroissiale"
    },
    {
      titre: "Vente de Charité",
      description: "Au profit des œuvres paroissiales",
      date: "12 Mai 2024",
      recurrent: false,
      type: "Événement",
      lieu: "Place de l'église"
    }
  ];

  const typeIcons = {
    "Liturgie": Church,
    "Prière": Book,
    "Formation": Users,
    "Fête": Calendar,
    "Événement": Users
  };

  const typeColors = {
    "Liturgie": "bg-blue-100 text-blue-700 border-blue-200",
    "Prière": "bg-purple-100 text-purple-700 border-purple-200",
    "Formation": "bg-green-100 text-green-700 border-green-200",
    "Fête": "bg-orange-100 text-orange-700 border-orange-200",
    "Événement": "bg-pink-100 text-pink-700 border-pink-200"
  };

  const handleInscription = (activityTitle: string) => {
    if (!user) {
      setSelectedActivity(activityTitle);
      setShowAuth(true);
      toast({
        title: "Inscription requise",
        description: "Veuillez vous connecter ou créer un compte pour vous inscrire à cette activité.",
      });
    } else {
      // L'utilisateur est connecté, procéder à l'inscription
      toast({
        title: "Inscription réussie",
        description: `Vous êtes inscrit à: ${activityTitle}`,
      });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    if (selectedActivity) {
      toast({
        title: "Inscription réussie",
        description: `Vous êtes maintenant inscrit à: ${selectedActivity}`,
      });
      setSelectedActivity(null);
    }
  };

  if (showAuth) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Calendrier des Activités
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez toutes les activités et événements de notre paroisse. 
            Rejoignez-nous pour vivre ensemble notre foi.
          </p>
        </div>

        {/* Activités Récurrentes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Activités Régulières</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activites.filter(activite => activite.recurrent).map((activite, index) => {
              const Icon = typeIcons[activite.type as keyof typeof typeIcons];
              return (
                <Card 
                  key={activite.titre}
                  className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 flex items-center">
                          <Icon className="w-5 h-5 mr-2 text-primary" />
                          {activite.titre}
                        </CardTitle>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${typeColors[activite.type as keyof typeof typeColors]}`}>
                          {activite.type}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-3">
                      {activite.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {activite.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Church className="w-4 h-4 mr-2" />
                        {activite.lieu}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleInscription(activite.titre)}
                    >
                      Plus d'informations
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Événements Spéciaux */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Événements Spéciaux</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activites.filter(activite => !activite.recurrent).map((activite, index) => {
              const Icon = typeIcons[activite.type as keyof typeof typeIcons];
              return (
                <Card 
                  key={activite.titre}
                  className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up border-l-4 border-l-primary"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 flex items-center">
                          <Icon className="w-5 h-5 mr-2 text-primary" />
                          {activite.titre}
                        </CardTitle>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${typeColors[activite.type as keyof typeof typeColors]}`}>
                          {activite.type}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-3">
                      {activite.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {activite.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Church className="w-4 h-4 mr-2" />
                        {activite.lieu}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleInscription(activite.titre)}
                    >
                      S'inscrire
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitesPage;
