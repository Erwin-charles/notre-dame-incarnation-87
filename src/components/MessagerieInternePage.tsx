import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Send,
  Plus,
  Inbox,
  Sent,
  Archive,
  Trash2,
  Search,
  Users,
  Calendar,
  Video,
  Clock,
  User
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender_id: string;
  recipient_id: string;
  message_type: 'individual' | 'group' | 'planning' | 'meeting';
  read: boolean;
  created_at: string;
  sender?: {
    nom: string;
    prenom: string;
  };
  recipient?: {
    nom: string;
    prenom: string;
  };
}

const MessagerieInternePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient_id: '',
    subject: '',
    content: '',
    message_type: 'individual' as const
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Charger les messages reçus
      const { data: receivedMessages } = await supabase
        .from('contact_messages')
        .select(`
          *,
          sender:profiles!sender_id(nom, prenom)
        `)
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });

      // Charger les messages envoyés
      const { data: sentMessages } = await supabase
        .from('contact_messages')
        .select(`
          *,
          recipient:profiles!recipient_id(nom, prenom)
        `)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });

      // Charger la liste des utilisateurs
      const { data: usersData } = await supabase
        .from('profiles')
        .select('user_id, nom, prenom, email')
        .neq('user_id', user.id);

      setMessages(receivedMessages || []);
      setSentMessages(sentMessages || []);
      setUsers(usersData || []);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const messageData = {
        ...newMessage,
        sender_id: user.id,
        read: false
      };

      const { error } = await supabase
        .from('contact_messages')
        .insert([messageData]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Message envoyé avec succès"
      });

      setNewMessage({
        recipient_id: '',
        subject: '',
        content: '',
        message_type: 'individual'
      });
      setIsComposing(false);
      loadData();
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive"
      });
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId);
      
      loadData();
    } catch (error) {
      console.error('Erreur lors du marquage:', error);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.sender && `${message.sender.prenom} ${message.sender.nom}`.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'group': return <Users className="w-4 h-4" />;
      case 'planning': return <Calendar className="w-4 h-4" />;
      case 'meeting': return <Video className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case 'group': return 'Groupe';
      case 'planning': return 'Planning';
      case 'meeting': return 'Réunion';
      default: return 'Personnel';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Messagerie Interne
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Communication interne pour la coordination des activités paroissiales
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar avec actions */}
            <div className="lg:col-span-1">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Dialog open={isComposing} onOpenChange={setIsComposing}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Composer un message</DialogTitle>
                        <DialogDescription>
                          Envoyer un message à un membre de l'équipe paroissiale
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Destinataire</Label>
                            <Select
                              value={newMessage.recipient_id}
                              onValueChange={(value) => setNewMessage({ ...newMessage, recipient_id: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir un destinataire" />
                              </SelectTrigger>
                              <SelectContent>
                                {users.map((user: any) => (
                                  <SelectItem key={user.user_id} value={user.user_id}>
                                    {user.prenom} {user.nom}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label>Type de message</Label>
                            <Select
                              value={newMessage.message_type}
                              onValueChange={(value: any) => setNewMessage({ ...newMessage, message_type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="individual">Personnel</SelectItem>
                                <SelectItem value="group">Groupe</SelectItem>
                                <SelectItem value="planning">Planning</SelectItem>
                                <SelectItem value="meeting">Réunion</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Sujet</Label>
                          <Input
                            value={newMessage.subject}
                            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                            placeholder="Objet du message"
                          />
                        </div>

                        <div>
                          <Label>Message</Label>
                          <Textarea
                            value={newMessage.content}
                            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                            placeholder="Tapez votre message ici..."
                            rows={6}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsComposing(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleSendMessage}>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="pt-4 space-y-1">
                    <div className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
                      <Inbox className="w-4 h-4" />
                      <span className="text-sm">Boîte de réception</span>
                      <Badge variant="secondary" className="ml-auto">
                        {messages.filter(m => !m.read).length}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer">
                      <Sent className="w-4 h-4" />
                      <span className="text-sm">Messages envoyés</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Zone principale */}
            <div className="lg:col-span-3">
              <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Messages</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Rechercher..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="received" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="received">Reçus ({messages.length})</TabsTrigger>
                      <TabsTrigger value="sent">Envoyés ({sentMessages.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="received" className="space-y-4">
                      {filteredMessages.length === 0 ? (
                        <div className="text-center py-8">
                          <Mail className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Aucun message</h3>
                          <p className="text-muted-foreground">Votre boîte de réception est vide</p>
                        </div>
                      ) : (
                        filteredMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                              !message.read ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => {
                              setSelectedMessage(message);
                              if (!message.read) markAsRead(message.id);
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex items-center gap-2">
                                  {getMessageTypeIcon(message.message_type)}
                                  <User className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-medium ${!message.read ? 'font-bold' : ''}`}>
                                      {message.sender ? `${message.sender.prenom} ${message.sender.nom}` : 'Expéditeur inconnu'}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {getMessageTypeLabel(message.message_type)}
                                    </Badge>
                                    {!message.read && <Badge className="text-xs">Nouveau</Badge>}
                                  </div>
                                  <h4 className={`font-medium mb-1 ${!message.read ? 'font-bold' : ''}`}>
                                    {message.subject}
                                  </h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {message.content}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {new Date(message.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </TabsContent>
                    
                    <TabsContent value="sent" className="space-y-4">
                      {sentMessages.length === 0 ? (
                        <div className="text-center py-8">
                          <Sent className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Aucun message envoyé</h3>
                          <p className="text-muted-foreground">Vous n'avez encore envoyé aucun message</p>
                        </div>
                      ) : (
                        sentMessages.map((message) => (
                          <div
                            key={message.id}
                            className="p-4 border rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex items-center gap-2">
                                  {getMessageTypeIcon(message.message_type)}
                                  <User className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">
                                      À: {message.recipient ? `${message.recipient.prenom} ${message.recipient.nom}` : 'Destinataire inconnu'}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {getMessageTypeLabel(message.message_type)}
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium mb-1">{message.subject}</h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {message.content}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {new Date(message.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Modal de lecture de message */}
        {selectedMessage && (
          <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {getMessageTypeIcon(selectedMessage.message_type)}
                  <DialogTitle>{selectedMessage.subject}</DialogTitle>
                </div>
                <DialogDescription>
                  De: {selectedMessage.sender ? `${selectedMessage.sender.prenom} ${selectedMessage.sender.nom}` : 'Expéditeur inconnu'} • 
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                    Fermer
                  </Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Répondre
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default MessagerieInternePage;