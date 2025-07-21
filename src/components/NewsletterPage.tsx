import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PageParticles from './PageParticles';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          nom,
          prenom,
          user_id: user?.id || null,
          subscribed: true
        });

      if (error) throw error;

      setIsSubscribed(true);
      toast({
        title: "Inscription réussie !",
        description: "Vous êtes maintenant inscrit(e) à notre newsletter paroissiale.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <>
        <PageParticles count={10} />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
          <div className="container mx-auto px-4 py-16">
            <Card className="max-w-2xl mx-auto text-center border-green-200 bg-green-50">
              <CardContent className="pt-12 pb-12">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-green-800 mb-4">
                  Bienvenue dans notre communauté !
                </h1>
                <p className="text-green-600 text-lg mb-6">
                  Votre inscription à la newsletter paroissiale a été confirmée.
                  Vous recevrez désormais nos actualités, méditations et annonces.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-inner">
                  <h3 className="font-semibold text-gray-800 mb-3">Ce que vous recevrez :</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Actualités de la paroisse</li>
                    <li>• Méditations et réflexions spirituelles</li>
                    <li>• Annonces d'événements</li>
                    <li>• Horaires spéciaux des célébrations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageParticles count={10} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Newsletter Paroissiale
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Restez connecté avec la vie de notre paroisse. Recevez nos actualités, 
              méditations et annonces directement dans votre boîte mail.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire d'inscription */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-500" />
                  Rejoignez notre communauté
                </CardTitle>
                <CardDescription>
                  Inscrivez-vous gratuitement à notre newsletter pour rester informé(e)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      type="text"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      type="text"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Inscription en cours...' : 'S\'inscrire à la newsletter'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informations sur la newsletter */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Que contient notre newsletter ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Actualités et vie de la paroisse</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Méditations et réflexions spirituelles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Annonces d'événements et célébrations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Horaires spéciaux et changements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Témoignages et partages de foi</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fréquence et confidentialité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-gray-600">
                    <p>
                      <strong>Fréquence :</strong> Une newsletter par semaine, généralement le dimanche soir.
                    </p>
                    <p>
                      <strong>Confidentialité :</strong> Vos données sont protégées et ne seront jamais partagées avec des tiers.
                    </p>
                    <p>
                      <strong>Désabonnement :</strong> Vous pouvez vous désabonner à tout moment en un clic.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-blue-800 font-medium">
                      Déjà plus de 500 paroissiens inscrits !
                    </p>
                    <p className="text-blue-600 text-sm mt-1">
                      Rejoignez notre communauté en ligne
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterPage;