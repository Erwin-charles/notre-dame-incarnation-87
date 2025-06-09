
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
      
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      const startX = Math.random() * 200;
      const startY = Math.random() * 200;
      
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
    const particleInterval = setInterval(createParticle, 500);
    
    // Créer quelques particules initiales
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 200);
    }

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-64 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Croix 3D principale */}
      <div className="cross-3d animate-float">
        <div className="relative">
          {/* Barre horizontale */}
          <div className="w-24 h-4 cross-beam rounded-full absolute top-8 left-4 animate-glow" />
          {/* Barre verticale */}
          <div className="w-4 h-32 cross-beam rounded-full animate-glow" />
          
          {/* Effet de profondeur */}
          <div className="w-24 h-4 bg-primary/30 rounded-full absolute top-9 left-5 blur-sm" />
          <div className="w-4 h-32 bg-primary/30 rounded-full absolute top-1 left-1 blur-sm" />
        </div>
      </div>

      {/* Cercle de lumière en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-gradient-radial from-church-blue/20 via-church-blue/10 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Cross3D;
