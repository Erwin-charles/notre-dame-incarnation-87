
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User,
  Users,
  Book,
  Calendar,
  Church
} from 'lucide-react';

const DashboardPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'catechiste',
      title: 'Catéchiste',
      icon: Book,
      color: 'bg-green-100 text-green-700',
      description: 'Accès à votre espace d\'enseignement'
    },
    {
      id: 'catechumene',
      title: 'Catéchumène',
      icon: User,
      color: 'bg-blue-100 text-blue-700',
      description: 'Suivi de votre parcours de foi'
    },
    {
      id: 'parent',
      title: 'Parent',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      description: 'Suivi de vos enfants'
    },
    {
      id: 'cure',
      title: 'Curé',
      icon: Church,
      color: 'bg-orange-100 text-orange-700',
      description: 'Gestion paroissiale complète'
    },
    {
      id: 'aumonier',
      title: 'Aumônier',
      icon: Calendar,
      color: 'bg-pink-100 text-pink-700',
      description: 'Coordination des activités'
    }
  ];

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'catechiste':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord - Catéchiste</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mes Groupes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">CE1-CE2 (12 enfants)</div>
                    <div className="p-2 bg-gray-50 rounded">CM1-CM2 (8 enfants)</div>
                  </div>
                  <Button className="w-full mt-4" size="sm">Voir les détails</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prochaines Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Mercredi 14h - CE1-CE2</div>
                    <div className="text-sm">Samedi 10h - CM1-CM2</div>
                  </div>
                  <Button className="w-full mt-4" size="sm" variant="outline">Préparer les cours</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ressources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm" variant="outline">Fiches pédagogiques</Button>
                    <Button className="w-full" size="sm" variant="outline">Supports liturgiques</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'catechumene':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord - Catéchumène</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mon Parcours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Initiation</span>
                      <span className="text-green-600 font-semibold">Terminé</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Approfondissement</span>
                      <span className="text-blue-600 font-semibold">En cours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Préparation Baptême</span>
                      <span className="text-gray-400">À venir</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prochains RDV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Samedi 16h - Entretien avec le Père Antoine</div>
                    <div className="text-sm">Dimanche 15h - Rencontre de groupe</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'parent':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord - Parent</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mes Enfants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-semibold">Emma (8 ans)</div>
                      <div className="text-sm text-gray-600">CE1-CE2 - Catéchiste: Mme Dubois</div>
                      <div className="text-sm text-green-600">Prochaine session: Mercredi 14h</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="font-semibold">Lucas (10 ans)</div>
                      <div className="text-sm text-gray-600">CM1-CM2 - Catéchiste: M. Martin</div>
                      <div className="text-sm text-green-600">Prochaine session: Samedi 10h</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Communications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm p-2 bg-blue-50 rounded">Sortie prévue le 15 juin</div>
                    <div className="text-sm p-2 bg-yellow-50 rounded">Réunion parents le 20 mai</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'cure':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord - Curé</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Catéchistes</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Catéchumènes</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Familles inscrites</span>
                      <span className="font-semibold">120</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activités à valider</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm" variant="outline">Sortie catéchèse (3)</Button>
                    <Button className="w-full" size="sm" variant="outline">Demandes baptême (2)</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gestion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">Gérer les catéchistes</Button>
                    <Button className="w-full" size="sm" variant="outline">Planning global</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case 'aumonier':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord - Aumônier</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Coordination</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">Planning des catéchistes</Button>
                    <Button className="w-full" size="sm" variant="outline">Formations à organiser</Button>
                    <Button className="w-full" size="sm" variant="outline">Ressources pédagogiques</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activités en cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm p-2 bg-green-50 rounded">Formation catéchistes - En cours</div>
                    <div className="text-sm p-2 bg-blue-50 rounded">Préparation retraite - Planifié</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        {!selectedRole ? (
          <>
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <User className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Mon Espace Personnel
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choisissez votre profil pour accéder à votre tableau de bord personnalisé
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <Card 
                    key={role.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${role.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <CardDescription>
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Accéder à mon espace
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedRole(null)}
                className="mb-4"
              >
                ← Retour à la sélection
              </Button>
            </div>
            {renderDashboard()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
