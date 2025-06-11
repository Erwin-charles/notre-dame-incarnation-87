
import { useEffect, useState } from 'react';

const ParishPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const biblicalQuotes = [
    "\"Je suis la lumière du monde; celui qui me suit ne marchera pas dans les ténèbres.\" - Jean 8:12",
    "\"Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.\" - Matthieu 11:28",
    "\"Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux.\" - Matthieu 18:20",
    "\"Je vous donne un commandement nouveau: Aimez-vous les uns les autres.\" - Jean 13:34",
    "\"Que votre cœur ne se trouble point. Croyez en Dieu, et croyez en moi.\" - Jean 14:1"
  ];
  
  const [currentQuote] = useState(() => 
    biblicalQuotes[Math.floor(Math.random() * biblicalQuotes.length)]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        {/* Croix brillante */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative animate-glow">
            {/* Croix principale */}
            <div className="absolute top-1/2 left-1/2 w-20 h-3 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl animate-shimmer"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-20 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl animate-shimmer"></div>
            
            {/* Rayons de lumière */}
            <div className="absolute inset-0 animate-cross-rotate">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-gradient-to-t from-transparent via-white to-transparent transform origin-bottom opacity-60"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Nom de la paroisse */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            Notre Dame de l'Incarnation
          </h1>
          <p className="text-lg text-blue-800 font-medium">
            Paroisse Catholique - Cocody
          </p>
        </div>

        {/* Citation biblique */}
        <div className="max-w-md mx-auto px-6">
          <blockquote className="text-sm text-blue-800 italic leading-relaxed">
            {currentQuote}
          </blockquote>
        </div>

        {/* Indicateur de chargement */}
        <div className="mt-8">
          <div className="w-32 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParishPreloader;
