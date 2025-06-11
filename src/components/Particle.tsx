
import { useEffect, useState } from 'react';

const Particle = () => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });
  
  const [animation, setAnimation] = useState({
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, animation.duration * 1000);

    return () => clearInterval(interval);
  }, [animation.duration]);

  return (
    <div
      className="absolute w-2 h-2 bg-blue-200/40 rounded-full animate-pulse pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${animation.delay}s`,
        animationDuration: `${animation.duration}s`,
        filter: 'blur(1px)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Particle;
