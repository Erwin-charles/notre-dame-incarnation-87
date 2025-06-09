
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
  ChevronDown,
  UserPlus,
  UserCheck,
  GraduationCap,
  ClipboardList,
  Heart,
  Home,
  Clock,
  Gift,
  BookOpen,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navigation = ({ onNavigate, currentPage }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubMenuToggle = (menuId: string) => {
    setOpenSubMenu(openSubMenu === menuId ? null : menuId);
  };

  const menuItems = [
    { 
      id: 'home', 
      label: 'Accueil', 
      icon: Church,
      subItems: [
        { 
          id: 'home-welcome', 
          label: 'Bienvenue', 
          icon: Home,
          description: 'Découvrez notre communauté paroissiale',
          onClick: () => onNavigate('home') 
        },
        { 
          id: 'home-history', 
          label: 'Histoire de la Paroisse', 
          icon: BookOpen,
          description: 'L\'histoire de Notre Dame de l\'Incarnation',
          onClick: () => onNavigate('home') 
        },
        { 
          id: 'home-contact', 
          label: 'Contact', 
          icon: Heart,
          description: 'Contactez notre équipe pastorale',
          onClick: () => onNavigate('home') 
        },
      ]
    },
    { 
      id: 'catechese', 
      label: 'Catéchèse', 
      icon: Book,
      subItems: [
        { 
          id: 'catechese-inscription', 
          label: 'Inscriptions', 
          icon: ClipboardList,
          description: 'Inscrivez-vous aux parcours de catéchèse',
          onClick: () => onNavigate('catechese') 
        },
        { 
          id: 'catechese-catechistes', 
          label: 'Catéchistes', 
          icon: GraduationCap,
          description: 'Équipe des catéchistes et formation',
          onClick: () => onNavigate('catechese') 
        },
        { 
          id: 'catechese-catechumenes', 
          label: 'Catéchumènes', 
          icon: UserCheck,
          description: 'Parcours pour les adultes demandant le baptême',
          onClick: () => onNavigate('catechese') 
        },
        { 
          id: 'catechese-programme', 
          label: 'Programme', 
          icon: Calendar,
          description: 'Programme annuel et calendrier des rencontres',
          onClick: () => onNavigate('catechese') 
        },
      ]
    },
    { 
      id: 'groupes', 
      label: 'Groupes & Mouvements', 
      icon: Users,
      subItems: [
        { 
          id: 'groupes-jeunes', 
          label: 'Groupes de Jeunes', 
          icon: UserPlus,
          description: 'Aumônerie et mouvements de jeunes',
          onClick: () => onNavigate('groupes') 
        },
        { 
          id: 'groupes-adultes', 
          label: 'Groupes d\'Adultes', 
          icon: Users,
          description: 'Communautés et groupes de partage',
          onClick: () => onNavigate('groupes') 
        },
        { 
          id: 'groupes-familles', 
          label: 'Groupes Familiaux', 
          icon: Heart,
          description: 'Rencontres et activités familiales',
          onClick: () => onNavigate('groupes') 
        },
        { 
          id: 'groupes-prieres', 
          label: 'Groupes de Prière', 
          icon: Book,
          description: 'Adoration, chapelet et prières communautaires',
          onClick: () => onNavigate('groupes') 
        },
      ]
    },
    { 
      id: 'activites', 
      label: 'Activités', 
      icon: Calendar,
      subItems: [
        { 
          id: 'activites-messes', 
          label: 'Horaires des Messes', 
          icon: Clock,
          description: 'Horaires des célébrations et offices',
          onClick: () => onNavigate('activites') 
        },
        { 
          id: 'activites-evenements', 
          label: 'Événements', 
          icon: Calendar,
          description: 'Fêtes, pèlerinages et événements spéciaux',
          onClick: () => onNavigate('activites') 
        },
        { 
          id: 'activites-sacrements', 
          label: 'Sacrements', 
          icon: Gift,
          description: 'Baptême, mariage, confirmation',
          onClick: () => onNavigate('activites') 
        },
        { 
          id: 'activites-benedictions', 
          label: 'Bénédictions', 
          icon: Heart,
          description: 'Bénédictions et célébrations particulières',
          onClick: () => onNavigate('activites') 
        },
      ]
    },
    { 
      id: 'dashboard', 
      label: 'Mon Espace', 
      icon: User,
      subItems: [
        { 
          id: 'dashboard-catechiste', 
          label: 'Espace Catéchiste', 
          icon: GraduationCap,
          description: 'Outils et ressources pour catéchistes',
          onClick: () => onNavigate('dashboard') 
        },
        { 
          id: 'dashboard-catechumene', 
          label: 'Espace Catéchumène', 
          icon: UserCheck,
          description: 'Suivi de votre parcours de foi',
          onClick: () => onNavigate('dashboard') 
        },
        { 
          id: 'dashboard-parent', 
          label: 'Espace Parent', 
          icon: Heart,
          description: 'Suivi de la catéchèse de vos enfants',
          onClick: () => onNavigate('dashboard') 
        },
        { 
          id: 'dashboard-cure', 
          label: 'Espace Curé', 
          icon: Shield,
          description: 'Administration paroissiale',
          onClick: () => onNavigate('dashboard') 
        },
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navigation">
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
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2 glass-button transition-all duration-200",
                      currentPage === item.id && "bg-primary/20 text-primary border-primary/30"
                    )}
                    onClick={() => onNavigate(item.id)}
                    onMouseEnter={() => setOpenSubMenu(item.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  
                  {/* Dropdown Menu */}
                  <div 
                    className={cn(
                      "absolute top-full left-0 mt-1 w-80 glass-card rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0",
                      openSubMenu === item.id && "opacity-100 visible translate-y-0"
                    )}
                    onMouseEnter={() => setOpenSubMenu(item.id)}
                    onMouseLeave={() => setOpenSubMenu(null)}
                  >
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-primary mb-3 border-b border-white/20 dark:border-gray-700/20 pb-2">
                        {item.label}
                      </h3>
                      <div className="space-y-2">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                subItem.onClick();
                                setOpenSubMenu(null);
                              }}
                              className="w-full flex items-start p-3 rounded-lg glass-button hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 text-left group/item"
                            >
                              <SubIcon className="w-4 h-4 mt-0.5 mr-3 text-primary group-hover/item:scale-110 transition-transform" />
                              <div>
                                <div className="text-sm font-medium mb-1">{subItem.label}</div>
                                <div className="text-xs text-muted-foreground">{subItem.description}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="ml-4 glass-button"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="glass-button"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="glass-button"
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
          <div className="lg:hidden glass-card border-t border-white/20 dark:border-gray-700/20 py-2 mt-2 rounded-lg mb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isSubMenuOpen = openSubMenu === item.id;
              return (
                <div key={item.id} className="mb-2">
                  <Button
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleSubMenuToggle(item.id)}
                    className="w-full justify-between mb-1 glass-button"
                  >
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </div>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isSubMenuOpen && "rotate-180")} />
                  </Button>
                  
                  {isSubMenuOpen && (
                    <div className="ml-4 space-y-1 mt-2 animate-accordion-down">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              subItem.onClick();
                              setIsOpen(false);
                              setOpenSubMenu(null);
                            }}
                            className="w-full flex items-center p-3 text-left rounded-md glass-button hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200"
                          >
                            <SubIcon className="w-4 h-4 mr-3 text-primary" />
                            <div>
                              <div className="text-sm font-medium">{subItem.label}</div>
                              <div className="text-xs text-muted-foreground">{subItem.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
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
