
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      text: 'Bonjour ! Je suis l\'assistant virtuel de la paroisse Notre Dame de l\'Incarnation. Comment puis-je vous aider aujourd\'hui ?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parishInfo = {
    horaires: {
      keywords: ['horaire', 'messe', 'office', 'heure', 'quand'],
      response: '🕐 **Horaires des célébrations :**\n\n**Messes dominicales :**\n• Samedi : 18h30\n• Dimanche : 9h00 et 11h00\n\n**Messes en semaine :**\n• Mardi à vendredi : 18h00\n• Mercredi : 9h00'
    },
    catechese: {
      keywords: ['catéchèse', 'catechisme', 'inscription', 'enfant', 'formation'],
      response: '📚 **Catéchèse :**\n\nNous proposons des parcours de formation pour tous les âges :\n• Éveil à la foi (3-6 ans)\n• Catéchèse des enfants (7-11 ans)\n• Aumônerie des jeunes (12-18 ans)\n• Formation d\'adultes\n\nLes inscriptions se font via notre page "Catéchèse" ou en contactant le secrétariat.'
    },
    activites: {
      keywords: ['activité', 'événement', 'groupe', 'mouvement', 'association'],
      response: '🎯 **Nos activités :**\n\n• Chorale paroissiale\n• Groupe de prière\n• Mouvement des jeunes\n• Équipes Notre-Dame\n• Action catholique\n• Caritas\n• Groupe biblique\n\nConsultez la page "Activités" pour plus de détails et les prochains événements.'
    },
    contact: {
      keywords: ['contact', 'téléphone', 'adresse', 'email', 'curé', 'prêtre'],
      response: '📞 **Contact :**\n\n**Adresse :** 123 Rue de l\'Église, 75001 Paris\n**Téléphone :** 01 23 45 67 89\n**Email :** contact@ndincarnation.fr\n\n**Équipe pastorale :**\n• Père Martin (Curé)\n• Père Jean (Vicaire)\n• Sœur Marie (Aumônière)'
    },
    bapteme: {
      keywords: ['baptême', 'bapteme', 'sacrement', 'bébé'],
      response: '💒 **Baptême :**\n\nPour demander le baptême :\n1. Contactez le secrétariat\n2. Entretien avec un prêtre\n3. Préparation (3 séances)\n4. Fixation de la date\n\nDocuments nécessaires : acte de naissance, certificat de résidence.'
    },
    mariage: {
      keywords: ['mariage', 'épouser', 'union', 'fiançailles'],
      response: '💍 **Mariage :**\n\nPréparation au mariage :\n• Prendre contact 6 mois avant\n• Entretien pastoral\n• Sessions de préparation\n• Constitution du dossier\n\nContactez le secrétariat pour plus d\'informations.'
    }
  };

  const findResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, info] of Object.entries(parishInfo)) {
      if (info.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return info.response;
      }
    }

    // Réponses par défaut pour questions courantes
    if (lowerMessage.includes('aide') || lowerMessage.includes('help')) {
      return '🤝 Je peux vous aider avec :\n• Les horaires des messes\n• Les inscriptions à la catéchèse\n• Nos activités et groupes\n• Les contacts\n• Les sacrements (baptême, mariage)\n\nPosez-moi votre question !';
    }

    if (lowerMessage.includes('merci')) {
      return '🙏 De rien ! N\'hésitez pas si vous avez d\'autres questions. Que Dieu vous bénisse !';
    }

    return '🤔 Je ne suis pas sûr de comprendre votre question. Vous pouvez me demander des informations sur :\n• Les horaires des messes\n• La catéchèse\n• Nos activités\n• Les contacts\n• Les sacrements\n\nOu tapez "aide" pour plus d\'options.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulation d'un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg animate-glow z-50"
          size="sm"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="bg-primary text-white rounded-t-lg py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-lg">Assistant Paroissial</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3 text-sm whitespace-pre-line",
                      message.isBot
                        ? "bg-gray-100 text-gray-800"
                        : "bg-primary text-white"
                    )}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre question..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
