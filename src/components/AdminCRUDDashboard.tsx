import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Users, 
  UserCog, 
  MessageSquare, 
  CreditCard, 
  Calendar,
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Filter,
  Search,
  Download,
  Eye,
  Church,
  BookOpen,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  nom?: string;
  prenom?: string;
  email: string;
  telephone?: string;
  role?: string;
  created_at: string;
}

interface Activity {
  id: string;
  titre: string;
  description?: string;
  date_activite: string;
  heure_debut?: string;
  heure_fin?: string;
  lieu?: string;
  places_disponibles?: number;
}

interface LiturgicalEvent {
  id: string;
  titre: string;
  description?: string;
  date_evenement: string;
  heure_debut?: string;
  heure_fin?: string;
  lieu?: string;
  type_evenement?: string;
}

const AdminCRUDDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [liturgicalEvents, setLiturgicalEvents] = useState<LiturgicalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [newUser, setNewUser] = useState({
    nom: '', prenom: '', email: '', telephone: '', role: 'user'
  });

  const [newActivity, setNewActivity] = useState({
    titre: '', description: '', date_activite: '', heure_debut: '', 
    heure_fin: '', lieu: '', places_disponibles: 0
  });

  const [newLiturgicalEvent, setNewLiturgicalEvent] = useState({
    titre: '', description: '', date_evenement: '', heure_debut: '', 
    heure_fin: '', lieu: '', type_evenement: 'messe'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, activitiesData, eventsData] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('activites').select('*').order('date_activite', { ascending: false }),
        supabase.from('evenements_liturgiques').select('*').order('date_evenement', { ascending: false })
      ]);

      if (usersData.data) setUsers(usersData.data);
      if (activitiesData.data) setActivities(activitiesData.data);
      if (eventsData.data) setLiturgicalEvents(eventsData.data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: 'TempPassword123!', // Temporary password, user should change it
        user_metadata: {
          nom: newUser.nom,
          prenom: newUser.prenom,
          telephone: newUser.telephone
        }
      });

      if (authError) throw authError;

      // Then create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: authData.user.id,
          email: newUser.email,
          nom: newUser.nom,
          prenom: newUser.prenom,
          telephone: newUser.telephone,
          role: newUser.role
        });

      if (profileError) throw profileError;

      toast({
        title: "Succès",
        description: "Utilisateur créé avec succès. Mot de passe temporaire : TempPassword123!",
      });

      setNewUser({ nom: '', prenom: '', email: '', telephone: '', role: 'user' });
      setIsCreateDialogOpen(false);
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur",
        variant: "destructive"
      });
    }
  };

  const handleCreateActivity = async () => {
    try {
      const { error } = await supabase
        .from('activites')
        .insert(newActivity);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Activité créée avec succès",
      });

      setNewActivity({
        titre: '', description: '', date_activite: '', heure_debut: '', 
        heure_fin: '', lieu: '', places_disponibles: 0
      });
      setIsCreateDialogOpen(false);
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'activité",
        variant: "destructive"
      });
    }
  };

  const handleCreateLiturgicalEvent = async () => {
    try {
      const { error } = await supabase
        .from('evenements_liturgiques')
        .insert(newLiturgicalEvent);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Événement liturgique créé avec succès",
      });

      setNewLiturgicalEvent({
        titre: '', description: '', date_evenement: '', heure_debut: '', 
        heure_fin: '', lieu: '', type_evenement: 'messe'
      });
      setIsCreateDialogOpen(false);
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'événement liturgique",
        variant: "destructive"
      });
    }
  };

  const handleUpdateItem = async (tableName: 'profiles' | 'activites' | 'evenements_liturgiques', id: string, data: any) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Élément mis à jour avec succès",
      });

      setIsEditDialogOpen(false);
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'élément",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (tableName: 'profiles' | 'activites' | 'evenements_liturgiques', id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Élément supprimé avec succès",
      });

      loadData();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const renderCreateDialog = () => {
    if (activeTab === 'users') {
      return (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Ajouter un nouvel utilisateur au système
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={newUser.nom}
                  onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={newUser.prenom}
                  onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={newUser.telephone}
                  onChange={(e) => setNewUser({...newUser, telephone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="role">Rôle</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="catechist">Catéchiste</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handleCreateUser}>
              <Save className="w-4 h-4 mr-2" />
              Créer
            </Button>
          </div>
        </DialogContent>
      );
    }

    if (activeTab === 'activities') {
      return (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle activité</DialogTitle>
            <DialogDescription>
              Ajouter une nouvelle activité paroissiale
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="titre">Titre de l'activité</Label>
              <Input
                id="titre"
                value={newActivity.titre}
                onChange={(e) => setNewActivity({...newActivity, titre: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date_activite">Date</Label>
                <Input
                  id="date_activite"
                  type="date"
                  value={newActivity.date_activite}
                  onChange={(e) => setNewActivity({...newActivity, date_activite: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="heure_debut">Heure début</Label>
                <Input
                  id="heure_debut"
                  type="time"
                  value={newActivity.heure_debut}
                  onChange={(e) => setNewActivity({...newActivity, heure_debut: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="heure_fin">Heure fin</Label>
                <Input
                  id="heure_fin"
                  type="time"
                  value={newActivity.heure_fin}
                  onChange={(e) => setNewActivity({...newActivity, heure_fin: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lieu">Lieu</Label>
                <Input
                  id="lieu"
                  value={newActivity.lieu}
                  onChange={(e) => setNewActivity({...newActivity, lieu: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="places_disponibles">Places disponibles</Label>
                <Input
                  id="places_disponibles"
                  type="number"
                  value={newActivity.places_disponibles}
                  onChange={(e) => setNewActivity({...newActivity, places_disponibles: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handleCreateActivity}>
              <Save className="w-4 h-4 mr-2" />
              Créer
            </Button>
          </div>
        </DialogContent>
      );
    }

    if (activeTab === 'liturgical') {
      return (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un événement liturgique</DialogTitle>
            <DialogDescription>
              Ajouter un nouvel événement liturgique au calendrier
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="titre">Titre de l'événement</Label>
              <Input
                id="titre"
                value={newLiturgicalEvent.titre}
                onChange={(e) => setNewLiturgicalEvent({...newLiturgicalEvent, titre: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newLiturgicalEvent.description}
                onChange={(e) => setNewLiturgicalEvent({...newLiturgicalEvent, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type_evenement">Type d'événement</Label>
                <Select value={newLiturgicalEvent.type_evenement} onValueChange={(value) => setNewLiturgicalEvent({...newLiturgicalEvent, type_evenement: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="messe">Messe</SelectItem>
                    <SelectItem value="adoration">Adoration</SelectItem>
                    <SelectItem value="confession">Confession</SelectItem>
                    <SelectItem value="celebration">Célébration</SelectItem>
                    <SelectItem value="fete">Fête liturgique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date_evenement">Date</Label>
                <Input
                  id="date_evenement"
                  type="date"
                  value={newLiturgicalEvent.date_evenement}
                  onChange={(e) => setNewLiturgicalEvent({...newLiturgicalEvent, date_evenement: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="heure_debut">Heure début</Label>
                <Input
                  id="heure_debut"
                  type="time"
                  value={newLiturgicalEvent.heure_debut}
                  onChange={(e) => setNewLiturgicalEvent({...newLiturgicalEvent, heure_debut: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="heure_fin">Heure fin</Label>
                <Input
                  id="heure_fin"
                  type="time"
                  value={newLiturgicalEvent.heure_fin}
                  onChange={(e) => setNewLiturgicalEvent({...newLiturgicalEvent, heure_fin: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lieu">Lieu</Label>
                <Input
                  id="lieu"
                  value={newLiturgicalEvent.lieu}
                  onChange={(e) => setNewLiturgicalEvent({...newLiturgicalEvent, lieu: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handleCreateLiturgicalEvent}>
              <Save className="w-4 h-4 mr-2" />
              Créer
            </Button>
          </div>
        </DialogContent>
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user => 
    user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredActivities = activities.filter(activity => 
    activity.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = liturgicalEvents.filter(event => 
    event.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Church className="h-8 w-8 text-primary" />
          Administration Paroissiale
        </h1>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Paramètres
        </Button>
      </div>

      {/* Barre de recherche globale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans toutes les données..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="activities">
            <Calendar className="w-4 h-4 mr-2" />
            Activités
          </TabsTrigger>
          <TabsTrigger value="liturgical">
            <Church className="w-4 h-4 mr-2" />
            Liturgie
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <BookOpen className="w-4 h-4 mr-2" />
            Statistiques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gestion des Utilisateurs</h2>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setActiveTab('users')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel utilisateur
                </Button>
              </DialogTrigger>
              {renderCreateDialog()}
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Utilisateurs ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Date création</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.prenom} {user.nom}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.telephone || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role || 'user'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer {user.prenom} {user.nom} ?
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem('profiles', user.id)}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gestion des Activités</h2>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setActiveTab('activities')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle activité
                </Button>
              </DialogTrigger>
              {renderCreateDialog()}
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Activités ({filteredActivities.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Horaire</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Places</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.titre}</TableCell>
                      <TableCell>
                        {new Date(activity.date_activite).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        {activity.heure_debut && activity.heure_fin 
                          ? `${activity.heure_debut} - ${activity.heure_fin}`
                          : activity.heure_debut || 'N/A'
                        }
                      </TableCell>
                      <TableCell>{activity.lieu || 'N/A'}</TableCell>
                      <TableCell>{activity.places_disponibles || 'Illimité'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(activity)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer l'activité</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer "{activity.titre}" ?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem('activites', activity.id)}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liturgical" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gestion des Événements Liturgiques</h2>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setActiveTab('liturgical')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              {renderCreateDialog()}
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Événements Liturgiques ({filteredEvents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Horaire</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.titre}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {event.type_evenement}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(event.date_evenement).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        {event.heure_debut && event.heure_fin 
                          ? `${event.heure_debut} - ${event.heure_fin}`
                          : event.heure_debut || 'N/A'
                        }
                      </TableCell>
                      <TableCell>{event.lieu || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(event)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer l'événement</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer "{event.titre}" ?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteItem('evenements_liturgiques', event.id)}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <h2 className="text-2xl font-semibold">Statistiques Générales</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activités</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activities.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Événements Liturgiques</CardTitle>
                <Church className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{liturgicalEvents.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Activités ce mois</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {activities.filter(a => 
                    new Date(a.date_activite).getMonth() === new Date().getMonth()
                  ).length}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCRUDDashboard;