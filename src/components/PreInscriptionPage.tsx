
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, UserPlus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import PaymentSection from './PaymentSection';
import PageParticles from './PageParticles';

const PreInscriptionPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    lieuHabitation: '',
    nomPere: '',
    nomMere: '',
    nomParrain: '',
    nomMarraine: '',
    classe: '',
    anneeSuivie: '',
    jourCours: '',
    estBaptise: false,
    dateBapteme: undefined as Date | undefined,
  });
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setShowPayment(true);
    toast({
      title: "Formulaire validé",
      description: "Procédez maintenant au paiement pour finaliser votre inscription.",
    });
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Inscription confirmée !",
      description: "Votre pré-inscription a été enregistrée avec succès.",
    });
    // Reset form
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      lieuHabitation: '',
      nomPere: '',
      nomMere: '',
      nomParrain: '',
      nomMarraine: '',
      classe: '',
      anneeSuivie: '',
      jourCours: '',
      estBaptise: false,
      dateBapteme: undefined,
    });
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 relative">
      <PageParticles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex items-center justify-center">
              <UserPlus className="w-8 h-8 mr-3 text-church-blue" />
              Pré-inscription Catéchumène
            </CardTitle>
            <CardDescription>
              Remplissez ce formulaire pour votre pré-inscription aux parcours de catéchèse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lieuHabitation">Lieu d'habitation</Label>
                <Input
                  id="lieuHabitation"
                  value={formData.lieuHabitation}
                  onChange={(e) => handleInputChange('lieuHabitation', e.target.value)}
                />
              </div>

              {/* Informations familiales */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Informations Familiales</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomPere">Nom du Père</Label>
                    <Input
                      id="nomPere"
                      value={formData.nomPere}
                      onChange={(e) => handleInputChange('nomPere', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomMere">Nom de la Mère</Label>
                    <Input
                      id="nomMere"
                      value={formData.nomMere}
                      onChange={(e) => handleInputChange('nomMere', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="nomParrain">Nom du Parrain</Label>
                    <Input
                      id="nomParrain"
                      value={formData.nomParrain}
                      onChange={(e) => handleInputChange('nomParrain', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomMarraine">Nom de la Marraine</Label>
                    <Input
                      id="nomMarraine"
                      value={formData.nomMarraine}
                      onChange={(e) => handleInputChange('nomMarraine', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Informations sur le baptême */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Informations sur le Baptême</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="estBaptise"
                    checked={formData.estBaptise}
                    onCheckedChange={(checked) => handleInputChange('estBaptise', checked)}
                  />
                  <Label htmlFor="estBaptise">J'ai été baptisé(e) enfant</Label>
                </div>

                {formData.estBaptise && (
                  <div>
                    <Label>Date de Baptême</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateBapteme ? (
                            format(formData.dateBapteme, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateBapteme}
                          onSelect={(date) => handleInputChange('dateBapteme', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Informations sur les cours */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Informations sur les Cours</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="classe">Classe</Label>
                    <Select onValueChange={(value) => handleInputChange('classe', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eveil">Éveil à la foi (3-7 ans)</SelectItem>
                        <SelectItem value="ce1">Catéchèse CE1</SelectItem>
                        <SelectItem value="ce2">Catéchèse CE2</SelectItem>
                        <SelectItem value="cm1">Catéchèse CM1</SelectItem>
                        <SelectItem value="cm2">Catéchèse CM2</SelectItem>
                        <SelectItem value="6eme">Catéchèse 6ème</SelectItem>
                        <SelectItem value="aumonerie">Aumônerie (Collège/Lycée)</SelectItem>
                        <SelectItem value="adulte">Catéchuménat Adulte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="anneeSuivie">Année suivie</Label>
                    <Select onValueChange={(value) => handleInputChange('anneeSuivie', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1ere">1ère année</SelectItem>
                        <SelectItem value="2eme">2ème année</SelectItem>
                        <SelectItem value="3eme">3ème année</SelectItem>
                        <SelectItem value="4eme">4ème année</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jourCours">Jour de cours</Label>
                    <Select onValueChange={(value) => handleInputChange('jourCours', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mercredi">Mercredi</SelectItem>
                        <SelectItem value="samedi">Samedi</SelectItem>
                        <SelectItem value="dimanche">Dimanche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-church-blue hover:bg-church-blue/90">
                Valider l'inscription
              </Button>
            </form>

            {showPayment && (
              <PaymentSection
                amount={15000}
                service="Catéchèse"
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreInscriptionPage;
