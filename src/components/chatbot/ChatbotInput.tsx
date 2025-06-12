
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatbotInputProps {
  onSendMessage: (message: string) => void;
}

const ChatbotInput = ({ onSendMessage }: ChatbotInputProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Posez votre question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSend} size="sm" className="bg-church-blue hover:bg-church-blue/90">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatbotInput;
