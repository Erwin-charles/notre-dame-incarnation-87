
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book,
  Users,
  User,
  Calendar,
  Clock,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentSection from './PaymentSection';

const CatechesePage = () => {
  const [inscriptionType, setInscriptionType] = useState<'catechiste' | 'catechumene' | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState({ name: '', amount: 0 });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Inscription envoyée",
      description: "Votre demande d'inscription a été transmise. Nous vous contacterons bientôt.",
    });
    setInscriptionType(null);
  };

  const handleInscription = (parcours: string, amount: number) => {
    setSelectedService({ name: parcours, amount });
    setShowPayment(true);
    toast({
      title: "Inscription initiée",
      description: `Procédez au paiement pour finaliser votre inscription à ${parcours}.`,
    });
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    toast({
      title: "Inscription confirmée !",
      description: "Vous recevrez bientôt les détails de votre parcours par SMS ou email.",
    });
  };

  const programmeData = [
    {
      niveau: "Éveil à la Foi (3-6 ans)",
      horaire: "Dimanche 9h30 - 10h15",
      lieu: "Salle Saint-Joseph",
      responsable: "Sœur Marie-Claire",
      description: "Découverte de Jésus à travers des histoires, chants et activités ludiques."
    },
    {
      niveau: "Catéchisme CE1-CE2 (7-8 ans)",
      horaire: "Samedi 16h00 - 17h00",
      lieu: "Salle Saint-Pierre",
      responsable: "Mme Adjoua Kouassi",
      description: "Préparation aux premiers sacrements : réconciliation et communion."
    },
    {
      niveau: "Catéchisme CM1-CM2 (9-10 ans)",
      horaire: "Samedi 17h00 - 18h00",
      lieu: "Salle Saint-Pierre",
      responsable: "M. Jean-Baptiste Koffi",
      description: "Approfondissement de la foi et préparation à la communion solennelle."
    },
    {
      niveau: "Aumônerie Collège (11-14 ans)",
      horaire: "Dimanche 15h00 - 16h30",
      lieu: "Centre de jeunes",
      responsable: "Père Michel",
      description: "Formation à la vie chrétienne et préparation à la confirmation."
    },
    {
      niveau: "Aumônerie Lycée (15-18 ans)",
      horaire: "Dimanche 16h30 - 18h00",
      lieu: "Centre de jeunes",
      responsable: "Diacre Paul Ouattara",
      description: "Accompagnement vers l'âge adulte dans la foi chrétienne."
    },
    {
      niveau: "Catéchuménat Adultes",
      horaire: "Mercredi 19h00 - 20h30",
      lieu: "Salle de conférence",
      responsable: "Équipe catéchuménat",
      description: "Parcours de découverte et d'initiation chrétienne pour adultes."
    }
  ];

  const calendrierAnnuel = [
    { periode: "Septembre", activites: ["Rentrée catéchétique", "Assemblée générale des parents", "Formation des catéchistes"] },
    { periode: "Octobre", activites: ["Fête de la Foi", "Pèlerinage à Yamoussoukro", "Temps fort Toussaint"] },
    { periode: "Novembre", activites: ["Célébration de l'Avent", "Préparation aux sacrements", "Formation continue"] },
    { periode: "Décembre", activites: ["Célébration de Noël", "Vacances de Noël", "Temps de partage"] },
    { periode: "Janvier", activites: ["Reprise des cours", "Épiphanie", "Temps fort"] },
    { periode: "Février", activites: ["Carême - Chemin de croix", "Récollection", "Service aux plus démunis"] },
    { periode: "Mars", activites: ["Semaine Sainte", "Célébrations pascales", "Temps de jeûne"] },
    { periode: "Avril", activites: ["Temps pascal", "Première communion", "Confirmations"] },
    { periode: "Mai", activites: ["Mois de Marie", "Pèlerinage marial", "Fête des mères"] },
    { periode: "Juin", activites: ["Fête-Dieu", "Kermesse paroissiale", "Fin d'année catéchétique"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <Book className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Catéchèse Paroissiale
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre communauté d'apprentissage et de foi. 
            Que vous souhaitiez enseigner ou apprendre, nous vous accueillons avec joie.
          </p>
        </div>

        <Tabs defaultValue="inscription" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inscription">Inscriptions</TabsTrigger>
            <TabsTrigger value="programme">Programme</TabsTrigger>
            <TabsTrigger value="calendrier">Calendrier</TabsTrigger>
          </TabsList>

          <TabsContent value="inscription" className="mt-8">
            {!inscriptionType ? (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inscription Catéchiste */}
                <Card className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-700">Devenir Catéchiste</CardTitle>
                    <CardDescription>
                      Partagez votre foi et accompagnez les jeunes dans leur cheminement spirituel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Formation continue assurée
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Accompagnement par l'équipe
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Ressources pédagogiques fournies
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleInscription('Catéchiste', 100)}
                    >
                      S'inscrire comme Catéchiste
                    </Button>
                  </CardContent>
                </Card>

                {/* Inscription Catéchumène */}
                <Card className="group hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl text-blue-700">Devenir Catéchumène</CardTitle>
                    <CardDescription>
                      Découvrez la foi chrétienne et préparez-vous aux sacrements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Parcours adapté à votre rythme
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Accompagnement personnalisé
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Préparation aux sacrements
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleInscription('Catéchumène', 200)}
                    >
                      S'inscrire comme Catéchumène
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto animate-fade-in-up">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      Inscription {inscriptionType === 'catechiste' ? 'Catéchiste' : 'Catéchumène'}
                    </CardTitle>
                    <CardDescription className="text-center">
                      Veuillez remplir ce formulaire pour votre inscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prenom">Prénom *</Label>
                          <Input id="prenom" required />
                        </div>
                        <div>
                          <Label htmlFor="nom">Nom *</Label>
                          <Input id="nom" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="telephone">Téléphone *</Label>
                        <Input id="telephone" type="tel" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="adresse">Adresse</Label>
                        <Input id="adresse" />
                      </div>

                      {inscriptionType === 'catechiste' && (
                        <div>
                          <Label htmlFor="experience">Expérience dans l'enseignement ou l'animation</Label>
                          <Input id="experience" placeholder="Décrivez brièvement votre expérience..." />
                        </div>
                      )}

                      {inscriptionType === 'catechumene' && (
                        <div>
                          <Label htmlFor="motivation">Qu'est-ce qui vous motive dans cette démarche ?</Label>
                          <Input id="motivation" placeholder="Partagez votre motivation..." />
                        </div>
                      )}
                      
                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setInscriptionType(null)}
                          className="flex-1"
                        >
                          Retour
                        </Button>
                        <Button type="submit" className="flex-1">
                          Envoyer l'inscription
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section de paiement */}
            {showPayment && (
              <div className="max-w-2xl mx-auto mt-12">
                <PaymentSection
                  amount={selectedService.amount}
                  service={selectedService.name}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="programme" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Programme Catéchétique</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Notre programme catéchétique s'adapte à tous les âges, de l'éveil à la foi jusqu'à l'âge adulte. 
                  Chaque niveau propose un parcours adapté pour grandir dans la foi.
                </p>
              </div>

              <div className="grid gap-6">
                {programmeData.map((niveau, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-blue-700 mb-2">{niveau.niveau}</h3>
                          <p className="text-gray-600 mb-4">{niveau.description}</p>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-blue-500" />
                              {niveau.horaire}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                              {niveau.lieu}
                            </div>
                            <div className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                              {niveau.responsable}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Informations Importantes</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Les inscriptions se font chaque année en septembre</p>
                    <p>• Une participation aux frais pédagogiques est demandée (livres, matériel)</p>
                    <p>• La présence régulière est essentielle pour le bon déroulement du parcours</p>
                    <p>• Les parents sont invités à participer aux célébrations et temps forts</p>
                    <p>• Une réunion de présentation a lieu début septembre pour chaque niveau</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendrier" className="mt-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Calendrier Annuel</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Découvrez les temps forts et activités de l'année catéchétique, rythmée par le calendrier liturgique 
                  et les grandes fêtes chrétiennes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {calendrierAnnuel.map((mois, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-xl text-blue-700">
                        <Calendar className="w-5 h-5 mr-2" />
                        {mois.periode}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {mois.activites.map((activite, i) => (
                          <li key={i} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{activite}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Temps Forts de l'Année</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">Célébrations Sacramentelles</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Première communion (avril/mai)</li>
                        <li>• Confirmations (mai/juin)</li>
                        <li>• Baptêmes d'adultes (Vigile pascale)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Événements Communautaires</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Fête de la catéchèse (octobre)</li>
                        <li>• Pèlerinage diocésain</li>
                        <li>• Kermesse paroissiale (juin)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CatechesePage;
