
import { Church, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 cross-3d">
                <div className="w-8 h-1 bg-church-gold absolute top-3 left-0 cross-beam"></div>
                <div className="w-1 h-8 bg-church-gold absolute top-0 left-3 cross-beam"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-church-gold">Notre Dame de l'Incarnation</h3>
                <p className="text-sm text-gray-300">Paroisse Catholique - Cocody</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Une communauté vivante qui accueille tous ceux qui cherchent Dieu. 
              Venez découvrir la joie de la foi partagée et grandir ensemble dans l'amour du Christ.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-church-gold cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-church-gold cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-church-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-church-gold mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-church-gold" />
              <span className="text-sm text-gray-300">Riviera palmeraie non loin du rond point<br />Abidjan, Côte d'Ivoire</span>
            </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-church-gold" />
                <span className="text-sm text-gray-300">+225 27 22 44 55 66</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-church-gold" />
                <span className="text-sm text-gray-300">contact@ndincarnation-cocody.ci</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="text-lg font-semibold text-church-gold mb-4">Horaires</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <div className="font-semibold text-church-gold mb-1">Lundi au Vendredi</div>
                <div>06h15 - 12h15 - 19h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Samedi</div>
                <div>07h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Anticipée Samedi</div>
                <div>19h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Dimanche</div>
                <div>06h30 - 08h15 - 09h45 - 11h15 - 19h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Jour férié</div>
                <div>Messe unique à 08h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Messe pour les Défunts</div>
                <div className="text-xs text-gray-400">2ème Vendredi du mois</div>
                <div>19h00</div>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <div className="font-semibold text-church-gold mb-2">Comment faire une demande de messe ?</div>
                <p className="text-xs text-gray-400 mb-2">
                  Il est désormais possible d'envoyer une demande de messe depuis votre position sans vous déplacer.
                </p>
                <a 
                  href="https://bit.ly/demande-ndi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-church-gold hover:text-yellow-300 transition-colors text-xs underline"
                >
                  bit.ly/demande-ndi
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400 mb-2">
            © 2025 Notre Dame de l'Incarnation - Cocody. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-500">
            Paroisse Notre-Dame de l'Incarnation, établie par Son Éminence Jean-Pierre Cardinal KUTWA, alors Archevêque d'Abidjan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
