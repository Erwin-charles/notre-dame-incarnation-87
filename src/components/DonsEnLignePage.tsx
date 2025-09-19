import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, CreditCard, Shield, Users, Church, Globe, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PageParticles from './PageParticles';

const DonsEnLignePage = () => {
  const [donateurNom, setDonateurNom] = useState('');
  const [donateurEmail, setDonateurEmail] = useState('');
  const [donateurTelephone, setDonateurTelephone] = useState('');
  const [montant, setMontant] = useState('');
  const [typeDon, setTypeDon] = useState('');
  const [messageDonateur, setMessageDonateur] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const typesDons = [
    {
      id: 'denier_culte',
      nom: 'Denier du Culte',
      description: 'Soutien au fonctionnement de la paroisse',
      icon: Church,
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: 'caritas',
      nom: 'Caritas',
      description: 'Aide aux plus démunis',
      icon: Heart,
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      id: 'mission',
      nom: 'Missions',
      description: 'Soutien aux missions évangélisatrices',
      icon: Globe,
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 'construction',
      nom: 'Travaux et Construction',
      description: 'Entretien et amélioration des bâtiments',
      icon: Building,
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      id: 'autre',
      nom: 'Autre',
      description: 'Autre intention spécifique',
      icon: Users,
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ];

  const montantsSuggeres = [5000, 10000, 25000, 50000, 100000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('paiements')
        .insert({
          montant: parseFloat(montant),
          type_paiement: typeDon,
          user_id: user?.id || null,
          reference_transaction: messageDonateur // Store the message in reference field
        });

      if (error) throw error;

      toast({
        title: "Don enregistré !",
        description: "Votre don a été enregistré. Vous allez être redirigé vers la page de paiement.",
      });

      // Ici, vous pourriez rediriger vers Stripe ou une autre solution de paiement
      // window.location.href = '/payment?type=don&amount=' + montant;
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageParticles count={12} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Dons en Ligne
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soutenez la mission de notre paroisse grâce à votre générosité. 
              Chaque don contribue à faire rayonner l'amour du Christ dans notre communauté.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire de don */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <CreditCard className="w-6 h-6 mr-2" />
                    Faire un don
                  </CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour effectuer votre don en ligne de manière sécurisée
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Types de dons */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Type de don *</Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {typesDons.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setTypeDon(type.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-all hover:scale-105 ${
                              typeDon === type.id 
                                ? `${type.color} border-current` 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <type.icon className="w-5 h-5 mr-2" />
                              <span className="font-semibold">{type.nom}</span>
                            </div>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Montant */}
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Montant du don (FCFA) *</Label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                        {montantsSuggeres.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={montant === amount.toString() ? "default" : "outline"}
                            onClick={() => setMontant(amount.toString())}
                            className="text-sm"
                          >
                            {amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <Input
                        type="number"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        placeholder="Montant personnalisé"
                        min="1000"
                        required
                      />
                    </div>

                    {/* Informations du donateur */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom">Nom complet *</Label>
                        <Input
                          type="text"
                          id="nom"
                          value={donateurNom}
                          onChange={(e) => setDonateurNom(e.target.value)}
                          placeholder="Votre nom complet"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          type="email"
                          id="email"
                          value={donateurEmail}
                          onChange={(e) => setDonateurEmail(e.target.value)}
                          placeholder="votre.email@exemple.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        type="tel"
                        id="telephone"
                        value={donateurTelephone}
                        onChange={(e) => setDonateurTelephone(e.target.value)}
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        value={messageDonateur}
                        onChange={(e) => setMessageDonateur(e.target.value)}
                        placeholder="Laissez un message ou une intention particulière..."
                        rows={3}
                      />
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-800">Paiement sécurisé</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Votre paiement sera traité de manière sécurisée. Nous acceptons les paiements 
                        par Mobile Money (Orange Money, MTN, Wave) et cartes bancaires.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" 
                      size="lg"
                      disabled={isLoading || !typeDon || !montant}
                    >
                      {isLoading ? 'Traitement...' : `Procéder au paiement - ${montant ? parseInt(montant).toLocaleString() : '0'} FCFA`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations complémentaires */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pourquoi donner ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Heart className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Soutenir les œuvres caritatives de la paroisse</span>
                    </li>
                    <li className="flex items-start">
                      <Church className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Contribuer au fonctionnement des célébrations</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Aider à la formation catéchétique</span>
                    </li>
                    <li className="flex items-start">
                      <Building className="w-4 h-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Entretenir et améliorer les bâtiments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">Reçu fiscal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700">
                    Un reçu vous sera envoyé par email après votre don. 
                    Conservez-le pour vos déclarations fiscales si applicable.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Méthodes de paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center mr-3">
                        OM
                      </div>
                      <span className="text-sm">Orange Money</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center mr-3">
                        MTN
                      </div>
                      <span className="text-sm">MTN Mobile Money</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center mr-3">
                        💙
                      </div>
                      <span className="text-sm">Wave</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
                      <span className="text-sm">Cartes bancaires</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Heart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <p className="text-purple-800 font-medium mb-2">
                      "Chacun donne comme il l'a décidé dans son cœur"
                    </p>
                    <p className="text-purple-600 text-sm">
                      2 Corinthiens 9:7
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

export default DonsEnLignePage;