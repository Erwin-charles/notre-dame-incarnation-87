import { Calendar, Clock, User, MessageCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ActualitesPage = () => {
  // Mock data pour les actualités
  const actualites = [
    {
      id: 1,
      titre: "Célébration de la Fête Patronale 2024",
      contenu: "Nous vous invitons tous à participer à la célébration de notre fête patronale dédiée à Notre-Dame de l'Incarnation. Programme spécial avec messe solennelle, procession mariale et festivités communautaires.",
      date: "2024-03-25",
      auteur: "Père Joseph ZINSOU",
      categorie: "Événement",
      image: "/images/fete-patronale.jpg"
    },
    {
      id: 2,
      titre: "Nouvelle procédure pour les demandes de messe",
      contenu: "Il est désormais possible d'envoyer une demande de messe depuis votre position sans vous déplacer. Pour envoyer une demande de messe à la paroisse Notre Dame de l'Incarnation, utilisez le lien : bit.ly/demande-ndi",
      date: "2024-03-20",
      auteur: "Secrétariat",
      categorie: "Information",
      lien: "https://bit.ly/demande-ndi"
    },
    {
      id: 3,
      titre: "Temps de Carême - Horaires spéciaux",
      contenu: "Durant le temps de Carême, des horaires spéciaux sont mis en place pour accompagner votre cheminement spirituel. Chemin de croix tous les vendredis à 18h30, suivi de la messe à 19h00.",
      date: "2024-03-15",
      auteur: "Équipe Liturgique",
      categorie: "Liturgie"
    },
    {
      id: 4,
      titre: "Formation des catéchistes - Inscription ouverte",
      contenu: "Vous ressentez l'appel à servir dans l'enseignement religieux ? Les inscriptions pour la formation des catéchistes sont ouvertes. Contact au secrétariat pour plus d'informations.",
      date: "2024-03-10",
      auteur: "Responsable Catéchèse",
      categorie: "Formation"
    },
    {
      id: 5,
      titre: "Inauguration du nouveau bâtiment polyvalent",
      contenu: "Nous sommes heureux d'annoncer l'inauguration officielle de notre nouveau bâtiment polyvalent, fruit de longues années de mobilisation communautaire. Il abrite désormais des bureaux, salles de réunions et espaces de catéchèse.",
      date: "2023-12-15",
      auteur: "Conseil Paroissial",
      categorie: "Infrastructure"
    }
  ];

  const getCategorieColor = (categorie: string) => {
    switch (categorie) {
      case 'Événement': return 'bg-blue-100 text-blue-800';
      case 'Information': return 'bg-green-100 text-green-800';
      case 'Liturgie': return 'bg-purple-100 text-purple-800';
      case 'Formation': return 'bg-orange-100 text-orange-800';
      case 'Infrastructure': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-church-gold rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Actualités Paroissiales</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Restez informés de la vie de notre communauté paroissiale. 
            Découvrez nos événements, annonces et nouvelles importantes.
          </p>
        </div>

        {/* Section Contact */}
        <Card className="mb-8 bg-church-gold/10 border-church-gold/20">
          <CardHeader>
            <CardTitle className="text-church-gold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Contactez le secrétariat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                <div className="w-12 h-12 bg-church-gold rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-medium text-gray-900">paroissendi2025@gmail.com</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                <div className="w-12 h-12 bg-church-gold rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                <p className="font-medium text-gray-900">+225 07-15-55-52-27</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                <div className="w-12 h-12 bg-church-gold rounded-full flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Chat en direct</p>
                <p className="font-medium text-gray-900">Sur notre site internet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des actualités */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {actualites.map((actualite) => (
            <Card key={actualite.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 mb-2">
                      {actualite.titre}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(actualite.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{actualite.auteur}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategorieColor(actualite.categorie)}>
                    {actualite.categorie}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {actualite.contenu}
                </p>
                {actualite.lien && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={actualite.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Accéder au lien
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActualitesPage;