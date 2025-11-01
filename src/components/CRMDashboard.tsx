import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CRMDashboard = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    actifs: 0,
    inactifs: 0,
    nouveaux: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [searchTerm, profiles]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProfiles(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les profils",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: any[]) => {
    setStats({
      total: data.length,
      actifs: data.filter(p => p.role !== 'inactive').length,
      inactifs: data.filter(p => p.role === 'inactive').length,
      nouveaux: data.filter(p => {
        const createdDate = new Date(p.created_at);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return createdDate > monthAgo;
      }).length
    });
  };

  const filterProfiles = () => {
    if (!searchTerm) {
      setFilteredProfiles(profiles);
      return;
    }

    const filtered = profiles.filter(profile => 
      profile.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.telephone?.includes(searchTerm)
    );
    setFilteredProfiles(filtered);
  };

  const exportData = () => {
    const csv = [
      ['Nom', 'Prénom', 'Email', 'Téléphone', 'Date d\'inscription'],
      ...filteredProfiles.map(p => [
        p.nom || '',
        p.prenom || '',
        p.email || '',
        p.telephone || '',
        p.created_at ? new Date(p.created_at).toLocaleDateString() : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `paroissiens-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: "Les données ont été exportées",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">CRM Paroissial</h2>
          <p className="text-muted-foreground">Gestion de la relation avec les paroissiens</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Nouveau contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paroissiens</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.actifs}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux (30j)</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.nouveaux}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactifs</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.inactifs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Paroissiens</CardTitle>
          <CardDescription>Recherchez et gérez les contacts de la paroisse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          <div className="space-y-4">
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun paroissien trouvé
              </div>
            ) : (
              filteredProfiles.map((profile) => (
                <Card key={profile.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-semibold text-primary">
                            {profile.prenom?.[0]}{profile.nom?.[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {profile.prenom} {profile.nom}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {profile.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {profile.email}
                              </div>
                            )}
                            {profile.telephone && (
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {profile.telephone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {profile.role || 'member'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMDashboard;
