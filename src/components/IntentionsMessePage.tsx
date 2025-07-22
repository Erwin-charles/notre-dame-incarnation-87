import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Heart, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PageParticles from './PageParticles';

const IntentionsMessePage = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [intention, setIntention] = useState('');
  const [dateMesse, setDateMesse] = useState<Date>();
  const [heureMesse, setHeureMesse] = useState('');
  const [donMontant, setDonMontant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const horairesMesses = [
    '6h30 - Messe du matin',
    '8h00 - Messe matinale',
    '9h30 - Messe dominicale',
    '11h00 - Grand-messe',
    '19h00 - Messe du soir'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('intentions_messe')
        .insert({
          nom,
          email,
          telephone,
          intention,
          date_messe: dateMesse?.toISOString().split('T')[0],
          heure_messe: heureMesse,
          don_montant: donMontant ? parseFloat(donMontant) : 0,
          user_id: user?.id || null,
          status: 'pending'
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Intention de messe envoyée !",
        description: "Votre demande d'intention de messe a été transmise. Nous vous confirmerons la disponibilité.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <PageParticles count={10} />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20">
          <div className="container mx-auto px-4 py-16">
            <Card className="max-w-2xl mx-auto text-center border-green-200 bg-green-50">
              <CardContent className="pt-12 pb-12">
                <Heart className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-green-800 mb-4">
                  Intention de messe reçue
                </h1>
                <p className="text-green-600 text-lg mb-6">
                  Votre demande d'intention de messe a été transmise avec succès.
                  Nous vous confirmerons la disponibilité par email ou téléphone.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-inner">
                  <h3 className="font-semibold text-gray-800 mb-3">Prochaines étapes :</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Vérification de la disponibilité</li>
                    <li>• Confirmation par email ou téléphone</li>
                    <li>• Instructions pour le don (si applicable)</li>
                    <li>• Inclusion dans la messe demandée</li>
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Intentions de Messe
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Demandez qu'une intention particulière soit portée lors d'une célébration eucharistique.
              Nous prierons pour vos proches, vos intentions personnelles ou en mémoire des défunts.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire de demande */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Formulaire de demande</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour demander une intention de messe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom">Nom complet *</Label>
                        <Input
                          type="text"
                          id="nom"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          placeholder="Votre nom complet"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="intention">Intention de messe *</Label>
                      <Textarea
                        id="intention"
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        placeholder="Décrivez votre intention : prière pour un proche, action de grâce, mémoire d'un défunt..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Date souhaitée *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !dateMesse && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateMesse ? format(dateMesse, "PPP", { locale: fr }) : "Choisir une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateMesse}
                              onSelect={setDateMesse}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="heure">Horaire préféré</Label>
                        <Select value={heureMesse} onValueChange={setHeureMesse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un horaire" />
                          </SelectTrigger>
                          <SelectContent>
                            {horairesMesses.map((horaire) => (
                              <SelectItem key={horaire} value={horaire}>
                                {horaire}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="don">Don (optionnel) - FCFA</Label>
                      <Input
                        type="number"
                        id="don"
                        value={donMontant}
                        onChange={(e) => setDonMontant(e.target.value)}
                        placeholder="Montant du don en FCFA"
                        min="0"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Le don est libre et optionnel. Il soutient la mission de la paroisse.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Envoi en cours...' : 'Envoyer la demande'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Horaires des messes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">En semaine</p>
                      <p className="text-gray-600">Lundi - Vendredi : 6h30 & 19h00</p>
                    </div>
                    <div>
                      <p className="font-semibold">Samedi</p>
                      <p className="text-gray-600">Messe du soir : 19h00</p>
                    </div>
                    <div>
                      <p className="font-semibold">Dimanche</p>
                      <p className="text-gray-600">Messes : 6h30, 8h00, 9h30, 11h00 & 19h00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Qu'est-ce qu'une intention de messe ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Une intention de messe est une prière particulière portée pendant la célébration eucharistique.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pour le repos de l'âme d'un défunt</li>
                    <li>• Pour la guérison d'un malade</li>
                    <li>• En action de grâce</li>
                    <li>• Pour une intention personnelle</li>
                    <li>• Pour la paix dans le monde</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Banknote className="w-5 h-5 mr-2" />
                    Don et offrande
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800">
                    Le don pour une intention de messe est libre. Il soutient la mission pastorale 
                    et les œuvres caritatives de la paroisse.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntentionsMessePage;