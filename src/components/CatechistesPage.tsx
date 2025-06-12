import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Calendar, Award, Heart } from 'lucide-react';
import PageParticles from './PageParticles';

const CatechistesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 relative">
      <PageParticles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Équipe des Catéchistes</h1>
          <p className="text-xl text-muted-foreground">Serviteurs de la Parole au service de la communauté</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Mission des catéchistes */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les catéchistes de Notre Dame de l'Incarnation ont pour mission d'accompagner 
                enfants et adultes dans leur découverte et approfondissement de la foi chrétienne.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-primary" />Enseignement de la doctrine chrétienne</li>
                <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary" />Accompagnement personnel et communautaire</li>
                <li className="flex items-center"><Award className="w-4 h-4 mr-2 text-primary" />Préparation aux sacrements</li>
                <li className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" />Animation de retraites et récollections</li>
              </ul>
            </CardContent>
          </Card>

          {/* Formation continue */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Formation Continue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nos catéchistes bénéficient d'une formation régulière pour mieux servir la communauté.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-foreground">Sessions mensuelles</h4>
                  <p className="text-sm text-muted-foreground">Premier samedi de chaque mois - 9h00 à 12h00</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-foreground">Retraite annuelle</h4>
                  <p className="text-sm text-muted-foreground">3 jours de formation spirituelle et pédagogique</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-foreground">Accompagnement spirituel</h4>
                  <p className="text-sm text-muted-foreground">Rencontres individuelles avec le curé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Équipe des catéchistes */}
        <Card className="glass-card border-white/20 dark:border-gray-700/20 mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Notre Équipe</CardTitle>
            <CardDescription>Rencontrez nos catéchistes dévoués</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Marie KONE</h3>
                <p className="text-sm text-muted-foreground">Responsable Catéchèse</p>
                <p className="text-xs text-muted-foreground mt-1">15 ans d'expérience</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Joseph OUATTARA</h3>
                <p className="text-sm text-muted-foreground">Catéchiste Adultes</p>
                <p className="text-xs text-muted-foreground mt-1">12 ans d'expérience</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Aya KOUASSI</h3>
                <p className="text-sm text-muted-foreground">Catéchiste Enfants</p>
                <p className="text-xs text-muted-foreground mt-1">8 ans d'expérience</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Emmanuel YAO</h3>
                <p className="text-sm text-muted-foreground">Catéchiste Jeunes</p>
                <p className="text-xs text-muted-foreground mt-1">5 ans d'expérience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Devenir catéchiste */}
        <Card className="glass-card border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="text-primary">Devenir Catéchiste</CardTitle>
            <CardDescription>Rejoignez notre équipe de formation chrétienne</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Conditions requises</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Être baptisé et confirmé</li>
                  <li>• Avoir une pratique religieuse régulière</li>
                  <li>• Être disponible pour la formation et l'enseignement</li>
                  <li>• Avoir le sens de l'écoute et de la pédagogie</li>
                  <li>• Être recommandé par le curé de la paroisse</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Formation initiale</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 6 mois de formation théologique de base</li>
                  <li>• Initiation à la pédagogie catéchétique</li>
                  <li>• Stage pratique d'accompagnement</li>
                  <li>• Évaluation et validation par l'équipe</li>
                </ul>
                <Button className="mt-4 glass-button">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Postuler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CatechistesPage;
