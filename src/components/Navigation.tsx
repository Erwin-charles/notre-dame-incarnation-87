import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Moon, Sun, LogOut, User as UserIcon, Settings, Activity, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import NavigationLogo from './navigation/NavigationLogo';
import NavigationMenuItem from './navigation/NavigationMenuItem';
import NavigationMobileMenu from './navigation/NavigationMobileMenu';
import { menuItems } from './navigation/NavigationData';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  const onNavigate = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavigationLogo onNavigate={onNavigate} />

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-0.5">
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full glass-button">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.user_metadata?.prenom} {user.user_metadata?.nom}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Mon espace</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('parametres')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('diagnostic')}>
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Diagnostic DB</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLogin}
                size="sm"
                className="ml-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-3"
              >
                <LogIn className="mr-1 h-3.5 w-3.5" />
                Connexion
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="ml-1 glass-button p-2"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-2">
            {!user && (
              <Button
                onClick={handleLogin}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="glass-button"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
