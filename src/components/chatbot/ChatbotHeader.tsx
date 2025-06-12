
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatbotHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatbotHeader = ({ isOpen, onToggle }: ChatbotHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-church-blue text-white">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5" />
        <h3 className="font-semibold">Assistant Paroissial</h3>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="text-white hover:bg-white/20 p-1 h-auto"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatbotHeader;
