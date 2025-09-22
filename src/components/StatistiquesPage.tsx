import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, GraduationCap, TrendingUp, Award, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Catechumene {
  id: string;
  numero_ndi: string;
  user_id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_naissance: string;
  niveau: string;
  status: string;
  parent_nom: string;
  parent_email: string;
  parent_telephone: string;
  created_at: string;
  profiles?: {
    nom: string;
    prenom: string;
  } | null;
}

interface Evaluation {
  id: string;
  catechumene_id: string;
  trimestre: number;
  niveau: string;
  note: number;
  moyenne_generale: number;
  taux_assiduite: number;
  catechumenes?: {
    numero_ndi: string;
    profiles?: {
      nom: string;
      prenom: string;
    } | null;
  } | null;
}

interface Presence {
  catechumene_id: string;
  present: boolean;
  date_cours: string;
}

const StatistiquesPage = () => {
  const [catechumenes, setCatechumenes] = useState<Catechumene[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [presences, setPresences] = useState<Presence[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnee, setSelectedAnnee] = useState('2024-2025');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [selectedAnnee]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Récupérer les catéchumènes
      const { data: catechumenesData, error: catechumenesError } = await supabase
        .from('catechumenes')
        .select('*')
        .eq('statut', 'inscrit');

      if (catechumenesError) throw catechumenesError;
      // Map database fields to interface
      const mappedCatechumenes = (catechumenesData || []).map(cat => ({
        ...cat,
        status: cat.statut, // Map statut to status for consistency with existing code
        numero_ndi: cat.id.slice(0, 8) // Mock numero_ndi from id
      }));
      setCatechumenes(mappedCatechumenes);

      // Récupérer les évaluations (mock data for now)
      const mockEvaluations = [
        { 
          id: '1', 
          catechumene_id: mappedCatechumenes[0]?.id || '1', 
          trimestre: 1, 
          niveau: 'CE1', 
          note: 15, 
          moyenne_generale: 15, 
          taux_assiduite: 85,
          catechumenes: null
        },
        { 
          id: '2', 
          catechumene_id: mappedCatechumenes[1]?.id || '2', 
          trimestre: 1, 
          niveau: 'CE2', 
          note: 12, 
          moyenne_generale: 12, 
          taux_assiduite: 90,
          catechumenes: null
        }
      ];
      setEvaluations(mockEvaluations);

      // Récupérer les présences
      // Mock data for now
      const mockPresencesData: any[] = [];
      setPresences(mockPresencesData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculs des statistiques
  const statsGenerales = {
    totalInscrits: catechumenes.length,
    parNiveau: catechumenes.reduce((acc, cat) => {
      acc[cat.niveau] = (acc[cat.niveau] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    parStatus: catechumenes.reduce((acc, cat) => {
      acc[cat.status] = (acc[cat.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const moyennesParNiveau = Object.entries(statsGenerales.parNiveau).map(([niveau, count]) => {
    const evaluationsNiveau = evaluations.filter(ev => 
      catechumenes.find(cat => cat.id === ev.catechumene_id)?.niveau === niveau
    );
    const moyenne = evaluationsNiveau.length > 0 
      ? evaluationsNiveau.reduce((sum, ev) => sum + (ev.moyenne_generale || 0), 0) / evaluationsNiveau.length
      : 0;
    
    return {
      niveau,
      inscrits: count,
      moyenne: Math.round(moyenne * 100) / 100
    };
  });

  const tauxAssiduite = catechumenes.map(cat => {
    const presencesCat = presences.filter(p => p.catechumene_id === cat.id);
    const totalCours = presencesCat.length;
    const coursPresents = presencesCat.filter(p => p.present).length;
    const taux = totalCours > 0 ? (coursPresents / totalCours) * 100 : 0;
    
    return {
      numero_ndi: cat.numero_ndi,
      nom: `${cat.profiles?.prenom} ${cat.profiles?.nom}`,
      taux: Math.round(taux)
    };
  });

  // Couleurs du design system pour les diagrammes
  const COLORS = [
    'hsl(var(--primary))',           // Bleu principal de l'église
    'hsl(var(--accent))',            // Or/jaune de l'église  
    'hsl(210, 60%, 60%)',           // Bleu clair
    'hsl(45, 80%, 70%)',            // Or clair
    'hsl(210, 50%, 75%)',           // Bleu très clair
    'hsl(0, 60%, 60%)',             // Rouge
    'hsl(120, 60%, 60%)',           // Vert
    'hsl(280, 60%, 60%)'            // Violet
  ];

  const dataParNiveau = Object.entries(statsGenerales.parNiveau).map(([niveau, count], index) => ({
    name: niveau,
    value: count,
    fill: COLORS[index % COLORS.length]
  }));

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Statistiques et Évaluations</h1>
          <p className="text-muted-foreground">Suivi des performances des catéchumènes</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedAnnee} 
            onChange={(e) => setSelectedAnnee(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsGenerales.totalInscrits}</div>
            <p className="text-xs text-muted-foreground">
              Année scolaire {selectedAnnee}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne Générale</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evaluations.length > 0 
                ? Math.round((evaluations.reduce((sum, ev) => sum + (ev.moyenne_generale || 0), 0) / evaluations.length) * 100) / 100
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Sur {evaluations.length} évaluations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {evaluations.length > 0 
                ? Math.round((evaluations.filter(ev => (ev.moyenne_generale || 0) >= 10).length / evaluations.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Moyenne ≥ 10/20
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assiduité Moyenne</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tauxAssiduite.length > 0 
                ? Math.round(tauxAssiduite.reduce((sum, t) => sum + t.taux, 0) / tauxAssiduite.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Présence aux cours
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
          <TabsTrigger value="assiduite">Assiduité</TabsTrigger>
          <TabsTrigger value="liste">Liste des inscrits</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par niveau</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataParNiveau}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataParNiveau.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moyennes par niveau</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={moyennesParNiveau}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="niveau" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="moyenne" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evaluations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Résultats détaillés par catéchumène</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluations.map((evaluation) => (
                  <div key={evaluation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-semibold">
                          {evaluation.catechumenes?.profiles?.prenom} {evaluation.catechumenes?.profiles?.nom}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          NDI: {evaluation.catechumenes?.numero_ndi} - Trimestre {evaluation.trimestre}
                        </p>
                      </div>
                      <Badge variant={evaluation.moyenne_generale >= 10 ? "default" : "destructive"}>
                        {evaluation.moyenne_generale}/20
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Assiduité:</span>
                        <span>{evaluation.taux_assiduite}%</span>
                      </div>
                      <Progress value={evaluation.taux_assiduite} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assiduite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taux d'assiduité par catéchumène</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tauxAssiduite.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">{item.nom}</span>
                      <span className="text-sm text-muted-foreground ml-2">({item.numero_ndi})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.taux} className="w-24 h-2" />
                      <Badge variant={item.taux >= 80 ? "default" : item.taux >= 60 ? "secondary" : "destructive"}>
                        {item.taux}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liste" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste complète des inscrits</CardTitle>
              <CardDescription>
                {statsGenerales.totalInscrits} catéchumènes inscrits pour l'année {selectedAnnee}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {catechumenes.map((catechumene) => (
                  <div key={catechumene.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">
                        {catechumene.profiles?.prenom} {catechumene.profiles?.nom}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({catechumene.numero_ndi})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{catechumene.niveau}</Badge>
                      <Badge variant={catechumene.status === 'active' ? "default" : "secondary"}>
                        {catechumene.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatistiquesPage;