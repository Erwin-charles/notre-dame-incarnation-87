import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Book,
  Users,
  User
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

        {!inscriptionType ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};

export default CatechesePage;
