
interface NavigationLogoProps {
  onNavigate: (page: string) => void;
}

const NavigationLogo = ({ onNavigate }: NavigationLogoProps) => {
  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => onNavigate('home')}
    >
      <div className="w-8 h-8 cross-3d">
        <div className="w-8 h-1 bg-primary absolute top-3 left-0 cross-beam"></div>
        <div className="w-1 h-8 bg-primary absolute top-0 left-3 cross-beam"></div>
      </div>
      <div>
        <h1 className="text-lg font-bold text-primary">Notre Dame</h1>
        <p className="text-xs text-muted-foreground">de l'Incarnation</p>
      </div>
    </div>
  );
};

export default NavigationLogo;
