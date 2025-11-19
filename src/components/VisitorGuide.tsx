import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Church, Calendar, Users, Book, Heart, X } from 'lucide-react';

const VisitorGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Vérifier si le guide a déjà été vu
    const hasSeenGuide = localStorage.getItem('hasSeenParishGuide');
    if (!hasSeenGuide) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      title: "Bienvenue sur notre site paroissial",
      description: "Découvrez notre communauté de foi et toutes les ressources disponibles pour vous.",
      icon: Church,
      color: "text-blue-600"
    },
    {
      title: "Activités et Événements",
      description: "Consultez le calendrier des messes, événements spéciaux et activités paroissiales. Vous pouvez vous inscrire aux événements qui vous intéressent.",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Catéchèse et Formation",
      description: "Inscrivez vos enfants à la catéchèse ou participez aux groupes de formation spirituelle pour approfondir votre foi.",
      icon: Book,
      color: "text-purple-600"
    },
    {
      title: "Groupes Paroissiaux",
      description: "Rejoignez nos différents groupes de prière, chorales, et communautés pour vivre votre foi en communion.",
      icon: Users,
      color: "text-orange-600"
    },
    {
      title: "Soutenir la Paroisse",
      description: "Vous pouvez contribuer à la vie de notre paroisse par vos dons en ligne ou en visitant notre librairie Caritas.",
      icon: Heart,
      color: "text-red-600"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenParishGuide', 'true');
    setIsOpen(false);
  };

  const handleSkip = () => {
    handleClose();
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Guide du Visiteur</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Étape {currentStep + 1} sur {steps.length}
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center`}>
                <StepIcon className={`w-10 h-10 ${currentStepData.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800">
                {currentStepData.title}
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 py-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-church-blue'
                  : index < currentStep
                  ? 'w-2 bg-church-blue/50'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Précédent
          </Button>

          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500"
          >
            Passer
          </Button>

          <Button
            onClick={handleNext}
            className="bg-church-blue hover:bg-church-blue/90 flex items-center"
          >
            {currentStep === steps.length - 1 ? (
              'Terminer'
            ) : (
              <>
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorGuide;
