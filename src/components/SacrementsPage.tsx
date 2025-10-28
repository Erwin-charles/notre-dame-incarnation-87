import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Heart, User, Info, DollarSign } from "lucide-react";
import { toast } from "sonner";
import ParishPreloader from "./ParishPreloader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Sacrement {
  id: string;
  type_sacrement: string;
  titre: string;
  description: string | null;
  horaires: string | null;
  pieces_requises: string[] | null;
  tarifs: string | null;
  notes: string | null;
}

const SacrementsPage = () => {
  const [sacrements, setSacrements] = useState<Sacrement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSacrements();
  }, []);

  const fetchSacrements = async () => {
    try {
      const { data, error } = await supabase
        .from('sacrements')
        .select('*')
        .order('type_sacrement');

      if (error) throw error;
      setSacrements(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors du chargement des sacrements");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'bapteme':
        return <Heart className="w-6 h-6" />;
      case 'mariage':
        return <User className="w-6 h-6" />;
      case 'funerailles':
        return <FileText className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  if (loading) return <ParishPreloader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Les Sacrements
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informations sur les sacrements célébrés dans notre paroisse: Baptême, Mariage, et Funérailles
          </p>
        </div>

        <div className="grid gap-8 max-w-5xl mx-auto">
          {sacrements.map((sacrement) => (
            <Card key={sacrement.id} className="glass-card hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-3 text-primary">
                  {getIcon(sacrement.type_sacrement)}
                  {sacrement.titre}
                </CardTitle>
                {sacrement.description && (
                  <CardDescription className="text-base mt-2">
                    {sacrement.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {sacrement.horaires && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/20">
                    <Info className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Horaires</p>
                      <p className="text-sm">{sacrement.horaires}</p>
                    </div>
                  </div>
                )}

                {sacrement.pieces_requises && sacrement.pieces_requises.length > 0 && (
                  <div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="pieces">
                        <AccordionTrigger className="text-lg font-semibold text-primary">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Pièces à Fournir
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 mt-3">
                            {sacrement.pieces_requises.map((piece, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-primary mt-1">✓</span>
                                <span>{piece}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}

                {sacrement.tarifs && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Tarifs</p>
                      <p className="text-sm whitespace-pre-line">{sacrement.tarifs}</p>
                    </div>
                  </div>
                )}

                {sacrement.notes && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Note importante: </span>
                      {sacrement.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 max-w-5xl mx-auto glass-card bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Contact du Secrétariat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Horaires d'ouverture:</p>
                <p className="text-muted-foreground">
                  Lundi au vendredi: 08h00-12h00 / 14h00-18h00<br />
                  Samedi: 08h00-13h00
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Pour toute inscription:</p>
                <p className="text-muted-foreground">
                  Téléphone: +225 27 22 44 55 66<br />
                  Email: contact@ndincarnation-cocody.ci
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-accent/20">
              <p className="text-sm">
                <span className="font-semibold text-primary">Important: </span>
                Des enveloppes de dons sont disponibles au secrétariat pour ceux qui souhaitent contribuer aux besoins de la paroisse.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SacrementsPage;