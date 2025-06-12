
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotMessageProps {
  message: Message;
}

const ChatbotMessage = ({ message }: ChatbotMessageProps) => {
  return (
    <div className={`flex space-x-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
      {message.isBot && (
        <div className="w-8 h-8 bg-church-blue rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.isBot
            ? 'bg-gray-100 text-gray-800'
            : 'bg-church-blue text-white'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
      {!message.isBot && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default ChatbotMessage;
