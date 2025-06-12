
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Home, Car, Gift, Baby, Circle, Cross, Calendar } from 'lucide-react';
import PageParticles from './PageParticles';

const BenedictionsPage = () => {
  const benedictions = [
    {
      title: "Bénédiction de Maison",
      description: "Bénédiction d'un nouveau foyer ou d'une nouvelle demeure",
      icon: Home,
      duree: "30 minutes",
      tarif: "5 000 FCFA",
      details: "Une cérémonie de bénédiction pour consacrer votre nouveau foyer et y invoquer la protection divine."
    },
    {
      title: "Bénédiction de Véhicule",
      description: "Bénédiction d'une voiture, moto ou tout autre véhicule",
      icon: Car,
      duree: "15 minutes",
      tarif: "3 000 FCFA",
      details: "Demandez la protection de Dieu pour vos déplacements et la sécurité sur la route."
    },
    {
      title: "Bénédiction d'Entreprise",
      description: "Bénédiction d'un commerce, bureau ou entreprise",
      icon: Gift,
      duree: "45 minutes",
      tarif: "10 000 FCFA",
      details: "Consacrez votre activité professionnelle et demandez la prospérité dans votre travail."
    },
    {
      title: "Bénédiction de Grossesse",
      description: "Bénédiction d'une femme enceinte et de l'enfant à naître",
      icon: Baby,
      duree: "20 minutes",
      tarif: "Offrande libre",
      details: "Une prière spéciale pour la mère et l'enfant, demandant une grossesse sereine et un accouchement heureux."
    },
    {
      title: "Bénédiction d'Alliance",
      description: "Bénédiction des alliances avant le mariage",
      icon: Circle,
      duree: "15 minutes",
      tarif: "2 000 FCFA",
      details: "Consécration des alliances qui symboliseront l'union des époux devant Dieu."
    },
    {
      title: "Bénédiction d'Objets Religieux",
      description: "Bénédiction de crucifix, médailles, chapelets",
      icon: Cross,
      duree: "10 minutes",
      tarif: "1 000 FCFA",
      details: "Consécration d'objets de piété pour qu'ils deviennent des instruments de grâce et de protection."
    }
  ];

  const modalitesPratiques = [
    "Prendre rendez-vous au secrétariat paroissial",
    "Prévoir 48h de délai minimum",
    "Se munir des documents nécessaires selon le type de bénédiction",
    "Prévoir le tarif en espèces ou via mobile money",
    "Possibilité de bénédictions collectives pour certaines occasions"
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 relative">
      <PageParticles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Bénédictions Paroissiales
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Demandez la bénédiction de Dieu sur vos projets, vos biens et les moments importants de votre vie. 
            Notre équipe pastorale est à votre disposition pour vous accompagner dans ces moments de grâce.
          </p>
        </div>

        {/* Types de bénédictions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benedictions.map((benediction, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <benediction.icon className="w-8 h-8 text-church-blue mr-3" />
                  <CardTitle className="text-xl">{benediction.title}</CardTitle>
                </div>
                <CardDescription>{benediction.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Durée:</span>
                    <span className="text-sm">{benediction.duree}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tarif:</span>
                    <span className="text-sm font-semibold text-church-blue">{benediction.tarif}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {benediction.details}
                  </p>
                  <Button className="w-full mt-4 bg-church-blue hover:bg-church-blue/90">
                    <Calendar className="w-4 h-4 mr-2" />
                    Prendre RDV
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modalités pratiques */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Modalités Pratiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-church-blue">
                  Comment procéder ?
                </h3>
                <ul className="space-y-3">
                  {modalitesPratiques.map((modalite, index) => (
                    <li key={index} className="flex items-start">
                      <Heart className="w-4 h-4 text-church-blue mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{modalite}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-church-blue">
                  Informations importantes
                </h3>
                <div className="space-y-4 text-sm">
                  <p>
                    <strong>Horaires :</strong> Les bénédictions peuvent être organisées 
                    du lundi au samedi de 9h à 17h, et le dimanche après les messes.
                  </p>
                  <p>
                    <strong>Déplacements :</strong> Pour les bénédictions à domicile ou 
                    sur site, des frais de déplacement peuvent s'appliquer selon la distance.
                  </p>
                  <p>
                    <strong>Préparation :</strong> Certaines bénédictions nécessitent une 
                    préparation spirituelle. Nous vous accompagnerons dans cette démarche.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-church-blue text-white">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Contact pour les Bénédictions</h3>
            <p className="mb-6">
              Pour toute demande de bénédiction, contactez le secrétariat paroissial
            </p>
            <div className="space-y-2">
              <p><strong>Téléphone :</strong> +225 22 44 XX XX</p>
              <p><strong>Email :</strong> benedictions@paroisse-cocody.ci</p>
              <p><strong>Horaires :</strong> Lundi - Vendredi : 8h - 17h</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BenedictionsPage;
