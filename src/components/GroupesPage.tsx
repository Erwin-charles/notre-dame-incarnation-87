
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users,
  User,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GroupesPage = () => {
  const { toast } = useToast();

  const groupes = [
    {
      nom: "Chorale Paroissiale",
      description: "Rejoignez notre chorale pour embellir les célébrations liturgiques",
      horaire: "Jeudi 20h00 - 21h30",
      contact: "Sœur Marie-Claire",
      membres: 25,
      type: "Liturgie"
    },
    {
      nom: "Équipe Saint-Vincent-de-Paul",
      description: "Action caritative auprès des plus démunis de notre quartier",
      horaire: "Samedi 14h00 - 16h00",
      contact: "M. Jean Durand",
      membres: 15,
      type: "Charité"
    },
    {
      nom: "Mouvement Chrétien des Retraités",
      description: "Partage et spiritualité pour nos aînés",
      horaire: "Mardi 15h00 - 17h00",
      contact: "Mme Françoise Martin",
      membres: 30,
      type: "Spiritualité"
    },
    {
      nom: "Groupe de Jeunes",
      description: "Activités et formation pour les 16-25 ans",
      horaire: "Vendredi 19h00 - 21h00",
      contact: "Père Antoine",
      membres: 20,
      type: "Jeunesse"
    },
    {
      nom: "Équipe d'Animation Liturgique",
      description: "Préparation et animation des célébrations",
      horaire: "Mercredi 18h30 - 20h00",
      contact: "Diacre Paul",
      membres: 12,
      type: "Liturgie"
    },
    {
      nom: "Mouvement des Familles",
      description: "Rencontres et activités pour les familles avec enfants",
      horaire: "Dimanche 16h00 - 18h00",
      contact: "Famille Leclerc",
      membres: 35,
      type: "Famille"
    }
  ];

  const typeColors = {
    "Liturgie": "bg-purple-100 text-purple-700",
    "Charité": "bg-green-100 text-green-700",
    "Spiritualité": "bg-blue-100 text-blue-700",
    "Jeunesse": "bg-orange-100 text-orange-700",
    "Famille": "bg-pink-100 text-pink-700"
  };

  const handleRejoindre = (groupeName: string) => {
    toast({
      title: "Demande d'adhésion envoyée",
      description: `Votre demande pour rejoindre "${groupeName}" a été transmise au responsable.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Groupes & Mouvements
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les différents groupes de notre paroisse et trouvez votre place 
            dans notre communauté dynamique et fraternelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupes.map((groupe, index) => (
            <Card 
              key={groupe.nom} 
              className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{groupe.nom}</CardTitle>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${typeColors[groupe.type as keyof typeof typeColors]}`}>
                      {groupe.type}
                    </span>
                  </div>
                </div>
                <CardDescription className="mt-3">
                  {groupe.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {groupe.horaire}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Contact: {groupe.contact}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {groupe.membres} membres
                  </div>
                </div>
                <Button 
                  className="w-full group-hover:scale-105 transition-transform"
                  onClick={() => handleRejoindre(groupe.nom)}
                >
                  Rejoindre le groupe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Contact */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Créer un Nouveau Groupe</CardTitle>
              <CardDescription>
                Vous avez une idée pour un nouveau groupe ou mouvement ? 
                Contactez-nous pour en discuter !
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" variant="outline">
                Proposer un nouveau groupe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroupesPage;
