
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, User, Mail, Phone, MapPin, Calendar, Award, Book } from 'lucide-react';
import PageParticles from './PageParticles';
import PaymentSection from './PaymentSection';
import { useToast } from '@/hooks/use-toast';

const InscriptionCatechistePage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '',
    telephone: '',
    email: '',
    adresse: '',
    profession: '',
    employeur: '',
    
    // Informations familiales
    situationMatrimoniale: '',
    conjoint: '',
    nombreEnfants: '',
    
    // Informations religieuses
    paroisse: '',
    dateBapteme: '',
    lieuBapteme: '',
    dateConfirmation: '',
    lieuConfirmation: '',
    dateMariage: '',
    lieuMariage: '',
    
    // Formation et expérience
    niveauEtudes: '',
    formationReligieuse: '',
    experienceEnseignement: '',
    experienceCatechese: '',
    languesParles: '',
    
    // Motivation et disponibilité
    motivation: '',
    disponibilite: '',
    niveauSouhaite: '',
    engagementDuree: '',
    
    // Références
    parrain1: '',
    telephoneParrain1: '',
    parrain2: '',
    telephoneParrain2: '',
    
    // Autres informations
    handicaps: '',
    allergies: '',
    informationsComplementaires: ''
  });

  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
    toast({
      title: "Formulaire soumis",
      description: "Procédez au paiement pour finaliser votre inscription comme catéchiste.",
    });
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    toast({
      title: "Inscription confirmée !",
      description: "Votre candidature comme catéchiste a été enregistrée. Nous vous contacterons bientôt.",
    });
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 relative">
        <PageParticles />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <PaymentSection
              amount={50000}
              service="Inscription Catéchiste"
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 relative">
      <PageParticles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Inscription Catéchiste</h1>
          <p className="text-xl text-muted-foreground">Rejoignez notre équipe de formation chrétienne</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Informations personnelles */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input 
                    id="nom" 
                    value={formData.nom}
                    onChange={(e) => handleChange('nom', e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input 
                    id="prenom" 
                    value={formData.prenom}
                    onChange={(e) => handleChange('prenom', e.target.value)}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateNaissance">Date de naissance *</Label>
                  <Input 
                    id="dateNaissance" 
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleChange('dateNaissance', e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
                  <Input 
                    id="lieuNaissance" 
                    value={formData.lieuNaissance}
                    onChange={(e) => handleChange('lieuNaissance', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sexe">Sexe *</Label>
                  <Select value={formData.sexe} onValueChange={(value) => handleChange('sexe', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homme">Homme</SelectItem>
                      <SelectItem value="femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input 
                    id="telephone" 
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adresse">Adresse complète *</Label>
                <Textarea 
                  id="adresse" 
                  value={formData.adresse}
                  onChange={(e) => handleChange('adresse', e.target.value)}
                  required 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Input 
                    id="profession" 
                    value={formData.profession}
                    onChange={(e) => handleChange('profession', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="employeur">Employeur</Label>
                  <Input 
                    id="employeur" 
                    value={formData.employeur}
                    onChange={(e) => handleChange('employeur', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations religieuses */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <Book className="w-5 h-5 mr-2" />
                Informations Religieuses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="paroisse">Paroisse d'origine</Label>
                <Input 
                  id="paroisse" 
                  value={formData.paroisse}
                  onChange={(e) => handleChange('paroisse', e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateBapteme">Date de baptême *</Label>
                  <Input 
                    id="dateBapteme" 
                    type="date"
                    value={formData.dateBapteme}
                    onChange={(e) => handleChange('dateBapteme', e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="lieuBapteme">Lieu de baptême</Label>
                  <Input 
                    id="lieuBapteme" 
                    value={formData.lieuBapteme}
                    onChange={(e) => handleChange('lieuBapteme', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateConfirmation">Date de confirmation *</Label>
                  <Input 
                    id="dateConfirmation" 
                    type="date"
                    value={formData.dateConfirmation}
                    onChange={(e) => handleChange('dateConfirmation', e.target.value)}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="lieuConfirmation">Lieu de confirmation</Label>
                  <Input 
                    id="lieuConfirmation" 
                    value={formData.lieuConfirmation}
                    onChange={(e) => handleChange('lieuConfirmation', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateMariage">Date de mariage (si marié)</Label>
                  <Input 
                    id="dateMariage" 
                    type="date"
                    value={formData.dateMariage}
                    onChange={(e) => handleChange('dateMariage', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lieuMariage">Lieu de mariage</Label>
                  <Input 
                    id="lieuMariage" 
                    value={formData.lieuMariage}
                    onChange={(e) => handleChange('lieuMariage', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formation et expérience */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Formation et Expérience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="niveauEtudes">Niveau d'études</Label>
                <Select value={formData.niveauEtudes} onValueChange={(value) => handleChange('niveauEtudes', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primaire">Primaire</SelectItem>
                    <SelectItem value="secondaire">Secondaire</SelectItem>
                    <SelectItem value="superieur">Supérieur</SelectItem>
                    <SelectItem value="universitaire">Universitaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="formationReligieuse">Formation religieuse antérieure</Label>
                <Textarea 
                  id="formationReligieuse" 
                  value={formData.formationReligieuse}
                  onChange={(e) => handleChange('formationReligieuse', e.target.value)}
                  placeholder="Décrivez vos formations religieuses précédentes..."
                />
              </div>

              <div>
                <Label htmlFor="experienceEnseignement">Expérience dans l'enseignement</Label>
                <Textarea 
                  id="experienceEnseignement" 
                  value={formData.experienceEnseignement}
                  onChange={(e) => handleChange('experienceEnseignement', e.target.value)}
                  placeholder="Décrivez votre expérience dans l'enseignement..."
                />
              </div>

              <div>
                <Label htmlFor="experienceCatechese">Expérience en catéchèse</Label>
                <Textarea 
                  id="experienceCatechese" 
                  value={formData.experienceCatechese}
                  onChange={(e) => handleChange('experienceCatechese', e.target.value)}
                  placeholder="Décrivez votre expérience en catéchèse..."
                />
              </div>

              <div>
                <Label htmlFor="languesParles">Langues parlées</Label>
                <Input 
                  id="languesParles" 
                  value={formData.languesParles}
                  onChange={(e) => handleChange('languesParles', e.target.value)}
                  placeholder="Ex: Français, Anglais, Baoulé..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Motivation et disponibilité */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Motivation et Disponibilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="motivation">Motivation pour devenir catéchiste *</Label>
                <Textarea 
                  id="motivation" 
                  value={formData.motivation}
                  onChange={(e) => handleChange('motivation', e.target.value)}
                  placeholder="Expliquez votre motivation..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="disponibilite">Disponibilité</Label>
                <Textarea 
                  id="disponibilite" 
                  value={formData.disponibilite}
                  onChange={(e) => handleChange('disponibilite', e.target.value)}
                  placeholder="Indiquez vos créneaux de disponibilité..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="niveauSouhaite">Niveau souhaité pour enseigner</Label>
                  <Select value={formData.niveauSouhaite} onValueChange={(value) => handleChange('niveauSouhaite', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eveil">Éveil à la Foi (3-6 ans)</SelectItem>
                      <SelectItem value="enfants">Enfants (7-10 ans)</SelectItem>
                      <SelectItem value="adolescents">Adolescents (11-14 ans)</SelectItem>
                      <SelectItem value="jeunes">Jeunes (15-18 ans)</SelectItem>
                      <SelectItem value="adultes">Adultes</SelectItem>
                      <SelectItem value="indifferent">Indifférent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="engagementDuree">Durée d'engagement souhaitée</Label>
                  <Select value={formData.engagementDuree} onValueChange={(value) => handleChange('engagementDuree', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1an">1 an</SelectItem>
                      <SelectItem value="2ans">2 ans</SelectItem>
                      <SelectItem value="3ans">3 ans</SelectItem>
                      <SelectItem value="longterme">Long terme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Références */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary">Références</CardTitle>
              <CardDescription>Deux personnes qui peuvent témoigner de votre engagement chrétien</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parrain1">Première référence *</Label>
                  <Input 
                    id="parrain1" 
                    value={formData.parrain1}
                    onChange={(e) => handleChange('parrain1', e.target.value)}
                    placeholder="Nom complet"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="telephoneParrain1">Téléphone</Label>
                  <Input 
                    id="telephoneParrain1" 
                    type="tel"
                    value={formData.telephoneParrain1}
                    onChange={(e) => handleChange('telephoneParrain1', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parrain2">Deuxième référence</Label>
                  <Input 
                    id="parrain2" 
                    value={formData.parrain2}
                    onChange={(e) => handleChange('parrain2', e.target.value)}
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="telephoneParrain2">Téléphone</Label>
                  <Input 
                    id="telephoneParrain2" 
                    type="tel"
                    value={formData.telephoneParrain2}
                    onChange={(e) => handleChange('telephoneParrain2', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations complémentaires */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary">Informations Complémentaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="handicaps">Handicaps ou limitations physiques</Label>
                <Input 
                  id="handicaps" 
                  value={formData.handicaps}
                  onChange={(e) => handleChange('handicaps', e.target.value)}
                  placeholder="À mentionner si applicable"
                />
              </div>

              <div>
                <Label htmlFor="allergies">Allergies ou problèmes de santé</Label>
                <Input 
                  id="allergies" 
                  value={formData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  placeholder="À mentionner si applicable"
                />
              </div>

              <div>
                <Label htmlFor="informationsComplementaires">Autres informations</Label>
                <Textarea 
                  id="informationsComplementaires" 
                  value={formData.informationsComplementaires}
                  onChange={(e) => handleChange('informationsComplementaires', e.target.value)}
                  placeholder="Toute autre information que vous souhaitez partager..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  En soumettant ce formulaire, je confirme que toutes les informations fournies sont exactes
                  et je m'engage à respecter les valeurs et règlements de la paroisse.
                </p>
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Soumettre ma Candidature
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default InscriptionCatechistePage;
