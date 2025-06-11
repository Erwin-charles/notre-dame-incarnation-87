
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
                <span className="text-sm text-gray-300">Cocody Palmeraie<br />Abidjan, Côte d'Ivoire</span>
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
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Samedi:</span>
                <span>18h30</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche:</span>
                <span>7h - 9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Semaine:</span>
                <span>6h30 - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Permanences:</span>
                <span>8h - 12h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Notre Dame de l'Incarnation - Cocody. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
