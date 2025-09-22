import { Clock, MapPin, Church, Users, Heart, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HistoirePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-church-gold rounded-full mb-4">
            <Church className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Histoire de Notre Paroisse</h1>
          <div className="flex items-center justify-center gap-2 text-church-gold mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Riviera Palmeraie, Abidjan – Archidiocèse d'Abidjan</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez l'histoire de la Paroisse Notre-Dame de l'Incarnation, 
            une communauté vivante née de la foi et de la persévérance de ses fidèles.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* La naissance de la paroisse */}
          <Card className="relative">
            <div className="absolute left-6 top-6 w-12 h-12 bg-church-gold rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <CardHeader className="pl-24">
              <CardTitle className="text-2xl text-church-gold">La naissance de la paroisse</CardTitle>
              <Badge variant="outline" className="w-fit">2010</Badge>
            </CardHeader>
            <CardContent className="pl-24">
              <p className="text-gray-700 mb-4">
                C'est dans un contexte de forte croissance démographique et spirituelle du quartier Riviera Palmeraie 
                qu'est née l'idée d'implanter un lieu de culte permanent. Longtemps dépendants de la paroisse Sainte Famille 
                de la Riviera II, les fidèles du secteur Palmeraie ont exprimé leur besoin de disposer d'un espace de prière de proximité.
              </p>
              <p className="text-gray-700 mb-4">
                La chapelle, alors installée de façon temporaire dans un espace aménagé, sert de lieu de rassemblement 
                pour une communauté fervente et engagée. Grâce à leur foi, leur persévérance et leur solidarité, 
                cette communauté va donner naissance à une nouvelle paroisse.
              </p>
              <div className="bg-church-gold/10 p-4 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Le 2 novembre 2010, la chapelle devient effectivement Paroisse Notre-Dame de l'Incarnation, 
                  établie par Son Éminence Jean-Pierre Cardinal KUTWA, alors Archevêque d'Abidjan.
                </p>
                <p className="text-gray-700 mt-2">
                  Cette célébration fondatrice fut marquée par la présence de plusieurs autorités ecclésiastiques et la participation joyeuse des fidèles.
                  Le tout premier curé nommé à la tête de la paroisse fut le Révérend Père Norbert Éric ABEKAN, 
                  assisté par des vicaires et des stagiaires qui l'ont accompagné dans l'organisation de la vie paroissiale.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Construction du presbytère */}
          <Card className="relative">
            <div className="absolute left-6 top-6 w-12 h-12 bg-church-gold rounded-full flex items-center justify-center">
              <Church className="w-6 h-6 text-white" />
            </div>
            <CardHeader className="pl-24">
              <CardTitle className="text-2xl text-church-gold">La construction du presbytère et des infrastructures</CardTitle>
              <Badge variant="outline" className="w-fit">2011-2023</Badge>
            </CardHeader>
            <CardContent className="pl-24">
              <p className="text-gray-700 mb-4">
                Dès les premières années, les fidèles se mobilisent pour doter leur paroisse d'infrastructures dignes de sa mission.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-church-gold pl-4">
                  <h4 className="font-semibold text-gray-900">2011-2012 : Le presbytère</h4>
                  <p className="text-gray-700">
                    Les travaux de construction du presbytère débutent en 2011, grâce aux efforts conjoints des fidèles, 
                    des mouvements et associations, notamment l'AFEC (Association des Femmes Catholiques). 
                    Ce bâtiment sera achevé courant 2012.
                  </p>
                </div>
                <div className="border-l-4 border-church-gold pl-4">
                  <h4 className="font-semibold text-gray-900">2023 : Bâtiment polyvalent</h4>
                  <p className="text-gray-700">
                    Un bâtiment polyvalent destiné à abriter des bureaux, des salles de réunions, des espaces de catéchèse 
                    et d'accueil, voit progressivement le jour. Il sera inauguré en 2023, après de longues années de mobilisation communautaire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* La grande Église */}
          <Card className="relative">
            <div className="absolute left-6 top-6 w-12 h-12 bg-church-gold rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <CardHeader className="pl-24">
              <CardTitle className="text-2xl text-church-gold">La grande Église</CardTitle>
              <Badge variant="outline" className="w-fit">2013-Aujourd'hui</Badge>
            </CardHeader>
            <CardContent className="pl-24">
              <div className="bg-church-gold/10 p-4 rounded-lg mb-4">
                <p className="text-gray-800 font-semibold">
                  La pose de la première pierre de l'église paroissiale a lieu en grande pompe le 8 décembre 2013, 
                  en la fête de l'Immaculée Conception, sous la présidence du Cardinal Jean-Pierre Kutwa.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Mais les travaux ne démarrent effectivement qu'à la suite d'une grande mobilisation financière orchestrée 
                par le Père Curé avec l'appui du Conseil paroissial et de l'ensemble des fidèles. Diverses initiatives, 
                telles que les fêtes paroissiales, kermesses, campagnes de dons et actions de charité ont permis 
                de rassembler progressivement les fonds nécessaires.
              </p>
              <p className="text-gray-700 mb-4">
                La dédicace officielle de l'église a lieu lors d'une célébration eucharistique solennelle,
                réunissant toute la communauté catholique de la Palmeraie et des invités venus d'ailleurs.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-2">Capacité d'accueil</h4>
                  <p className="text-church-gold text-2xl font-bold">+2000 fidèles</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-2">Infrastructures</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Nef principale spacieuse</li>
                    <li>• Deux mezzanines latérales</li>
                    <li>• Chapelle du Saint-Sacrement</li>
                    <li>• Deux sacristies</li>
                    <li>• Bureaux et boutique</li>
                    <li>• Sanitaires modernes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Une paroisse vivante */}
          <Card className="relative">
            <div className="absolute left-6 top-6 w-12 h-12 bg-church-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <CardHeader className="pl-24">
              <CardTitle className="text-2xl text-church-gold">Une paroisse vivante et missionnaire</CardTitle>
              <Badge variant="outline" className="w-fit">Aujourd'hui</Badge>
            </CardHeader>
            <CardContent className="pl-24">
              <p className="text-gray-700 mb-4">
                Depuis sa fondation, la Paroisse Notre-Dame de l'Incarnation ne cesse de grandir, 
                non seulement en nombre de fidèles, mais aussi en intensité spirituelle. Elle abrite aujourd'hui :
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Lieux de prière</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Une grotte mariale, lieu de pèlerinage</li>
                    <li>• Chapelle du Saint-Sacrement</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Jeunesse</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• JEC (Jeunesse Étudiante Catholique)</li>
                    <li>• CV-AV (Cœurs Vaillants - Âmes Vaillantes)</li>
                    <li>• Scouts</li>
                    <li>• Serviteurs de messe</li>
                    <li>• Catéchumènes</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Mouvements</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• AFEC (Association des Femmes Catholiques)</li>
                    <li>• Légion de Marie</li>
                    <li>• Charismatiques</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Formation</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• École de catéchèse structurée</li>
                    <li>• Chorales engagées dans l'animation liturgique</li>
                  </ul>
                </div>
              </div>

              <div className="bg-church-gold/10 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Notre conception</h4>
                <p className="text-church-gold text-lg font-semibold">
                  "Oui à Dieu ! Humilité – Prière – Amour du prochain"
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  Par sa conception, la paroisse s'ancre dans une dynamique de formation, de prière, de service et d'évangélisation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Leadership actuel */}
          <Card className="relative">
            <div className="absolute left-6 top-6 w-12 h-12 bg-church-gold rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <CardHeader className="pl-24">
              <CardTitle className="text-2xl text-church-gold">Leadership et encadrement</CardTitle>
            </CardHeader>
            <CardContent className="pl-24">
              <p className="text-gray-700 mb-4">
                Depuis sa création, plusieurs prêtres ont contribué à la construction spirituelle et matérielle de la paroisse.
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-900 mb-2">Équipe pastorale actuelle</h4>
                <p className="text-gray-700">
                  Aujourd'hui, la Paroisse Notre-Dame de l'Incarnation est dirigée par le 
                  <span className="font-semibold text-church-gold"> Révérend Père Joseph ZINSOU</span>, curé, 
                  entouré de ses vicaires et d'une équipe pastorale dévouée.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HistoirePage;