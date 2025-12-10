
interface NavigationLogoProps {
  onNavigate: (page: string) => void;
}

const NavigationLogo = ({ onNavigate }: NavigationLogoProps) => {
  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
      onClick={() => onNavigate('home')}
    >
      <div className="w-7 h-7 cross-3d relative">
        <div className="w-7 h-1 bg-primary absolute top-3 left-0 cross-beam"></div>
        <div className="w-1 h-7 bg-primary absolute top-0 left-3 cross-beam"></div>
      </div>
      <div className="leading-tight">
        <h1 className="text-sm font-bold text-primary whitespace-nowrap">Notre Dame</h1>
        <p className="text-[10px] text-muted-foreground whitespace-nowrap">de l'Incarnation</p>
      </div>
    </div>
  );
};

export default NavigationLogo;
