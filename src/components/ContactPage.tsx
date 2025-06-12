
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCodeComponent from './QRCodeComponent';
import PageParticles from './PageParticles';

const ContactPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé!",
      description: "Votre message a été envoyé avec succès. Nous vous répondrons bientôt.",
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <PageParticles count={8} />
      <div className="min-h-screen bg-gradient-to-br from-church-light via-white to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* En-tête de la page */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous sommes à votre écoute pour toute question, demande d'information
              ou suggestion. N'hésitez pas à nous contacter via le formulaire ci-dessous.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <Card className="bg-white shadow-md animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Adresse
                  </CardTitle>
                  <CardDescription>
                    Notre paroisse est située à Cocody Palmeraie, Abidjan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span>Cocody Palmeraie, Abidjan, Côte d'Ivoire</span>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Téléphone
                  </CardTitle>
                  <CardDescription>
                    Contactez-nous pour toute urgence ou information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-500" />
                  <span>+225 27 22 44 55 66</span>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Email
                  </CardTitle>
                  <CardDescription>
                    Écrivez-nous pour toute demande ou suggestion.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <span>contact@ndincarnation-cocody.ci</span>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire et QR Code */}
            <div className="space-y-8">
              {/* QR Code Section */}
              <QRCodeComponent
                url="https://ndincarnation-cocody.ci"
                title="Site Web de la Paroisse"
                description="Scannez ce QR code pour accéder directement à notre site web"
              />

              {/* Formulaire de contact */}
              <Card className="bg-white shadow-md animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription>
                    Utilisez le formulaire ci-dessous pour nous contacter directement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Votre message"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Carte et Localisation */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 animate-fade-in-up">
              Où nous trouver ?
            </h2>
            <Card className="shadow-md animate-fade-in-up">
              <CardContent>
                <div className="overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.049399619434!2d-3.974744424909348!3d5.36092309460482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfc25e71f69ff5%3A0x9a3c3b7a6c9e3a8d!2sNotre%20Dame%20de%20l&#39;incarnation!5e0!3m2!1sfr!2sci!4v1707952829914!5m2!1sfr!2sci"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
