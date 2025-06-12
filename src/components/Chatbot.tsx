
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatbotHeader from './chatbot/ChatbotHeader';
import ChatbotMessage from './chatbot/ChatbotMessage';
import ChatbotInput from './chatbot/ChatbotInput';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant paroissial. Comment puis-je vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulation de réponse automatique
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('messe') || lowerMessage.includes('horaire')) {
      return 'Les messes ont lieu du lundi au vendredi à 6h30 et 18h30, le samedi à 18h30 et le dimanche à 7h, 9h et 18h30.';
    } else if (lowerMessage.includes('catéchèse') || lowerMessage.includes('catechese')) {
      return 'Les inscriptions pour la catéchèse sont ouvertes. Vous pouvez vous inscrire via notre formulaire en ligne ou vous rendre au secrétariat paroissial.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('telephone')) {
      return 'Vous pouvez nous contacter au +225 22 44 XX XX ou par email à contact@paroisse-cocody.ci. Le secrétariat est ouvert du lundi au vendredi de 8h à 17h.';
    } else if (lowerMessage.includes('baptême') || lowerMessage.includes('bapteme')) {
      return 'Pour les baptêmes, veuillez contacter le secrétariat paroissial. Une préparation est nécessaire pour les parents et parrains/marraines.';
    } else if (lowerMessage.includes('mariage')) {
      return 'La préparation au mariage dure plusieurs mois. Contactez le secrétariat pour fixer un rendez-vous avec l\'équipe pastorale.';
    } else {
      return 'Merci pour votre message. Pour des informations plus spécifiques, n\'hésitez pas à contacter directement le secrétariat paroissial.';
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-church-blue hover:bg-church-blue/90 shadow-lg z-40"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-40 flex flex-col">
          <ChatbotHeader isOpen={isOpen} onToggle={() => setIsOpen(false)} />
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatbotMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>

          <ChatbotInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
