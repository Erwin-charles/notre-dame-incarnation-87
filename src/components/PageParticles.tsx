
import Particle from './Particle';

interface PageParticlesProps {
  count?: number;
}

const PageParticles = ({ count = 8 }: PageParticlesProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(count)].map((_, i) => (
        <Particle key={i} />
      ))}
    </div>
  );
};

export default PageParticles;
