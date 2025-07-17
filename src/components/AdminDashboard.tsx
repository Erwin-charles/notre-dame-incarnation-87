import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  UserCog, 
  MessageSquare, 
  CreditCard, 
  Calendar,
  Settings,
  TrendingUp,
  Bell
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    catechistes: 0,
    catechumenes: 0,
    pendingInscriptions: 0,
    totalPayments: 0,
    unreadMessages: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques
      const [
        profilesCount,
        catechistesCount, 
        catechumenesCount,
        pendingCount,
        paymentsSum,
        messagesCount
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('catechistes').select('id', { count: 'exact' }).eq('actif', true),
        supabase.from('catechumenes').select('id', { count: 'exact' }),
        supabase.from('catechumenes').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('payments').select('montant').eq('status', 'completed'),
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('traite', false)
      ]);

      const totalPayments = paymentsSum.data?.reduce((sum, payment) => sum + Number(payment.montant), 0) || 0;

      setStats({
        totalUsers: profilesCount.count || 0,
        catechistes: catechistesCount.count || 0,
        catechumenes: catechumenesCount.count || 0,
        pendingInscriptions: pendingCount.count || 0,
        totalPayments,
        unreadMessages: messagesCount.count || 0
      });

      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du tableau de bord",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de Bord Administrateur</h1>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Paramètres
        </Button>
      </div>

      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Utilisateurs"
          value={stats.totalUsers}
          icon={Users}
          trend="+20.1% ce mois"
        />
        <StatCard
          title="Catéchistes Actifs"
          value={stats.catechistes}
          icon={UserCog}
        />
        <StatCard
          title="Catéchumènes"
          value={stats.catechumenes}
          icon={Users}
        />
        <StatCard
          title="Inscriptions en Attente"
          value={stats.pendingInscriptions}
          icon={Bell}
        />
        <StatCard
          title="Total Paiements"
          value={`${stats.totalPayments.toLocaleString()} FCFA`}
          icon={CreditCard}
        />
        <StatCard
          title="Messages Non Lus"
          value={stats.unreadMessages}
          icon={MessageSquare}
        />
      </div>

      {/* Onglets de gestion */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="inscriptions">Inscriptions</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Utilisateurs</CardTitle>
              <CardDescription>
                Gérez les rôles et permissions des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Utilisateurs Récents</h3>
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Fonctionnalité en cours de développement...
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inscriptions en Attente</CardTitle>
              <CardDescription>
                Validez ou rejetez les nouvelles inscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {stats.pendingInscriptions === 0 
                  ? "Aucune inscription en attente"
                  : `${stats.pendingInscriptions} inscription(s) en attente de validation`
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Paiements</CardTitle>
              <CardDescription>
                Suivez et gérez les paiements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Total des paiements reçus : {stats.totalPayments.toLocaleString()} FCFA
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages de Contact</CardTitle>
              <CardDescription>
                Répondez aux messages des paroissiens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {stats.unreadMessages === 0 
                  ? "Tous les messages ont été traités"
                  : `${stats.unreadMessages} message(s) non lu(s)`
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Événements</CardTitle>
              <CardDescription>
                Créez et gérez les événements paroissiaux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Créer un Événement
                </Button>
                <div className="text-sm text-muted-foreground">
                  Fonctionnalité en cours de développement...
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;