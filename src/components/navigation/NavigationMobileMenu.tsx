
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    onClick: (onNavigate: (page: string) => void) => void;
  }>;
}

interface NavigationMobileMenuProps {
  menuItems: MenuItem[];
  currentPage: string;
  openSubMenu: string | null;
  onNavigate: (page: string) => void;
  onSubMenuToggle: (menuId: string) => void;
  onClose: () => void;
}

const NavigationMobileMenu = ({ 
  menuItems, 
  currentPage, 
  openSubMenu, 
  onNavigate, 
  onSubMenuToggle, 
  onClose 
}: NavigationMobileMenuProps) => {
  return (
    <div className="lg:hidden glass-card border-t border-white/20 dark:border-gray-700/20 py-2 mt-2 rounded-lg mb-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isSubMenuOpen = openSubMenu === item.id;
        return (
          <div key={item.id} className="mb-2">
            <Button
              variant={currentPage === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSubMenuToggle(item.id)}
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
                        subItem.onClick(onNavigate);
                        onClose();
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
  );
};

export default NavigationMobileMenu;
