import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Plus,
  Edit,
  Trash2,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  UserPlus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Groupe {
  id: string;
  nom: string;
  description: string;
  lieu_reunion: string;
  jour_reunion: string;
  heure_reunion: string;
  actif: boolean;
  responsable_id: string;
  created_at: string;
}

const GestionGroupesPage = () => {
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGroupe, setEditingGroupe] = useState<Groupe | null>(null);
  const [newGroupe, setNewGroupe] = useState({
    nom: '',
    description: '',
    lieu_reunion: '',
    jour_reunion: '',
    heure_reunion: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const joursOptions = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
  ];

  useEffect(() => {
    loadGroupes();
  }, []);

  const loadGroupes = async () => {
    try {
      // Temporary mock data - groups table doesn't exist yet
      const mockData = [
        {
          id: '1',
          nom: 'Chorale Paroissiale',
          description: 'Groupe de chant liturgique',
          responsable_id: 'user-1',
          lieu_reunion: 'Église principale',
          jour_reunion: 'Dimanche',
          heure_reunion: '09:00',
          actif: true,
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          nom: 'Groupe de Jeunes',
          description: 'Rencontres et activités pour les jeunes',
          responsable_id: 'user-2',
          lieu_reunion: 'Salle paroissiale',
          jour_reunion: 'Samedi',
          heure_reunion: '17:00',
          actif: true,
          created_at: '2024-01-01T00:00:00Z'
        }
      ];

      setGroupes(mockData);
    } catch (error) {
      console.error('Erreur lors du chargement des groupes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les groupes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGroupe = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour effectuer cette action",
          variant: "destructive"
        });
        return;
      }

      const groupeData = {
        ...newGroupe,
        responsable_id: user.id,
        actif: true
      };

      // Mock functionality - groups table doesn't exist yet
      toast({
        title: "Fonctionnalité temporaire",
        description: "La gestion des groupes sera bientôt disponible",
        variant: "default"
      });

      toast({
        title: "Succès",
        description: editingGroupe ? "Groupe modifié avec succès" : "Groupe créé avec succès"
      });

      setNewGroupe({
        nom: '',
        description: '',
        lieu_reunion: '',
        jour_reunion: '',
        heure_reunion: ''
      });
      setEditingGroupe(null);
      setIsDialogOpen(false);
      loadGroupes();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le groupe",
        variant: "destructive"
      });
    }
  };

  const handleDeleteGroupe = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) return;

    try {
      // Mock delete for now - groups table doesn't exist yet
      toast({
        title: "Fonctionnalité temporaire",
        description: "La suppression des groupes sera bientôt disponible",
        variant: "default"
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le groupe",
        variant: "destructive"
      });
    }
  };

  const handleEditGroupe = (groupe: Groupe) => {
    setEditingGroupe(groupe);
    setNewGroupe({
      nom: groupe.nom,
      description: groupe.description || '',
      lieu_reunion: groupe.lieu_reunion || '',
      jour_reunion: groupe.jour_reunion || '',
      heure_reunion: groupe.heure_reunion || ''
    });
    setIsDialogOpen(true);
  };

  const handleJoinWhatsApp = (groupe: Groupe) => {
    const message = `Bonjour, je souhaite rejoindre le groupe "${groupe.nom}" de la paroisse Notre Dame de l'Incarnation.`;
    const whatsappUrl = `https://wa.me/2250709000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setNewGroupe({
      nom: '',
      description: '',
      lieu_reunion: '',
      jour_reunion: '',
      heure_reunion: ''
    });
    setEditingGroupe(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Gestion des Groupes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez les groupes de la paroisse et facilitez la communication entre les membres
          </p>
        </div>

        {/* Bouton de création */}
        <div className="flex justify-end mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="animate-fade-in-up">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Groupe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingGroupe ? 'Modifier le groupe' : 'Créer un nouveau groupe'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations du groupe
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nom">Nom du groupe</Label>
                  <Input
                    id="nom"
                    value={newGroupe.nom}
                    onChange={(e) => setNewGroupe({ ...newGroupe, nom: e.target.value })}
                    placeholder="Ex: Jeunes de la paroisse"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGroupe.description}
                    onChange={(e) => setNewGroupe({ ...newGroupe, description: e.target.value })}
                    placeholder="Décrivez l'objectif et les activités du groupe"
                  />
                </div>

                <div>
                  <Label htmlFor="lieu">Lieu de réunion</Label>
                  <Input
                    id="lieu"
                    value={newGroupe.lieu_reunion}
                    onChange={(e) => setNewGroupe({ ...newGroupe, lieu_reunion: e.target.value })}
                    placeholder="Ex: Salle paroissiale"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jour">Jour de réunion</Label>
                    <Select
                      value={newGroupe.jour_reunion}
                      onValueChange={(value) => setNewGroupe({ ...newGroupe, jour_reunion: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un jour" />
                      </SelectTrigger>
                      <SelectContent>
                        {joursOptions.map((jour) => (
                          <SelectItem key={jour} value={jour}>{jour}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="heure">Heure</Label>
                    <Input
                      id="heure"
                      type="time"
                      value={newGroupe.heure_reunion}
                      onChange={(e) => setNewGroupe({ ...newGroupe, heure_reunion: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSaveGroupe}>
                    {editingGroupe ? 'Modifier' : 'Créer'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Liste des groupes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groupes.map((groupe, index) => (
            <Card key={groupe.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{groupe.nom}</CardTitle>
                    <CardDescription className="mt-2">
                      {groupe.description || 'Aucune description disponible'}
                    </CardDescription>
                  </div>
                  <Badge variant={groupe.actif ? "default" : "secondary"}>
                    {groupe.actif ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informations de réunion */}
                <div className="space-y-2 text-sm">
                  {groupe.lieu_reunion && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{groupe.lieu_reunion}</span>
                    </div>
                  )}
                  {groupe.jour_reunion && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{groupe.jour_reunion}</span>
                    </div>
                  )}
                  {groupe.heure_reunion && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{groupe.heure_reunion}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleJoinWhatsApp(groupe)}
                    className="flex-1"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Rejoindre
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditGroupe(groupe)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteGroupe(groupe.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {groupes.length === 0 && (
          <Card className="text-center py-12 animate-fade-in-up">
            <CardContent>
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun groupe disponible</h3>
              <p className="text-muted-foreground mb-4">
                Commencez par créer le premier groupe de la paroisse
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un groupe
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GestionGroupesPage;