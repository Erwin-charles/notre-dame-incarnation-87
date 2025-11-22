import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Calendar, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface InscriptionStats {
  totalInscriptions: number;
  confirmes: number;
  enAttente: number;
  annules: number;
  tauxParticipation: number;
}

interface ActivityData {
  activite: string;
  inscriptions: number;
  type: string;
}

interface MonthlyData {
  mois: string;
  inscriptions: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--destructive))', 'hsl(var(--muted))'];

const StatistiquesInscriptionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<InscriptionStats>({
    totalInscriptions: 0,
    confirmes: 0,
    enAttente: 0,
    annules: 0,
    tauxParticipation: 0
  });
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      // Récupérer toutes les inscriptions
      const { data: inscriptions, error } = await supabase
        .from('inscriptions_activites')
        .select('*')
        .order('date_inscription', { ascending: false });

      if (error) throw error;

      if (inscriptions) {
        // Calculer les statistiques globales
        const total = inscriptions.length;
        const confirmes = inscriptions.filter(i => i.statut === 'confirme').length;
        const enAttente = inscriptions.filter(i => i.statut === 'en_attente').length;
        const annules = inscriptions.filter(i => i.statut === 'annule').length;
        const tauxParticipation = total > 0 ? (confirmes / total) * 100 : 0;

        setStats({
          totalInscriptions: total,
          confirmes,
          enAttente,
          annules,
          tauxParticipation
        });

        // Grouper par activité
        const activityMap = new Map<string, { count: number; type: string }>();
        inscriptions.forEach(inscription => {
          const key = inscription.activite_titre;
          if (activityMap.has(key)) {
            activityMap.get(key)!.count++;
          } else {
            activityMap.set(key, { 
              count: 1, 
              type: inscription.activite_type || 'Autre' 
            });
          }
        });

        const activities: ActivityData[] = Array.from(activityMap.entries())
          .map(([activite, data]) => ({
            activite: activite.length > 20 ? activite.substring(0, 20) + '...' : activite,
            inscriptions: data.count,
            type: data.type
          }))
          .sort((a, b) => b.inscriptions - a.inscriptions)
          .slice(0, 10);

        setActivitiesData(activities);

        // Grouper par mois
        const monthMap = new Map<string, number>();
        inscriptions.forEach(inscription => {
          const date = new Date(inscription.date_inscription);
          const monthKey = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' });
          monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
        });

        const monthly: MonthlyData[] = Array.from(monthMap.entries())
          .map(([mois, inscriptions]) => ({ mois, inscriptions }))
          .slice(-6);

        setMonthlyData(monthly);
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement des statistiques:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: 'Confirmés', value: stats.confirmes },
    { name: 'En attente', value: stats.enAttente },
    { name: 'Annulés', value: stats.annules }
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-96" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistiques des Inscriptions</h1>
          <p className="text-muted-foreground mt-1">Analyse des inscriptions aux activités paroissiales</p>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInscriptions}</div>
            <p className="text-xs text-muted-foreground">
              Toutes activités confondues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmes}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.confirmes / stats.totalInscriptions) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Participation</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tauxParticipation.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Basé sur les confirmations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enAttente}</div>
            <p className="text-xs text-muted-foreground">
              À confirmer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">Par Activité</TabsTrigger>
          <TabsTrigger value="status">Par Statut</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 des Activités</CardTitle>
              <CardDescription>Nombre d'inscriptions par activité</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={activitiesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="activite" className="text-xs" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="inscriptions" fill="hsl(var(--primary))" name="Inscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par Statut</CardTitle>
              <CardDescription>Distribution des inscriptions selon leur statut</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Inscriptions</CardTitle>
              <CardDescription>Inscriptions par mois (6 derniers mois)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="inscriptions" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Inscriptions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatistiquesInscriptionsPage;
