import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import ParishPreloader from "./ParishPreloader";
import { Button } from "./ui/button";

interface HoraireSecretariat {
  id: string;
  jour: string;
  heure_ouverture: string;
  heure_fermeture: string | null;
  pause_debut: string | null;
  pause_fin: string | null;
}

const SecretariatPage = () => {
  const [horaires, setHoraires] = useState<HoraireSecretariat[]>([]);
  const [loading, setLoading] = useState(true);

  const joursOrdre = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  useEffect(() => {
    fetchHoraires();
  }, []);

  const fetchHoraires = async () => {
    try {
      const { data, error } = await supabase
        .from('horaires_secretariat')
        .select('*')
        .order('jour');

      if (error) throw error;
      setHoraires(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des horaires");
    } finally {
      setLoading(false);
    }
  };

  const getHoraireByJour = (jour: string) => {
    return horaires.find(h => h.jour === jour);
  };

  if (loading) return <ParishPreloader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Secrétariat Paroissial
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Horaires d'ouverture et services administratifs de la paroisse Notre Dame de l'Incarnation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Horaires */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                <Clock className="w-6 h-6" />
                Horaires d'Ouverture
              </CardTitle>
              <CardDescription>
                Le secrétariat est ouvert selon les horaires suivants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {joursOrdre.map(jour => {
                const horaire = getHoraireByJour(jour);
                if (!horaire) return null;

                return (
                  <div
                    key={jour}
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{jour}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {horaire.heure_ouverture} - {horaire.heure_fermeture}
                      </p>
                      {horaire.pause_debut && horaire.pause_fin && (
                        <p className="text-xs text-muted-foreground">
                          Pause: {horaire.pause_debut} - {horaire.pause_fin}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact et Services */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                  <Phone className="w-6 h-6" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">+225 27 22 44 55 66</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">contact@ndincarnation-cocody.ci</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium text-sm">Riviera Palmeraie, Cocody, Abidjan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">
                  Demandes de Messe en Ligne
                </CardTitle>
                <CardDescription>
                  Faites vos demandes de messe facilement depuis chez vous
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  onClick={() => window.open('https://bit.ly/demande-ndi', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Faire une demande de messe
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Services Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Inscriptions aux sacrements (Baptême, Mariage, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Demandes de certificats et attestations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Renseignements sur les activités paroissiales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Inscriptions à la catéchèse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Organisation d'événements religieux</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretariatPage;