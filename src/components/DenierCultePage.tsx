
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Euro, Users, TrendingUp, Calendar, Plus, Download } from 'lucide-react';
import PageParticles from './PageParticles';
import { useToast } from '@/hooks/use-toast';

const DenierCultePage = () => {
  const [newContribution, setNewContribution] = useState({
    parishioner: '',
    amount: '',
    month: '',
    year: new Date().getFullYear()
  });
  const { toast } = useToast();

  const handleAddContribution = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Contribution ajoutée",
      description: "La contribution au denier de culte a été enregistrée.",
    });
    setNewContribution({ parishioner: '', amount: '', month: '', year: new Date().getFullYear() });
  };

  const contributions = [
    { id: 1, parishioner: "Jean KOUASSI", amount: 50000, month: "Décembre", year: 2024, date: "15/12/2024" },
    { id: 2, parishioner: "Marie KONE", amount: 75000, month: "Décembre", year: 2024, date: "10/12/2024" },
    { id: 3, parishioner: "Emmanuel YAO", amount: 100000, month: "Décembre", year: 2024, date: "08/12/2024" },
    { id: 4, parishioner: "Aya KOUASSI", amount: 25000, month: "Novembre", year: 2024, date: "28/11/2024" },
    { id: 5, parishioner: "Joseph OUATTARA", amount: 60000, month: "Novembre", year: 2024, date: "25/11/2024" },
  ];

  const totalCurrentMonth = contributions
    .filter(c => c.month === "Décembre" && c.year === 2024)
    .reduce((sum, c) => sum + c.amount, 0);

  const totalCurrentYear = contributions
    .filter(c => c.year === 2024)
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 relative">
      <PageParticles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Carnet Informatique - Denier de Culte</h1>
          <p className="text-xl text-muted-foreground">Gestion des contributions paroissiales</p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ce mois</p>
                  <p className="text-2xl font-bold text-primary">{totalCurrentMonth.toLocaleString()} F</p>
                </div>
                <Euro className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cette année</p>
                  <p className="text-2xl font-bold text-green-600">{totalCurrentYear.toLocaleString()} F</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Contributeurs</p>
                  <p className="text-2xl font-bold text-blue-600">{contributions.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Moyenne</p>
                  <p className="text-2xl font-bold text-orange-600">{Math.round(totalCurrentYear / contributions.length).toLocaleString()} F</p>
                </div>
                <Calculator className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="view" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="view">Consultations</TabsTrigger>
            <TabsTrigger value="add">Ajouter</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <Card className="glass-card border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-primary">Contributions Enregistrées</CardTitle>
                <CardDescription>Liste des contributions au denier de culte</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paroissien</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributions.map((contribution) => (
                      <TableRow key={contribution.id}>
                        <TableCell className="font-medium">{contribution.parishioner}</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          {contribution.amount.toLocaleString()} F CFA
                        </TableCell>
                        <TableCell>{contribution.month} {contribution.year}</TableCell>
                        <TableCell>{contribution.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card className="glass-card border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-primary">Ajouter une Contribution</CardTitle>
                <CardDescription>Enregistrer un nouveau paiement du denier de culte</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddContribution} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parishioner">Nom du Paroissien *</Label>
                      <Input
                        id="parishioner"
                        value={newContribution.parishioner}
                        onChange={(e) => setNewContribution(prev => ({ ...prev, parishioner: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Montant (F CFA) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newContribution.amount}
                        onChange={(e) => setNewContribution(prev => ({ ...prev, amount: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="month">Mois *</Label>
                      <Input
                        id="month"
                        value={newContribution.month}
                        onChange={(e) => setNewContribution(prev => ({ ...prev, month: e.target.value }))}
                        placeholder="Ex: Décembre"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Année *</Label>
                      <Input
                        id="year"
                        type="number"
                        value={newContribution.year}
                        onChange={(e) => setNewContribution(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Enregistrer la Contribution
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid gap-6">
              <Card className="glass-card border-white/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-primary">Rapports Financiers</CardTitle>
                  <CardDescription>Génération de rapports pour le denier de culte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col">
                      <Calendar className="w-6 h-6 mb-2" />
                      <span>Rapport Mensuel</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col">
                      <TrendingUp className="w-6 h-6 mb-2" />
                      <span>Rapport Annuel</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col">
                      <Download className="w-6 h-6 mb-2" />
                      <span>Export Excel</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-primary">Analyse par Période</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-700">Décembre 2024</h4>
                        <p className="text-2xl font-bold text-blue-600">{totalCurrentMonth.toLocaleString()} F</p>
                        <p className="text-sm text-muted-foreground">3 contributions</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-700">Novembre 2024</h4>
                        <p className="text-2xl font-bold text-green-600">85,000 F</p>
                        <p className="text-sm text-muted-foreground">2 contributions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DenierCultePage;
