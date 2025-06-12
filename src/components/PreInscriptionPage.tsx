
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentSection from './PaymentSection';
import PageParticles from './PageParticles';
import PersonalInfoForm from './forms/PersonalInfoForm';
import FamilyInfoForm from './forms/FamilyInfoForm';
import BaptismInfoForm from './forms/BaptismInfoForm';
import CourseInfoForm from './forms/CourseInfoForm';

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
              <PersonalInfoForm 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
              
              <FamilyInfoForm 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <BaptismInfoForm 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <CourseInfoForm 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

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
