import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Calendar, Users, Filter, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Inscription {
  id: string;
  activite_titre: string;
  activite_type: string | null;
  activite_date: string | null;
  activite_lieu: string | null;
  date_inscription: string;
  statut: string;
  notes: string | null;
  profiles: {
    nom: string | null;
    prenom: string | null;
    email: string | null;
    telephone: string | null;
  };
}

const AdminInscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchInscriptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterType, filterStatut, inscriptions]);

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inscriptions_activites')
        .select(`
          *,
          profiles (
            nom,
            prenom,
            email,
            telephone
          )
        `)
        .order('date_inscription', { ascending: false });

      if (error) throw error;
      setInscriptions(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les inscriptions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...inscriptions];

    // Filtre de recherche
    if (searchTerm) {
      filtered = filtered.filter(inscription => 
        inscription.activite_titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.profiles?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.profiles?.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par type d'activité
    if (filterType !== 'all') {
      filtered = filtered.filter(inscription => inscription.activite_type === filterType);
    }

    // Filtre par statut
    if (filterStatut !== 'all') {
      filtered = filtered.filter(inscription => inscription.statut === filterStatut);
    }

    setFilteredInscriptions(filtered);
  };

  const updateStatut = async (id: string, newStatut: string) => {
    try {
      const { error } = await supabase
        .from('inscriptions_activites')
        .update({ statut: newStatut })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Statut mis à jour",
        description: "Le statut de l'inscription a été modifié.",
      });
      
      fetchInscriptions();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    if (filteredInscriptions.length === 0) {
      toast({
        title: "Aucune donnée",
        description: "Il n'y a pas d'inscriptions à exporter.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      'Nom',
      'Prénom',
      'Email',
      'Téléphone',
      'Activité',
      'Type',
      'Date Activité',
      'Lieu',
      'Date Inscription',
      'Statut',
      'Notes'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredInscriptions.map(inscription => [
        inscription.profiles?.nom || '',
        inscription.profiles?.prenom || '',
        inscription.profiles?.email || '',
        inscription.profiles?.telephone || '',
        inscription.activite_titre,
        inscription.activite_type || '',
        inscription.activite_date || '',
        inscription.activite_lieu || '',
        format(new Date(inscription.date_inscription), 'dd/MM/yyyy HH:mm', { locale: fr }),
        inscription.statut,
        inscription.notes || ''
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `inscriptions_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export réussi",
      description: `${filteredInscriptions.length} inscriptions exportées.`,
    });
  };

  const getStatutBadgeVariant = (statut: string) => {
    switch (statut) {
      case 'confirme':
        return 'default';
      case 'annule':
        return 'destructive';
      case 'en_attente':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const uniqueTypes = Array.from(new Set(inscriptions.map(i => i.activite_type).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Gestion des Inscriptions
          </h1>
          <p className="text-gray-600">
            Gérez toutes les inscriptions aux activités paroissiales
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Inscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inscriptions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inscriptions.filter(i => i.statut === 'confirme').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inscriptions.filter(i => i.statut === 'en_attente').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtres et Actions</CardTitle>
            <CardDescription>
              Recherchez et filtrez les inscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom, email ou activité..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Type d'activité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {uniqueTypes.map(type => (
                    <SelectItem key={type} value={type!}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={filterStatut} onValueChange={setFilterStatut}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="confirme">Confirmé</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchInscriptions}
                  title="Actualiser"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  onClick={exportToCSV}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exporter CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Liste des Inscriptions ({filteredInscriptions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">Chargement...</p>
              </div>
            ) : filteredInscriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucune inscription trouvée
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Activité</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Activité</TableHead>
                      <TableHead>Date Inscription</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions.map((inscription) => (
                      <TableRow key={inscription.id}>
                        <TableCell>
                          <div className="font-medium">
                            {inscription.profiles?.prenom} {inscription.profiles?.nom}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{inscription.profiles?.email}</div>
                            <div className="text-gray-500">{inscription.profiles?.telephone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {inscription.activite_titre}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{inscription.activite_type}</Badge>
                        </TableCell>
                        <TableCell>{inscription.activite_date}</TableCell>
                        <TableCell>
                          {format(new Date(inscription.date_inscription), 'dd/MM/yyyy', { locale: fr })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatutBadgeVariant(inscription.statut)}>
                            {inscription.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={inscription.statut}
                            onValueChange={(value) => updateStatut(inscription.id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirme">Confirmé</SelectItem>
                              <SelectItem value="en_attente">En attente</SelectItem>
                              <SelectItem value="annule">Annulé</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminInscriptionsPage;
