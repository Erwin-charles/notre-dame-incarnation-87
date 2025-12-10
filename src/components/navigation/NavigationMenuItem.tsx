
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

interface NavigationMenuItemProps {
  item: MenuItem;
  currentPage: string;
  openSubMenu: string | null;
  onNavigate: (page: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NavigationMenuItem = ({ 
  item, 
  currentPage, 
  openSubMenu, 
  onNavigate, 
  onMouseEnter, 
  onMouseLeave 
}: NavigationMenuItemProps) => {
  const Icon = item.icon;

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center space-x-1 px-2 py-1 text-sm glass-button transition-all duration-200",
          currentPage === item.id && "bg-primary/20 text-primary border-primary/30"
        )}
        onClick={() => onNavigate(item.id)}
        onMouseEnter={onMouseEnter}
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{item.label}</span>
        <ChevronDown className="w-2.5 h-2.5" />
      </Button>
      
      {/* Dropdown Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 mt-1 w-72 bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0",
          openSubMenu === item.id && "opacity-100 visible translate-y-0"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
                    subItem.onClick(onNavigate);
                    onMouseLeave();
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
};

export default NavigationMenuItem;
