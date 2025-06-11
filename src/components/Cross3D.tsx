
import { useEffect, useRef } from 'react';

const Cross3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Créer des particules de lumière
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 8 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const startX = Math.random() * 300;
      const startY = Math.random() * 300;
      
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${4 + Math.random() * 4}s`;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 8000);
    };

    // Créer des particules périodiquement
    const particleInterval = setInterval(createParticle, 300);
    
    // Créer quelques particules initiales
    for (let i = 0; i < 8; i++) {
      setTimeout(createParticle, i * 150);
    }

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-80 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Croix 3D principale agrandie */}
      <div className="cross-3d animate-float">
        <div className="relative">
          {/* Barre horizontale */}
          <div className="w-32 h-6 cross-beam rounded-full absolute top-12 left-6 animate-glow" />
          {/* Barre verticale */}
          <div className="w-6 h-44 cross-beam rounded-full animate-glow" />
          
          {/* Effet de profondeur */}
          <div className="w-32 h-6 bg-primary/30 rounded-full absolute top-13 left-7 blur-sm" />
          <div className="w-6 h-44 bg-primary/30 rounded-full absolute top-1 left-1 blur-sm" />
          
          {/* Rayons de lumière autour de la croix */}
          <div className="absolute inset-0 animate-cross-rotate">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-transparent via-primary/40 to-transparent transform origin-bottom"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cercle de lumière en arrière-plan agrandi */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-radial from-church-blue/20 via-church-blue/10 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Cross3D;
