import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface Verse {
  text: string;
  reference: string;
}

const verses: Verse[] = [
  {
    text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse pas, mais qu'il ait la vie éternelle.",
    reference: "Jean 3:16"
  },
  {
    text: "Je suis le chemin, la vérité et la vie. Nul ne vient au Père que par moi.",
    reference: "Jean 14:6"
  },
  {
    text: "Aimez-vous les uns les autres comme je vous ai aimés.",
    reference: "Jean 13:34"
  },
  {
    text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous la donne pas comme le monde la donne. Que votre cœur ne se trouble point, et ne s'alarme point.",
    reference: "Jean 14:27"
  },
  {
    text: "Tout ce que vous demanderez en mon nom, je le ferai, afin que le Père soit glorifié dans le Fils.",
    reference: "Jean 14:13"
  },
  {
    text: "Le Seigneur est mon berger: je ne manquerai de rien. Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles.",
    reference: "Psaume 23:1-2"
  },
  {
    text: "Que la grâce du Seigneur Jésus-Christ, l'amour de Dieu, et la communion du Saint-Esprit, soient avec vous tous!",
    reference: "2 Corinthiens 13:14"
  },
  {
    text: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.",
    reference: "Philippiens 4:6"
  },
  {
    text: "Je puis tout par celui qui me fortifie.",
    reference: "Philippiens 4:13"
  },
  {
    text: "L'Éternel est ma lumière et mon salut: De qui aurais-je crainte? L'Éternel est le soutien de ma vie: De qui aurais-je peur?",
    reference: "Psaume 27:1"
  },
  {
    text: "Voici, je suis avec vous tous les jours, jusqu'à la fin du monde.",
    reference: "Matthieu 28:20"
  },
  {
    text: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.",
    reference: "Matthieu 6:33"
  },
  {
    text: "L'amour est patient, il est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point, il ne s'enfle point d'orgueil.",
    reference: "1 Corinthiens 13:4"
  },
  {
    text: "Heureux ceux qui ont le cœur pur, car ils verront Dieu!",
    reference: "Matthieu 5:8"
  },
  {
    text: "Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse.",
    reference: "Proverbes 3:5"
  },
  {
    text: "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux.",
    reference: "Matthieu 18:20"
  },
  {
    text: "Béni soit l'homme qui se confie dans l'Éternel, Et dont l'Éternel est l'espérance!",
    reference: "Jérémie 17:7"
  },
  {
    text: "L'Éternel est près de ceux qui ont le cœur brisé, Et il sauve ceux qui ont l'esprit dans l'abattement.",
    reference: "Psaume 34:18"
  },
  {
    text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
    reference: "Matthieu 11:28"
  },
  {
    text: "En vérité, en vérité, je vous le dis, celui qui croit en moi a la vie éternelle.",
    reference: "Jean 6:47"
  }
];

const BiblicalVerse = () => {
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);

  useEffect(() => {
    // Sélectionner un verset aléatoire à chaque chargement
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentVerse(verses[randomIndex]);
  }, []);

  if (!currentVerse) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <BookOpen className="w-8 h-8 text-church-blue" />
          </div>
          <div className="flex-1">
            <blockquote className="text-lg italic text-gray-700 dark:text-gray-200 mb-3">
              "{currentVerse.text}"
            </blockquote>
            <cite className="text-sm font-semibold text-church-blue not-italic">
              — {currentVerse.reference}
            </cite>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiblicalVerse;
