import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Accueil',
    description: 'Bienvenue à la paroisse Notre Dame de l\'Incarnation - Riviera Palmeraie, Cocody, Abidjan. Catéchèse, messes, sacrements et vie communautaire.',
  },
  '/histoire': {
    title: 'Histoire',
    description: 'Découvrez l\'histoire de la paroisse Notre Dame de l\'Incarnation de Cocody.',
  },
  '/actualites': {
    title: 'Actualités',
    description: 'Dernières nouvelles et annonces de la paroisse Notre Dame de l\'Incarnation.',
  },
  '/catechese': {
    title: 'Catéchèse',
    description: 'Inscriptions et programmes de catéchèse pour enfants et adultes à la paroisse NDI.',
  },
  '/groupes': {
    title: 'Groupes Paroissiaux',
    description: 'Rejoignez nos groupes de prière, mouvements de jeunes et communautés paroissiales.',
  },
  '/activites': {
    title: 'Activités & Services',
    description: 'Horaires des messes, événements et services de la paroisse NDI Cocody.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Contactez la paroisse Notre Dame de l\'Incarnation - Riviera Palmeraie, Cocody.',
  },
  '/evenements': {
    title: 'Événements',
    description: 'Calendrier des événements et célébrations de la paroisse NDI.',
  },
  '/sacrements': {
    title: 'Sacrements',
    description: 'Baptême, mariage, confirmation et autres sacrements à la paroisse NDI.',
  },
  '/permanences': {
    title: 'Permanences des Pères',
    description: 'Horaires de disponibilité des prêtres de la paroisse NDI.',
  },
  '/secretariat': {
    title: 'Secrétariat',
    description: 'Horaires et services du secrétariat paroissial.',
  },
  '/newsletter': {
    title: 'Newsletter',
    description: 'Abonnez-vous à la newsletter de la paroisse NDI.',
  },
  '/intentions-messe': {
    title: 'Demandes de Messe',
    description: 'Soumettez vos intentions de messe en ligne.',
  },
  '/benedictions': {
    title: 'Bénédictions',
    description: 'Services de bénédictions de la paroisse NDI.',
  },
  '/librairie-caritas': {
    title: 'Librairie & Caritas',
    description: 'Articles religieux et actions caritatives de la paroisse NDI.',
  },
  '/calendrier-liturgique': {
    title: 'Calendrier Liturgique',
    description: 'Calendrier des célébrations liturgiques de la paroisse NDI.',
  },
  '/dons-en-ligne': {
    title: 'Dons en Ligne',
    description: 'Faites un don en ligne à la paroisse Notre Dame de l\'Incarnation.',
  },
  '/dashboard': {
    title: 'Mon Espace',
    description: 'Accédez à votre espace personnel sur le site de la paroisse NDI.',
  },
  '/parametres': {
    title: 'Paramètres',
    description: 'Gérez vos paramètres de compte.',
  },
};

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMeta[pathname] || { title: 'Page', description: '' };
    document.title = `${meta.title} | Paroisse Notre Dame de l'Incarnation - Cocody`;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    }
  }, [pathname]);
}
