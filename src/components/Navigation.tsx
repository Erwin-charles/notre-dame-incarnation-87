
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Church,
  Users,
  Calendar,
  Book,
  User,
  Moon,
  Sun,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navigation = ({ onNavigate, currentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { 
      id: 'home', 
      label: 'Accueil', 
      icon: Church,
      subItems: [
        { id: 'home-welcome', label: 'Bienvenue', onClick: () => onNavigate('home') },
        { id: 'home-history', label: 'Histoire de la Paroisse', onClick: () => onNavigate('home') },
        { id: 'home-contact', label: 'Contact', onClick: () => onNavigate('home') },
      ]
    },
    { 
      id: 'catechese', 
      label: 'Catéchèse', 
      icon: Book,
      subItems: [
        { id: 'catechese-inscription', label: 'Inscriptions', onClick: () => onNavigate('catechese') },
        { id: 'catechese-catechistes', label: 'Catéchistes', onClick: () => onNavigate('catechese') },
        { id: 'catechese-catechumenes', label: 'Catéchumènes', onClick: () => onNavigate('catechese') },
        { id: 'catechese-programme', label: 'Programme', onClick: () => onNavigate('catechese') },
      ]
    },
    { 
      id: 'groupes', 
      label: 'Groupes & Mouvements', 
      icon: Users,
      subItems: [
        { id: 'groupes-jeunes', label: 'Groupes de Jeunes', onClick: () => onNavigate('groupes') },
        { id: 'groupes-adultes', label: 'Groupes d\'Adultes', onClick: () => onNavigate('groupes') },
        { id: 'groupes-familles', label: 'Groupes Familiaux', onClick: () => onNavigate('groupes') },
        { id: 'groupes-prieres', label: 'Groupes de Prière', onClick: () => onNavigate('groupes') },
      ]
    },
    { 
      id: 'activites', 
      label: 'Activités', 
      icon: Calendar,
      subItems: [
        { id: 'activites-messes', label: 'Horaires des Messes', onClick: () => onNavigate('activites') },
        { id: 'activites-evenements', label: 'Événements', onClick: () => onNavigate('activites') },
        { id: 'activites-sacrements', label: 'Sacrements', onClick: () => onNavigate('activites') },
        { id: 'activites-benedictions', label: 'Bénédictions', onClick: () => onNavigate('activites') },
      ]
    },
    { 
      id: 'dashboard', 
      label: 'Mon Espace', 
      icon: User,
      subItems: [
        { id: 'dashboard-catechiste', label: 'Espace Catéchiste', onClick: () => onNavigate('dashboard') },
        { id: 'dashboard-catechumene', label: 'Espace Catéchumène', onClick: () => onNavigate('dashboard') },
        { id: 'dashboard-parent', label: 'Espace Parent', onClick: () => onNavigate('dashboard') },
        { id: 'dashboard-cure', label: 'Espace Curé', onClick: () => onNavigate('dashboard') },
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg">
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
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavigationMenuItem key={item.id}>
                      <NavigationMenuTrigger 
                        className={cn(
                          "flex items-center space-x-2 bg-transparent hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/20 transition-all duration-200",
                          currentPage === item.id && "bg-primary/20 text-primary border-primary/30"
                        )}
                        onClick={() => onNavigate(item.id)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-xl">
                        <div className="grid gap-1 p-4 w-64">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={subItem.onClick}
                              className="flex items-center p-3 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 text-left border border-transparent hover:border-white/20 dark:hover:border-gray-700/20 backdrop-blur-sm"
                            >
                              <span className="text-sm font-medium">{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="ml-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-800/30"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/20"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/20"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "rotate-45 translate-y-1")} />
                <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "opacity-0")} />
                <div className={cn("w-full h-0.5 bg-current transition-all", isOpen && "-rotate-45 -translate-y-1")} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="mb-2">
                  <Button
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className="w-full justify-start mb-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/10 dark:border-gray-700/20"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    <ChevronDown className="w-3 h-3 ml-auto" />
                  </Button>
                  <div className="ml-4 space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          subItem.onClick();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left p-2 text-sm rounded-md hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/10 dark:hover:border-gray-700/10"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
