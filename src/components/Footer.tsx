
import { Church, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo et Description */}
          <div>
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
            <p className="text-gray-300 mb-6">
              Une communauté vivante qui accueille tous ceux qui cherchent Dieu. 
              Venez découvrir la joie de la foi partagée et grandir ensemble dans l'amour du Christ.
            </p>
            
            {/* Contact rapide */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-church-gold" />
                <span className="text-sm text-gray-300">+225 27 22 44 55 66</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-church-gold" />
                <span className="text-sm text-gray-300">contact@ndincarnation-cocody.ci</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 hover:text-church-gold cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-church-gold cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-church-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Horaires des Messes */}
          <div>
            <h4 className="text-lg font-semibold text-church-gold mb-4">Horaires des Messes</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <div className="font-semibold text-church-gold mb-1">Lundi au Vendredi</div>
                <div>06h15 • 12h15 • 19h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Samedi Matin</div>
                <div>07h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Samedi Soir (Anticipée)</div>
                <div>19h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Dimanche</div>
                <div>06h30 • 08h15 • 09h45 • 11h15 • 19h00</div>
              </div>
              <div>
                <div className="font-semibold text-church-gold mb-1">Jour Férié</div>
                <div>08h00 (Messe unique)</div>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="font-semibold text-church-gold mb-1">Messe pour les Défunts</div>
                <div className="text-xs text-gray-400">2ème Vendredi du mois à 19h00</div>
              </div>
            </div>
          </div>

          {/* Services et Localisation */}
          <div>
            <h4 className="text-lg font-semibold text-church-gold mb-4">Nos Services</h4>
            <div className="space-y-3 text-sm text-gray-300 mb-6">
              <div>• Catéchèse pour tous âges</div>
              <div>• Préparation aux sacrements</div>
              <div>• Groupes de prière et de partage</div>
              <div>• Activités familiales</div>
              <div>• Librairie religieuse</div>
              <div>• Actions caritatives</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-church-gold mb-3">📍 Notre Localisation</h5>
              <p className="text-xs text-gray-300 mb-3">
                Riviera Palmeraie, non loin du rond-point<br />
                Cocody, Abidjan - Côte d'Ivoire
              </p>
              <div className="bg-gray-700 rounded p-3">
                <div className="font-medium text-church-gold text-xs mb-1">Demandes de Messe en Ligne</div>
                <p className="text-xs text-gray-400 mb-2">
                  Faites vos demandes de messe facilement depuis chez vous
                </p>
                <a 
                  href="https://bit.ly/demande-ndi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-church-gold hover:text-yellow-300 transition-colors text-xs underline"
                >
                  → Faire une demande
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
