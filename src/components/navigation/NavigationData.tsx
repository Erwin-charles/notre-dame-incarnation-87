
import { 
  Church,
  Users,
  Calendar,
  Book,
  User,
  UserPlus,
  UserCheck,
  GraduationCap,
  ClipboardList,
  Heart,
  Home,
  Clock,
  Gift,
  BookOpen,
  Shield,
  Calculator,
  ShoppingCart,
  ListChecks
} from 'lucide-react';

export const menuItems = [
  { 
    id: 'home', 
    label: 'Accueil', 
    icon: Church,
    subItems: [
      { 
        id: 'home-welcome', 
        label: 'Bienvenue', 
        icon: Home,
        description: 'Découvrez notre communauté paroissiale',
        onClick: (onNavigate: (page: string) => void) => onNavigate('home') 
      },
      { 
        id: 'home-history', 
        label: 'Histoire de la Paroisse', 
        icon: BookOpen,
        description: 'L\'histoire de Notre Dame de l\'Incarnation',
        onClick: (onNavigate: (page: string) => void) => onNavigate('histoire') 
      },
      { 
        id: 'home-contact', 
        label: 'Contact', 
        icon: Heart,
        description: 'Contactez notre équipe pastorale à Cocody',
        onClick: (onNavigate: (page: string) => void) => onNavigate('contact') 
      },
    ]
  },
  { 
    id: 'actualites', 
    label: 'Actualités', 
    icon: Calendar,
    subItems: [
      { 
        id: 'actualites-news', 
        label: 'Actualités Paroissiales', 
        icon: Calendar,
        description: 'Dernières nouvelles et annonces de la paroisse',
        onClick: (onNavigate: (page: string) => void) => onNavigate('actualites') 
      },
      { 
        id: 'actualites-newsletter', 
        label: 'Newsletter', 
        icon: BookOpen,
        description: 'Abonnez-vous à notre newsletter paroissiale',
        onClick: (onNavigate: (page: string) => void) => onNavigate('newsletter') 
      },
      { 
        id: 'actualites-intentions', 
        label: 'Demandes de Messe', 
        icon: Heart,
        description: 'Faire une demande de messe pour vos intentions',
        onClick: (onNavigate: (page: string) => void) => onNavigate('intentions-messe') 
      },
      { 
        id: 'actualites-permanences', 
        label: 'Permanences des Pères', 
        icon: Clock,
        description: 'Horaires de disponibilité des Pères',
        onClick: (onNavigate: (page: string) => void) => onNavigate('permanences') 
      },
      { 
        id: 'actualites-secretariat', 
        label: 'Secrétariat', 
        icon: Calendar,
        description: 'Horaires et services du secrétariat',
        onClick: (onNavigate: (page: string) => void) => onNavigate('secretariat') 
      },
      { 
        id: 'actualites-sacrements', 
        label: 'Sacrements', 
        icon: Heart,
        description: 'Baptême, Mariage, Funérailles',
        onClick: (onNavigate: (page: string) => void) => onNavigate('sacrements') 
      }
    ]
  },
  { 
    id: 'catechese', 
    label: 'Catéchèse', 
    icon: Book,
    subItems: [
      { 
        id: 'catechese-inscription', 
        label: 'Inscriptions', 
        icon: ClipboardList,
        description: 'Inscrivez-vous aux parcours de catéchèse',
        onClick: (onNavigate: (page: string) => void) => onNavigate('catechese') 
      },
      { 
        id: 'catechese-pre-inscription', 
        label: 'Pré-inscription Catéchumène', 
        icon: UserPlus,
        description: 'Formulaire complet de pré-inscription catéchumène',
        onClick: (onNavigate: (page: string) => void) => onNavigate('pre-inscription') 
      },
      { 
        id: 'catechese-inscription-catechiste', 
        label: 'Inscription Catéchiste', 
        icon: GraduationCap,
        description: 'Devenir catéchiste dans notre paroisse',
        onClick: (onNavigate: (page: string) => void) => onNavigate('inscription-catechiste') 
      },
      { 
        id: 'catechese-catechistes', 
        label: 'Équipe Catéchistes', 
        icon: Users,
        description: 'Équipe des catéchistes et responsables',
        onClick: (onNavigate: (page: string) => void) => onNavigate('catechistes') 
      },
      { 
        id: 'catechese-documents', 
        label: 'Documents de Cours', 
        icon: BookOpen,
        description: 'Téléchargement et partage de supports pédagogiques',
        onClick: (onNavigate: (page: string) => void) => onNavigate('documents-cours') 
      },
      { 
        id: 'catechese-telechargements', 
        label: 'Centre de Téléchargement', 
        icon: Calculator,
        description: 'Téléversement et gestion de documents',
        onClick: (onNavigate: (page: string) => void) => onNavigate('documents-telechargement') 
      },
      { 
        id: 'catechese-programme', 
        label: 'Programme', 
        icon: Calendar,
        description: 'Programme annuel et calendrier des rencontres',
        onClick: (onNavigate: (page: string) => void) => onNavigate('catechese') 
      },
    ]
  },
  { 
    id: 'groupes', 
    label: 'Groupes', 
    icon: Users,
    subItems: [
      { 
        id: 'groupes-jeunes', 
        label: 'Groupes de Jeunes', 
        icon: UserPlus,
        description: 'Aumônerie et mouvements de jeunes',
        onClick: (onNavigate: (page: string) => void) => onNavigate('groupes') 
      },
      { 
        id: 'groupes-adultes', 
        label: 'Groupes d\'Adultes', 
        icon: Users,
        description: 'Communautés et groupes de partage',
        onClick: (onNavigate: (page: string) => void) => onNavigate('groupes') 
      },
      { 
        id: 'groupes-familles', 
        label: 'Groupes Familiaux', 
        icon: Heart,
        description: 'Rencontres et activités familiales',
        onClick: (onNavigate: (page: string) => void) => onNavigate('groupes') 
      },
      { 
        id: 'groupes-prieres', 
        label: 'Groupes de Prière', 
        icon: Book,
        description: 'Adoration, chapelet et prières communautaires',
        onClick: (onNavigate: (page: string) => void) => onNavigate('groupes') 
      },
    ]
  },
  { 
    id: 'activites', 
    label: 'Services', 
    icon: Calendar,
    subItems: [
      { 
        id: 'activites-messes', 
        label: 'Horaires des Messes', 
        icon: Clock,
        description: 'Horaires des célébrations et offices',
        onClick: (onNavigate: (page: string) => void) => onNavigate('activites') 
      },
      { 
        id: 'activites-evenements', 
        label: 'Événements', 
        icon: Calendar,
        description: 'Fêtes, pèlerinages et événements spéciaux',
        onClick: (onNavigate: (page: string) => void) => onNavigate('evenements') 
      },
      { 
        id: 'activites-sacrements', 
        label: 'Sacrements', 
        icon: Gift,
        description: 'Baptême, mariage, confirmation',
        onClick: (onNavigate: (page: string) => void) => onNavigate('activites') 
      },
      { 
        id: 'activites-benedictions', 
        label: 'Bénédictions', 
        icon: Heart,
        description: 'Bénédictions et célébrations particulières',
        onClick: (onNavigate: (page: string) => void) => onNavigate('benedictions') 
      },
      { 
        id: 'activites-librairie', 
        label: 'Librairie & Caritas', 
        icon: ShoppingCart,
        description: 'Articles religieux et dons pour la solidarité',
        onClick: (onNavigate: (page: string) => void) => onNavigate('librairie-caritas') 
      },
      { 
        id: 'activites-calendrier', 
        label: 'Calendrier Liturgique', 
        icon: Calendar,
        description: 'Calendrier romain et célébrations spéciales',
        onClick: (onNavigate: (page: string) => void) => onNavigate('calendrier-liturgique') 
      },
      { 
        id: 'activites-statistiques', 
        label: 'Statistiques Paroissiales', 
        icon: Calculator,
        description: 'Données et analyse de la vie paroissiale',
        onClick: (onNavigate: (page: string) => void) => onNavigate('statistiques') 
      },
      { 
        id: 'activites-statistiques-inscriptions', 
        label: 'Statistiques des Inscriptions', 
        icon: ListChecks,
        description: 'Analyse des inscriptions aux activités',
        onClick: (onNavigate: (page: string) => void) => onNavigate('statistiques-inscriptions') 
      },
    ]
  },
  { 
    id: 'dashboard', 
    label: 'Espace', 
    icon: User,
    subItems: [
      { 
        id: 'dashboard-catechiste', 
        label: 'Espace Catéchiste', 
        icon: GraduationCap,
        description: 'Outils et ressources pour catéchistes',
        onClick: (onNavigate: (page: string) => void) => onNavigate('dashboard') 
      },
      { 
        id: 'dashboard-catechumene', 
        label: 'Espace Catéchumène', 
        icon: UserCheck,
        description: 'Suivi de votre parcours de foi',
        onClick: (onNavigate: (page: string) => void) => onNavigate('dashboard') 
      },
      { 
        id: 'dashboard-parent', 
        label: 'Espace Parent', 
        icon: Heart,
        description: 'Suivi de la catéchèse de vos enfants',
        onClick: (onNavigate: (page: string) => void) => onNavigate('dashboard') 
      },
      { 
        id: 'dashboard-cure', 
        label: 'Espace Curé', 
        icon: Shield,
        description: 'Administration paroissiale',
        onClick: (onNavigate: (page: string) => void) => onNavigate('dashboard') 
      },
      { 
        id: 'dashboard-admin-inscriptions', 
        label: 'Gestion des Inscriptions', 
        icon: ListChecks,
        description: 'Gérer toutes les inscriptions aux activités',
        onClick: (onNavigate: (page: string) => void) => onNavigate('admin-inscriptions') 
      },
      { 
        id: 'dashboard-denier', 
        label: 'Denier de Culte', 
        icon: Calculator,
        description: 'Carnet informatique - Réservé au clergé',
        onClick: (onNavigate: (page: string) => void) => onNavigate('denier-culte') 
      }
    ]
  }
];
