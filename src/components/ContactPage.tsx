import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Users, Church } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact</h1>
          <p className="text-xl text-muted-foreground">Notre Dame de l'Incarnation - Cocody</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Informations de contact */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <Church className="w-5 h-5 mr-2" />
                Coordonnées Paroissiales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Adresse</h3>
                  <p className="text-muted-foreground">
                    Cocody Palmeraie<br />
                    Abidjan, Côte d'Ivoire
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Coordonnées GPS:</strong><br />
                    Latitude: 5.3364° N<br />
                    Longitude: -3.9569° O
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Téléphone</h3>
                  <p className="text-muted-foreground">+225 27 22 44 55 66</p>
                  <p className="text-muted-foreground">+225 07 08 09 10 11</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">contact@ndincarnation-cocody.ci</p>
                  <p className="text-muted-foreground">cure@ndincarnation-cocody.ci</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carte */}
          <Card className="glass-card border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Localisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0886956280844!2d-3.9589!3d5.3364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjAnMTEuMCJOIDPCsDU3JzMyLjAiVw!5e0!3m2!1sfr!2sci!4v1625097600000!5m2!1sfr!2sci"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation de la Paroisse Notre Dame de l'Incarnation"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Située au cœur de Cocody Palmeraie, notre paroisse est facilement accessible en transport public et dispose d'un parking.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Horaires et permanences */}
        <Card className="glass-card border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Horaires & Permanences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Messes</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samedi</span>
                  <span className="text-foreground">18h30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimanche</span>
                  <span className="text-foreground">7h00 - 9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Semaine</span>
                  <span className="text-foreground">6h30 - 18h00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Permanences</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lundi - Vendredi</span>
                  <span className="text-foreground">8h00 - 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samedi</span>
                  <span className="text-foreground">8h00 - 11h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimanche</span>
                  <span className="text-foreground">Après les messes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Équipe pastorale */}
        <Card className="glass-card border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Équipe Pastorale
            </CardTitle>
            <CardDescription>
              Rencontrez les membres de notre équipe dédiée au service de la communauté
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-foreground">Père Jean-Baptiste KOUAME</h3>
                <p className="text-muted-foreground text-sm">Curé de la Paroisse</p>
                <p className="text-xs text-muted-foreground mt-1">Disponible pour confessions et entretiens spirituels</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">Père Michel ASSI</h3>
                <p className="text-muted-foreground text-sm">Vicaire</p>
                <p className="text-xs text-muted-foreground mt-1">Responsable de la catéchèse et des jeunes</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground">Diacre Pierre BROU</h3>
                <p className="text-muted-foreground text-sm">Diacre permanent</p>
                <p className="text-xs text-muted-foreground mt-1">Animation liturgique et préparation aux sacrements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
