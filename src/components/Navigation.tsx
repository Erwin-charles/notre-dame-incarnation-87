
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationMenuItem from './navigation/NavigationMenuItem';
import NavigationMobileMenu from './navigation/NavigationMobileMenu';
import { menuItems } from './navigation/NavigationData';

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

  const handleCloseSubMenu = () => {
    setOpenSubMenu(null);
  };

  const handleCloseMobileMenu = () => {
    setIsOpen(false);
    setOpenSubMenu(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavigationLogo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <NavigationMenuItem
                key={item.id}
                item={item}
                currentPage={currentPage}
                openSubMenu={openSubMenu}
                onNavigate={onNavigate}
                onMouseEnter={() => setOpenSubMenu(item.id)}
                onMouseLeave={handleCloseSubMenu}
              />
            ))}

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
          <NavigationMobileMenu
            menuItems={menuItems}
            currentPage={currentPage}
            openSubMenu={openSubMenu}
            onNavigate={onNavigate}
            onSubMenuToggle={handleSubMenuToggle}
            onClose={handleCloseMobileMenu}
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;
