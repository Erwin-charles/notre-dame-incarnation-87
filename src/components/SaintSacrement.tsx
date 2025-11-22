import { useEffect, useState } from 'react';
const SaintSacrement = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
  }>>([]);
  useEffect(() => {
    const newParticles = Array.from({
      length: 16
    }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);
  return <div className="relative w-56 h-56 mx-auto mb-8 animate-float">
      {/* Hostie (pain eucharistique) agrandie */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 dark:from-yellow-200 dark:via-yellow-100 dark:to-yellow-50 rounded-full shadow-2xl animate-glow border-4 border-yellow-200/50">
          {/* Croix gravée sur l'hostie */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-10 h-10">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-yellow-600/40 transform -translate-y-1/2"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-600/40 transform -translate-x-1/2"></div>
            </div>
          </div>
          
          {/* Rayons de lumière agrandis */}
          <div className="absolute inset-0 animate-cross-rotate">
            {[...Array(12)].map((_, i) => <div key={i} className="absolute top-1/2 left-1/2 w-1.5 h-32 bg-gradient-to-t from-transparent via-yellow-300/60 to-transparent transform origin-bottom" style={{
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
            filter: 'blur(1px)'
          }} />)}
          </div>
          
          {/* Effet scintillant supplémentaire */}
          <div className="absolute inset-0 animate-shimmer">
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300/80 rounded-full animate-pulse" style={{
            animationDelay: '0.5s'
          }} />
            <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-yellow-400/90 rounded-full animate-pulse" style={{
            animationDelay: '1s'
          }} />
            <div className="absolute bottom-3 left-4 w-1 h-1 bg-yellow-200/70 rounded-full animate-pulse" style={{
            animationDelay: '1.5s'
          }} />
          </div>
        </div>
      </div>

      {/* Particules scintillantes agrandies */}
      {particles.map(particle => <div key={particle.id} className="absolute w-3 h-3 bg-yellow-300/80 dark:bg-yellow-200/80 rounded-full animate-pulse" style={{
      top: `${particle.y}%`,
      left: `${particle.x}%`,
      animationDelay: `${particle.delay}s`,
      animationDuration: '2s',
      filter: 'blur(0.5px)',
      boxShadow: '0 0 12px rgba(253, 224, 71, 0.8)'
    }} />)}

      {/* Aura divine agrandie */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-200/30 via-yellow-100/15 to-transparent dark:from-yellow-300/40 dark:via-yellow-200/20 animate-glass-morph px-[7px]" />
    </div>;
};
export default SaintSacrement;