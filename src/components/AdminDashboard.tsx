import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  UserCog, 
  MessageSquare, 
  CreditCard, 
  Calendar,
  Settings,
  TrendingUp,
  Bell,
  BookOpen,
  Award,
  Clock,
  Download
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
  
  const [catechumenesData, setCatechumenesData] = useState([]);
  const [evaluationsData, setEvaluationsData] = useState([]);
  const [presencesData, setPresencesData] = useState([]);
  const [statistiques, setStatistiques] = useState({
    parNiveau: [],
    parStatut: [],
    moyennesParNiveau: [],
    assiduiteGlobale: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques de base
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

      // Charger les données détaillées pour les statistiques avancées
      await loadAdvancedStatistics();

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

  const loadAdvancedStatistics = async () => {
    try {
      // Charger les catéchumènes avec leurs profils
      const { data: catechumenes } = await supabase
        .from('catechumenes')
        .select(`
          *,
          profiles:user_id (nom, prenom, email)
        `);

      // Charger les évaluations avec les détails des catéchumènes
      const { data: evaluations } = await supabase
        .from('evaluations_catechumenes')
        .select(`
          *,
          catechumenes:catechumene_id (
            numero_ndi,
            niveau,
            profiles:user_id (nom, prenom)
          )
        `);

      // Charger les présences
      const { data: presences } = await supabase
        .from('presences_cours')
        .select(`
          *,
          catechumenes:catechumene_id (
            numero_ndi,
            profiles:user_id (nom, prenom)
          )
        `);

      setCatechumenesData(catechumenes || []);
      setEvaluationsData(evaluations || []);
      setPresencesData(presences || []);

      // Calculer les statistiques
      calculateStatistics(catechumenes || [], evaluations || [], presences || []);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques avancées:', error);
    }
  };

  const calculateStatistics = (catechumenes, evaluations, presences) => {
    // Statistiques par niveau
    const niveauxCount = catechumenes.reduce((acc, cat) => {
      acc[cat.niveau] = (acc[cat.niveau] || 0) + 1;
      return acc;
    }, {});

    const parNiveau = Object.entries(niveauxCount).map(([niveau, count]) => ({
      niveau,
      count: count as number,
      percentage: Math.round(((count as number) / catechumenes.length) * 100)
    }));

    // Statistiques par statut
    const statutsCount = catechumenes.reduce((acc, cat) => {
      acc[cat.status] = (acc[cat.status] || 0) + 1;
      return acc;
    }, {});

    const parStatut = Object.entries(statutsCount).map(([statut, count]) => ({
      statut,
      count: count as number,
      percentage: Math.round(((count as number) / catechumenes.length) * 100)
    }));

    // Moyennes par niveau
    const moyennesParNiveau = Object.keys(niveauxCount).map(niveau => {
      const evalsDuNiveau = evaluations.filter(evaluation => 
        evaluation.catechumenes?.niveau === niveau
      );
      const moyenne = evalsDuNiveau.length > 0 
        ? evalsDuNiveau.reduce((sum, evaluation) => sum + (evaluation.moyenne_generale || 0), 0) / evalsDuNiveau.length
        : 0;
      
      return {
        niveau,
        moyenne: Math.round(moyenne * 100) / 100
      };
    });

    // Calcul de l'assiduité globale
    const totalPresences = presences.filter(p => p.present).length;
    const totalCours = presences.length;
    const assiduiteGlobale = totalCours > 0 ? Math.round((totalPresences / totalCours) * 100) : 0;

    setStatistiques({
      parNiveau,
      parStatut,
      moyennesParNiveau,
      assiduiteGlobale
    });
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Répartition par niveau */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Répartition par Niveau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statistiques.parNiveau}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ niveau, percentage }) => `${niveau} (${percentage}%)`}
                       >
                        {statistiques.parNiveau.map((entry, index) => {
                          const chartColors = [
                            'hsl(var(--primary))',
                            'hsl(var(--accent))', 
                            'hsl(210, 60%, 60%)',
                            'hsl(45, 80%, 70%)',
                            'hsl(210, 50%, 75%)',
                            'hsl(0, 60%, 60%)',
                            'hsl(120, 60%, 60%)',
                            'hsl(280, 60%, 60%)'
                          ];
                          return (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                          );
                        })}
                       </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Moyennes par niveau */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Moyennes par Niveau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statistiques.moyennesParNiveau}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="niveau" />
                      <YAxis domain={[0, 20]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="moyenne" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Liste des catéchumènes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Liste des Catéchumènes Inscrits
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Total: {catechumenesData.length}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NDI</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catechumenesData.slice(0, 10).map((catechumene) => (
                    <TableRow key={catechumene.id}>
                      <TableCell className="font-medium">{catechumene.numero_ndi}</TableCell>
                      <TableCell>
                        {catechumene.profiles ? 
                          `${catechumene.profiles.prenom} ${catechumene.profiles.nom}` : 
                          'N/A'
                        }
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{catechumene.niveau}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={catechumene.status === 'approved' ? 'default' : 'secondary'}>
                          {catechumene.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(catechumene.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inscriptions" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Assiduité globale */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Assiduité Globale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {statistiques.assiduiteGlobale}%
                    </div>
                    <p className="text-sm text-muted-foreground">Taux de présence moyen</p>
                  </div>
                  <Progress value={statistiques.assiduiteGlobale} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Répartition par statut */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Statut</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statistiques.parStatut.map((stat, index) => (
                    <div key={stat.statut} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                       <div 
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: [
                              'hsl(var(--primary))',
                              'hsl(var(--accent))', 
                              'hsl(210, 60%, 60%)',
                              'hsl(45, 80%, 70%)',
                              'hsl(0, 60%, 60%)',
                              'hsl(120, 60%, 60%)'
                            ][index % 6]
                          }}
                        />
                        <span className="capitalize">{stat.statut}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stat.count}</span>
                        <span className="text-sm text-muted-foreground">({stat.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résultats des évaluations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Résultats des Évaluations Trimestrielles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Catéchumène</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Trimestre</TableHead>
                    <TableHead>Année Scolaire</TableHead>
                    <TableHead>Moyenne Générale</TableHead>
                    <TableHead>Assiduité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluationsData.slice(0, 10).map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell>
                        {evaluation.catechumenes?.profiles ? 
                          `${evaluation.catechumenes.profiles.prenom} ${evaluation.catechumenes.profiles.nom}` : 
                          'N/A'
                        }
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{evaluation.catechumenes?.niveau}</Badge>
                      </TableCell>
                      <TableCell>T{evaluation.trimestre}</TableCell>
                      <TableCell>{evaluation.annee_scolaire}</TableCell>
                      <TableCell>
                        <Badge variant={
                          evaluation.moyenne_generale >= 16 ? 'default' :
                          evaluation.moyenne_generale >= 12 ? 'secondary' : 'destructive'
                        }>
                          {evaluation.moyenne_generale?.toFixed(2)}/20
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={evaluation.taux_assiduite || 0} 
                            className="w-16 h-2" 
                          />
                          <span className="text-sm">{evaluation.taux_assiduite?.toFixed(0)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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