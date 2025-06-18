
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
  ShoppingCart
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
        onClick: (onNavigate: (page: string) => void) => onNavigate('home') 
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
    label: 'Groupes & Mouvements', 
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
    label: 'Activités & Services', 
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
    ]
  },
  { 
    id: 'dashboard', 
    label: 'Mon Espace', 
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
        id: 'dashboard-denier', 
        label: 'Denier de Culte', 
        icon: Calculator,
        description: 'Carnet informatique - Réservé au clergé',
        onClick: (onNavigate: (page: string) => void) => onNavigate('denier-culte') 
      },
    ]
  },
];
