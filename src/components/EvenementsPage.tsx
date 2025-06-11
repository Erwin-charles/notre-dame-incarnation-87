
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'messe' | 'formation' | 'celebration' | 'pelerinage' | 'reunion';
  description: string;
}

const EvenementsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const events: Event[] = [
    {
      id: '1',
      title: 'Messe dominicale',
      date: new Date(2024, 11, 15),
      time: '9h00',
      location: 'Église principale',
      type: 'messe',
      description: 'Messe dominicale avec chorale paroissiale'
    },
    {
      id: '2',
      title: 'Adoration eucharistique',
      date: new Date(2024, 11, 16),
      time: '18h00',
      location: 'Chapelle du Saint-Sacrement',
      type: 'celebration',
      description: 'Heure d\'adoration silencieuse suivie de vêpres'
    },
    {
      id: '3',
      title: 'Formation catéchistes',
      date: new Date(2024, 11, 18),
      time: '9h00',
      location: 'Salle paroissiale',
      type: 'formation',
      description: 'Session de formation continue pour les catéchistes'
    },
    {
      id: '4',
      title: 'Pèlerinage à Yamoussoukro',
      date: new Date(2024, 11, 22),
      time: '5h00',
      location: 'Départ de la paroisse',
      type: 'pelerinage',
      description: 'Pèlerinage à la Basilique Notre-Dame de la Paix'
    },
    {
      id: '5',
      title: 'Réunion Conseil pastoral',
      date: new Date(2024, 11, 25),
      time: '19h00',
      location: 'Bureau paroissial',
      type: 'reunion',
      description: 'Réunion mensuelle du conseil pastoral paroissial'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'messe': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'formation': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'celebration': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pelerinage': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'reunion': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-primary/10 text-primary';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'messe': return 'Messe';
      case 'formation': return 'Formation';
      case 'celebration': return 'Célébration';
      case 'pelerinage': return 'Pèlerinage';
      case 'reunion': return 'Réunion';
      default: return type;
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const hasEventsForDate = (date: Date) => {
    return events.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Événements Paroissiaux</h1>
          <p className="text-xl text-muted-foreground">Calendrier des activités et célébrations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendrier */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Calendrier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border pointer-events-auto"
                  modifiers={{
                    hasEvents: (date) => hasEventsForDate(date)
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Liste des événements */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-primary">Événements à venir</CardTitle>
                <CardDescription>
                  {selectedDate 
                    ? `Événements du ${selectedDate.toLocaleDateString('fr-FR')}`
                    : 'Sélectionnez une date pour voir les événements'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map(event => (
                      <div key={event.id} className="p-4 border border-white/20 dark:border-gray-700/20 rounded-lg glass-button">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          <Badge className={getEventTypeColor(event.type)}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : selectedDate ? (
                    <p className="text-muted-foreground text-center py-8">
                      Aucun événement prévu pour cette date
                    </p>
                  ) : (
                    // Afficher tous les événements à venir si aucune date n'est sélectionnée
                    events.map(event => (
                      <div key={event.id} className="p-4 border border-white/20 dark:border-gray-700/20 rounded-lg glass-button">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          <Badge className={getEventTypeColor(event.type)}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {event.date.toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Types d'événements */}
        <div className="mt-8">
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary">Types d'événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Messes</h3>
                  <p className="text-xs text-blue-600 dark:text-blue-300">Célébrations eucharistiques</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Formations</h3>
                  <p className="text-xs text-green-600 dark:text-green-300">Sessions d'apprentissage</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Célébrations</h3>
                  <p className="text-xs text-yellow-600 dark:text-yellow-300">Temps de prière spéciaux</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">Pèlerinages</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-300">Voyages spirituels</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/20 rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Réunions</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Rencontres organisationnelles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EvenementsPage;
