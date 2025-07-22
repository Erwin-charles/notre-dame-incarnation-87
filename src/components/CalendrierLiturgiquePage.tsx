import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, Plus, Download, Church, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageParticles from "./PageParticles";

interface Celebration {
  id: string;
  date_celebration: string;
  nom_celebration: string;
  type_celebration: string;
  couleur_liturgique: string;
  description: string;
  readings: string[];
}

const CalendrierLiturgiquePage = () => {
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCelebration, setSelectedCelebration] = useState<Celebration | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [newCelebration, setNewCelebration] = useState({
    nom_celebration: '',
    type_celebration: '',
    couleur_liturgique: '',
    description: '',
    readings: [] as string[]
  });

  useEffect(() => {
    fetchCelebrations();
  }, []);

  const fetchCelebrations = async () => {
    try {
      const { data, error } = await supabase
        .from('calendrier_liturgique')
        .select('*')
        .order('date_celebration', { ascending: true });

      if (error) throw error;
      setCelebrations(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement du calendrier:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le calendrier liturgique",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCelebrationForDate = (date: Date) => {
    return celebrations.find(cel => 
      format(parseISO(cel.date_celebration), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getColorClass = (couleur: string) => {
    const colorMap = {
      'blanc': 'bg-white text-black border-gray-300',
      'rouge': 'bg-red-500 text-white',
      'vert': 'bg-green-500 text-white',
      'violet': 'bg-purple-500 text-white',
      'rose': 'bg-pink-500 text-white',
      'noir': 'bg-black text-white'
    };
    return colorMap[couleur as keyof typeof colorMap] || 'bg-gray-500 text-white';
  };

  const getTypeIcon = (type: string) => {
    const iconMap = {
      'avent': '🕯️',
      'careme': '✝️',
      'paques': '🐣',
      'pentecote': '🔥',
      'ordinaire': '📖',
      'fete_patronale': '🎉',
      'messe_chrismale': '⚡',
      'veillee_pascale': '🌟'
    };
    return iconMap[type as keyof typeof iconMap] || '📅';
  };

  const handleAddCelebration = async () => {
    if (!selectedDate || !newCelebration.nom_celebration || !newCelebration.type_celebration) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('calendrier_liturgique')
        .insert({
          date_celebration: format(selectedDate, 'yyyy-MM-dd'),
          ...newCelebration
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Célébration ajoutée au calendrier liturgique",
      });

      setIsAddDialogOpen(false);
      setNewCelebration({
        nom_celebration: '',
        type_celebration: '',
        couleur_liturgique: '',
        description: '',
        readings: []
      });
      fetchCelebrations();
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la célébration",
        variant: "destructive",
      });
    }
  };

  const exportToIcal = () => {
    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Paroisse//Calendrier Liturgique//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      ...celebrations.map(cel => [
        'BEGIN:VEVENT',
        `UID:${cel.id}@paroisse.local`,
        `DTSTART;VALUE=DATE:${cel.date_celebration.replace(/-/g, '')}`,
        `SUMMARY:${cel.nom_celebration}`,
        `DESCRIPTION:${cel.description || ''}`,
        `CATEGORIES:${cel.type_celebration}`,
        'END:VEVENT'
      ]).flat(),
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icalContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendrier-liturgique.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const celebrationToday = selectedDate ? getCelebrationForDate(selectedDate) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative">
      <PageParticles />
      
      <div className="container mx-auto p-6 space-y-6 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <Church className="h-8 w-8" />
              Calendrier Liturgique
            </h1>
            <p className="text-muted-foreground">
              Temps forts et célébrations de l'année liturgique
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une célébration
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Nouvelle célébration</DialogTitle>
                  <DialogDescription>
                    Ajouter une célébration au calendrier liturgique
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nom">Nom de la célébration</Label>
                    <Input
                      id="nom"
                      value={newCelebration.nom_celebration}
                      onChange={(e) => setNewCelebration({
                        ...newCelebration,
                        nom_celebration: e.target.value
                      })}
                      placeholder="Ex: Dimanche des Rameaux"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Type de célébration</Label>
                    <Select 
                      value={newCelebration.type_celebration}
                      onValueChange={(value) => setNewCelebration({
                        ...newCelebration,
                        type_celebration: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="avent">Avent</SelectItem>
                        <SelectItem value="careme">Carême</SelectItem>
                        <SelectItem value="paques">Pâques</SelectItem>
                        <SelectItem value="pentecote">Pentecôte</SelectItem>
                        <SelectItem value="ordinaire">Temps ordinaire</SelectItem>
                        <SelectItem value="fete_patronale">Fête patronale</SelectItem>
                        <SelectItem value="messe_chrismale">Messe chrismale</SelectItem>
                        <SelectItem value="veillee_pascale">Veillée pascale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="couleur">Couleur liturgique</Label>
                    <Select 
                      value={newCelebration.couleur_liturgique}
                      onValueChange={(value) => setNewCelebration({
                        ...newCelebration,
                        couleur_liturgique: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une couleur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blanc">Blanc</SelectItem>
                        <SelectItem value="rouge">Rouge</SelectItem>
                        <SelectItem value="vert">Vert</SelectItem>
                        <SelectItem value="violet">Violet</SelectItem>
                        <SelectItem value="rose">Rose</SelectItem>
                        <SelectItem value="noir">Noir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCelebration.description}
                      onChange={(e) => setNewCelebration({
                        ...newCelebration,
                        description: e.target.value
                      })}
                      placeholder="Description de la célébration..."
                    />
                  </div>

                  <Button onClick={handleAddCelebration} className="w-full">
                    Ajouter la célébration
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={exportToIcal}>
              <Download className="h-4 w-4 mr-2" />
              Export iCal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
                <CardDescription>
                  Cliquez sur une date pour voir les célébrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={fr}
                  className="rounded-md border"
                  modifiers={{
                    celebration: (date) => !!getCelebrationForDate(date)
                  }}
                  modifiersStyles={{
                    celebration: { 
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {celebrationToday && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Célébration du jour
                  </CardTitle>
                  <CardDescription>
                    {selectedDate && format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(celebrationToday.type_celebration)}</span>
                    <h3 className="font-semibold">{celebrationToday.nom_celebration}</h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="outline">{celebrationToday.type_celebration}</Badge>
                    {celebrationToday.couleur_liturgique && (
                      <Badge className={getColorClass(celebrationToday.couleur_liturgique)}>
                        {celebrationToday.couleur_liturgique}
                      </Badge>
                    )}
                  </div>

                  {celebrationToday.description && (
                    <p className="text-sm text-muted-foreground">
                      {celebrationToday.description}
                    </p>
                  )}

                  {celebrationToday.readings && celebrationToday.readings.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Lectures du jour:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {celebrationToday.readings.map((reading, index) => (
                          <li key={index}>• {reading}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Prochaines célébrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {celebrations
                    .filter(cel => new Date(cel.date_celebration) >= new Date())
                    .slice(0, 5)
                    .map((celebration) => (
                      <div key={celebration.id} className="flex items-center gap-3 p-2 rounded border">
                        <span className="text-lg">{getTypeIcon(celebration.type_celebration)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{celebration.nom_celebration}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(parseISO(celebration.date_celebration), 'dd MMMM yyyy', { locale: fr })}
                          </p>
                        </div>
                        {celebration.couleur_liturgique && (
                          <div 
                            className={`w-3 h-3 rounded-full ${getColorClass(celebration.couleur_liturgique)}`}
                            title={celebration.couleur_liturgique}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendrierLiturgiquePage;