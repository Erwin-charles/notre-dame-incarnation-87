
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Church,
  Users,
  Calendar,
  Book,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navigation = ({ onNavigate, currentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Church },
    { id: 'catechese', label: 'Catéchèse', icon: Book },
    { id: 'groupes', label: 'Groupes & Mouvements', icon: Users },
    { id: 'activites', label: 'Activités', icon: Calendar },
    { id: 'dashboard', label: 'Mon Espace', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 cross-3d">
              <div className="w-8 h-1 bg-primary absolute top-3 left-0 cross-beam"></div>
              <div className="w-1 h-8 bg-primary absolute top-0 left-3 cross-beam"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">Notre Dame</h1>
              <p className="text-xs text-muted-foreground">de l'Incarnation</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "flex items-center space-x-2 transition-all duration-200",
                    currentPage === item.id && "bg-primary text-white shadow-md"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "rotate-45 translate-y-1")} />
              <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "opacity-0")} />
              <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "-rotate-45 -translate-y-1")} />
            </div>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  className="w-full justify-start mb-1"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
