import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User, Calendar } from "lucide-react";
import { toast } from "sonner";
import ParishPreloader from "./ParishPreloader";

interface Permanence {
  id: string;
  jour: string;
  heure_debut: string;
  heure_fin: string | null;
  pretre: string;
  type_permanence: string;
}

const PermanencesPage = () => {
  const [permanences, setPermanences] = useState<Permanence[]>([]);
  const [loading, setLoading] = useState(true);

  const joursOrdre = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  useEffect(() => {
    fetchPermanences();
  }, []);

  const fetchPermanences = async () => {
    try {
      const { data, error } = await supabase
        .from('permanences_peres')
        .select('*')
        .order('jour');

      if (error) throw error;
      setPermanences(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des permanences");
    } finally {
      setLoading(false);
    }
  };

  const groupByDay = () => {
    const grouped: { [key: string]: Permanence[] } = {};
    permanences.forEach(perm => {
      if (!grouped[perm.jour]) {
        grouped[perm.jour] = [];
      }
      grouped[perm.jour].push(perm);
    });
    return grouped;
  };

  if (loading) return <ParishPreloader />;

  const groupedPermanences = groupByDay();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Permanences des Pères
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Horaires de disponibilité des Pères pour les confessions, conseils spirituels et accompagnement.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {joursOrdre.map(jour => {
            const perms = groupedPermanences[jour];
            if (!perms) return null;

            return (
              <Card key={jour} className="glass-card hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                    <Calendar className="w-6 h-6" />
                    {jour}
                  </CardTitle>
                  {jour === 'Lundi' && (
                    <CardDescription className="text-sm italic">
                      Jour de repos: P. Curé, P. Justin
                    </CardDescription>
                  )}
                  {jour === 'Mardi' && (
                    <CardDescription className="text-sm italic">
                      Jour de repos: P. André
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {perms.map((perm) => (
                    <div
                      key={perm.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/50 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {perm.type_permanence === 'messe' ? (
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <Clock className="w-5 h-5 text-accent-foreground" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">{perm.pretre}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {perm.type_permanence === 'messe' ? 'Messe' : 'Permanence'}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {perm.heure_debut}
                          {perm.heure_fin && ` - ${perm.heure_fin}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 max-w-4xl mx-auto glass-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Informations Complémentaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Horaires des Messes:</p>
                  <p className="text-sm">Les messes sont célébrées à 09h30. Les permanences suivent selon l'horaire indiqué.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Confessions et Conseils:</p>
                  <p className="text-sm">Les Pères sont disponibles pendant les permanences pour les confessions, le conseil spirituel et l'accompagnement pastoral.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Jours de Repos:</p>
                  <p className="text-sm">
                    • Lundi: P. Curé et P. Justin<br />
                    • Mardi: P. André
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PermanencesPage;