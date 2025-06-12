
import { useEffect, useState } from 'react';

const Particle = () => {
  const [position, setPosition] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });
  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 0.5,
  });

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;

        // Rebond sur les bords
        if (newX <= 0 || newX >= window.innerWidth) {
          setVelocity(v => ({ ...v, x: -v.x }));
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          setVelocity(v => ({ ...v, y: -v.y }));
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [velocity]);

  const size = Math.random() * 4 + 2;
  const opacity = Math.random() * 0.6 + 0.2;

  return (
    <div
      className="absolute rounded-full bg-church-blue animate-pulse"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        opacity: opacity,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Particle;
