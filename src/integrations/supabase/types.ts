export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      actualites: {
        Row: {
          auteur_id: string
          contenu: string
          created_at: string | null
          date_publication: string | null
          id: string
          image_url: string | null
          publie: boolean | null
          titre: string
          updated_at: string | null
        }
        Insert: {
          auteur_id: string
          contenu: string
          created_at?: string | null
          date_publication?: string | null
          id?: string
          image_url?: string | null
          publie?: boolean | null
          titre: string
          updated_at?: string | null
        }
        Update: {
          auteur_id?: string
          contenu?: string
          created_at?: string | null
          date_publication?: string | null
          id?: string
          image_url?: string | null
          publie?: boolean | null
          titre?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      calendrier_liturgique: {
        Row: {
          couleur_liturgique: string | null
          created_at: string | null
          date_celebration: string
          description: string | null
          id: string
          nom_celebration: string
          readings: string[] | null
          type_celebration: string
          updated_at: string | null
        }
        Insert: {
          couleur_liturgique?: string | null
          created_at?: string | null
          date_celebration: string
          description?: string | null
          id?: string
          nom_celebration: string
          readings?: string[] | null
          type_celebration: string
          updated_at?: string | null
        }
        Update: {
          couleur_liturgique?: string | null
          created_at?: string | null
          date_celebration?: string
          description?: string | null
          id?: string
          nom_celebration?: string
          readings?: string[] | null
          type_celebration?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      catechistes: {
        Row: {
          actif: boolean | null
          created_at: string | null
          date_inscription: string | null
          experience: string | null
          formation_complete: boolean | null
          id: string
          niveau_responsabilite:
            | Database["public"]["Enums"]["catechese_level"][]
            | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actif?: boolean | null
          created_at?: string | null
          date_inscription?: string | null
          experience?: string | null
          formation_complete?: boolean | null
          id?: string
          niveau_responsabilite?:
            | Database["public"]["Enums"]["catechese_level"][]
            | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actif?: boolean | null
          created_at?: string | null
          date_inscription?: string | null
          experience?: string | null
          formation_complete?: boolean | null
          id?: string
          niveau_responsabilite?:
            | Database["public"]["Enums"]["catechese_level"][]
            | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      catechumenes: {
        Row: {
          annee_suivie: string | null
          catechiste_id: string | null
          classe_scolaire: string | null
          created_at: string | null
          date_bapteme: string | null
          est_baptise: boolean | null
          id: string
          jour_cours: string | null
          lieu_bapteme: string | null
          motivation: string | null
          niveau: Database["public"]["Enums"]["catechese_level"]
          nom_marraine: string | null
          nom_mere: string | null
          nom_parrain: string | null
          nom_pere: string | null
          numero_ndi: string | null
          status: Database["public"]["Enums"]["inscription_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          annee_suivie?: string | null
          catechiste_id?: string | null
          classe_scolaire?: string | null
          created_at?: string | null
          date_bapteme?: string | null
          est_baptise?: boolean | null
          id?: string
          jour_cours?: string | null
          lieu_bapteme?: string | null
          motivation?: string | null
          niveau: Database["public"]["Enums"]["catechese_level"]
          nom_marraine?: string | null
          nom_mere?: string | null
          nom_parrain?: string | null
          nom_pere?: string | null
          numero_ndi?: string | null
          status?: Database["public"]["Enums"]["inscription_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          annee_suivie?: string | null
          catechiste_id?: string | null
          classe_scolaire?: string | null
          created_at?: string | null
          date_bapteme?: string | null
          est_baptise?: boolean | null
          id?: string
          jour_cours?: string | null
          lieu_bapteme?: string | null
          motivation?: string | null
          niveau?: Database["public"]["Enums"]["catechese_level"]
          nom_marraine?: string | null
          nom_mere?: string | null
          nom_parrain?: string | null
          nom_pere?: string | null
          numero_ndi?: string | null
          status?: Database["public"]["Enums"]["inscription_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catechumenes_catechiste_id_fkey"
            columns: ["catechiste_id"]
            isOneToOne: false
            referencedRelation: "catechistes"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          date_traitement: string | null
          email: string
          id: string
          message: string
          nom: string
          sujet: string
          telephone: string | null
          traite: boolean | null
          traite_par: string | null
        }
        Insert: {
          created_at?: string | null
          date_traitement?: string | null
          email: string
          id?: string
          message: string
          nom: string
          sujet: string
          telephone?: string | null
          traite?: boolean | null
          traite_par?: string | null
        }
        Update: {
          created_at?: string | null
          date_traitement?: string | null
          email?: string
          id?: string
          message?: string
          nom?: string
          sujet?: string
          telephone?: string | null
          traite?: boolean | null
          traite_par?: string | null
        }
        Relationships: []
      }
      documents_cours: {
        Row: {
          auteur_id: string
          created_at: string | null
          description: string | null
          fichier_url: string
          id: string
          niveau: string | null
          taille_fichier: number | null
          telechargeable: boolean | null
          titre: string
          type_document: string | null
          type_mime: string | null
          updated_at: string | null
        }
        Insert: {
          auteur_id: string
          created_at?: string | null
          description?: string | null
          fichier_url: string
          id?: string
          niveau?: string | null
          taille_fichier?: number | null
          telechargeable?: boolean | null
          titre: string
          type_document?: string | null
          type_mime?: string | null
          updated_at?: string | null
        }
        Update: {
          auteur_id?: string
          created_at?: string | null
          description?: string | null
          fichier_url?: string
          id?: string
          niveau?: string | null
          taille_fichier?: number | null
          telechargeable?: boolean | null
          titre?: string
          type_document?: string | null
          type_mime?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dons_ligne: {
        Row: {
          created_at: string | null
          donateur_email: string
          donateur_nom: string
          donateur_telephone: string | null
          id: string
          message_donateur: string | null
          methode_paiement: string | null
          montant: number
          reference_transaction: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_session_id: string | null
          type_don: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          donateur_email: string
          donateur_nom: string
          donateur_telephone?: string | null
          id?: string
          message_donateur?: string | null
          methode_paiement?: string | null
          montant: number
          reference_transaction?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_session_id?: string | null
          type_don: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          donateur_email?: string
          donateur_nom?: string
          donateur_telephone?: string | null
          id?: string
          message_donateur?: string | null
          methode_paiement?: string | null
          montant?: number
          reference_transaction?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_session_id?: string | null
          type_don?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      evaluations_catechumenes: {
        Row: {
          annee_scolaire: string
          catechumene_id: string | null
          commentaire: string | null
          created_at: string | null
          id: string
          moyenne_generale: number | null
          note_comportement: number | null
          note_connaissance: number | null
          note_participation: number | null
          present_cours: number | null
          taux_assiduite: number | null
          total_cours: number | null
          trimestre: number | null
          updated_at: string | null
        }
        Insert: {
          annee_scolaire: string
          catechumene_id?: string | null
          commentaire?: string | null
          created_at?: string | null
          id?: string
          moyenne_generale?: number | null
          note_comportement?: number | null
          note_connaissance?: number | null
          note_participation?: number | null
          present_cours?: number | null
          taux_assiduite?: number | null
          total_cours?: number | null
          trimestre?: number | null
          updated_at?: string | null
        }
        Update: {
          annee_scolaire?: string
          catechumene_id?: string | null
          commentaire?: string | null
          created_at?: string | null
          id?: string
          moyenne_generale?: number | null
          note_comportement?: number | null
          note_connaissance?: number | null
          note_participation?: number | null
          present_cours?: number | null
          taux_assiduite?: number | null
          total_cours?: number | null
          trimestre?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_catechumenes_catechumene_id_fkey"
            columns: ["catechumene_id"]
            isOneToOne: false
            referencedRelation: "catechumenes"
            referencedColumns: ["id"]
          },
        ]
      }
      event_inscriptions: {
        Row: {
          commentaire: string | null
          date_inscription: string | null
          event_id: string
          id: string
          status: Database["public"]["Enums"]["inscription_status"] | null
          user_id: string
        }
        Insert: {
          commentaire?: string | null
          date_inscription?: string | null
          event_id: string
          id?: string
          status?: Database["public"]["Enums"]["inscription_status"] | null
          user_id: string
        }
        Update: {
          commentaire?: string | null
          date_inscription?: string | null
          event_id?: string
          id?: string
          status?: Database["public"]["Enums"]["inscription_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_inscriptions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          actif: boolean | null
          created_at: string | null
          created_by: string
          date_debut: string
          date_fin: string | null
          description: string | null
          id: string
          image_url: string | null
          lieu: string | null
          max_participants: number | null
          prix: number | null
          responsable_id: string | null
          titre: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string | null
        }
        Insert: {
          actif?: boolean | null
          created_at?: string | null
          created_by: string
          date_debut: string
          date_fin?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          lieu?: string | null
          max_participants?: number | null
          prix?: number | null
          responsable_id?: string | null
          titre: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Update: {
          actif?: boolean | null
          created_at?: string | null
          created_by?: string
          date_debut?: string
          date_fin?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          lieu?: string | null
          max_participants?: number | null
          prix?: number | null
          responsable_id?: string | null
          titre?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      galerie_media: {
        Row: {
          auteur_id: string
          created_at: string | null
          date_prise: string | null
          description: string | null
          event_id: string | null
          id: string
          publie: boolean | null
          tags: string[] | null
          thumbnail_url: string | null
          titre: string
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          auteur_id: string
          created_at?: string | null
          date_prise?: string | null
          description?: string | null
          event_id?: string | null
          id?: string
          publie?: boolean | null
          tags?: string[] | null
          thumbnail_url?: string | null
          titre: string
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          auteur_id?: string
          created_at?: string | null
          date_prise?: string | null
          description?: string | null
          event_id?: string | null
          id?: string
          publie?: boolean | null
          tags?: string[] | null
          thumbnail_url?: string | null
          titre?: string
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "galerie_media_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      groupe_membres: {
        Row: {
          actif: boolean | null
          date_adhesion: string | null
          groupe_id: string
          id: string
          user_id: string
        }
        Insert: {
          actif?: boolean | null
          date_adhesion?: string | null
          groupe_id: string
          id?: string
          user_id: string
        }
        Update: {
          actif?: boolean | null
          date_adhesion?: string | null
          groupe_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "groupe_membres_groupe_id_fkey"
            columns: ["groupe_id"]
            isOneToOne: false
            referencedRelation: "groupes"
            referencedColumns: ["id"]
          },
        ]
      }
      groupes: {
        Row: {
          actif: boolean | null
          created_at: string | null
          description: string | null
          heure_reunion: string | null
          id: string
          jour_reunion: string | null
          lieu_reunion: string | null
          nom: string
          responsable_id: string | null
          updated_at: string | null
        }
        Insert: {
          actif?: boolean | null
          created_at?: string | null
          description?: string | null
          heure_reunion?: string | null
          id?: string
          jour_reunion?: string | null
          lieu_reunion?: string | null
          nom: string
          responsable_id?: string | null
          updated_at?: string | null
        }
        Update: {
          actif?: boolean | null
          created_at?: string | null
          description?: string | null
          heure_reunion?: string | null
          id?: string
          jour_reunion?: string | null
          lieu_reunion?: string | null
          nom?: string
          responsable_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      intentions_messe: {
        Row: {
          created_at: string | null
          date_messe: string
          date_traitement: string | null
          don_montant: number | null
          email: string
          heure_messe: string | null
          id: string
          intention: string
          nom: string
          status: Database["public"]["Enums"]["inscription_status"] | null
          telephone: string | null
          traite: boolean | null
          traite_par: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_messe: string
          date_traitement?: string | null
          don_montant?: number | null
          email: string
          heure_messe?: string | null
          id?: string
          intention: string
          nom: string
          status?: Database["public"]["Enums"]["inscription_status"] | null
          telephone?: string | null
          traite?: boolean | null
          traite_par?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_messe?: string
          date_traitement?: string | null
          don_montant?: number | null
          email?: string
          heure_messe?: string | null
          id?: string
          intention?: string
          nom?: string
          status?: Database["public"]["Enums"]["inscription_status"] | null
          telephone?: string | null
          traite?: boolean | null
          traite_par?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string | null
          date_inscription: string | null
          email: string
          id: string
          nom: string | null
          prenom: string | null
          subscribed: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_inscription?: string | null
          email: string
          id?: string
          nom?: string | null
          prenom?: string | null
          subscribed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_inscription?: string | null
          email?: string
          id?: string
          nom?: string | null
          prenom?: string | null
          subscribed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          catechumene_id: string | null
          created_at: string | null
          event_id: string | null
          id: string
          methode_paiement: string | null
          montant: number
          reference_transaction: string | null
          service: string
          status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          catechumene_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          methode_paiement?: string | null
          montant: number
          reference_transaction?: string | null
          service: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          catechumene_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          methode_paiement?: string | null
          montant?: number
          reference_transaction?: string | null
          service?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_catechumene_id_fkey"
            columns: ["catechumene_id"]
            isOneToOne: false
            referencedRelation: "catechumenes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      plannings_service: {
        Row: {
          created_at: string | null
          date_service: string
          heure_service: string
          id: string
          notes: string | null
          servant_id: string | null
          statut: string | null
          type_service: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_service: string
          heure_service: string
          id?: string
          notes?: string | null
          servant_id?: string | null
          statut?: string | null
          type_service: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_service?: string
          heure_service?: string
          id?: string
          notes?: string | null
          servant_id?: string | null
          statut?: string | null
          type_service?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plannings_service_servant_id_fkey"
            columns: ["servant_id"]
            isOneToOne: false
            referencedRelation: "servants_messe"
            referencedColumns: ["id"]
          },
        ]
      }
      presences_cours: {
        Row: {
          catechumene_id: string | null
          created_at: string | null
          date_cours: string
          excuse: boolean | null
          id: string
          motif_absence: string | null
          present: boolean | null
        }
        Insert: {
          catechumene_id?: string | null
          created_at?: string | null
          date_cours: string
          excuse?: boolean | null
          id?: string
          motif_absence?: string | null
          present?: boolean | null
        }
        Update: {
          catechumene_id?: string | null
          created_at?: string | null
          date_cours?: string
          excuse?: boolean | null
          id?: string
          motif_absence?: string | null
          present?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "presences_cours_catechumene_id_fkey"
            columns: ["catechumene_id"]
            isOneToOne: false
            referencedRelation: "catechumenes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          adresse: string | null
          avatar_url: string | null
          created_at: string | null
          date_naissance: string | null
          email: string
          id: string
          lieu_naissance: string | null
          nom: string
          prenom: string
          profession: string | null
          telephone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          adresse?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email: string
          id?: string
          lieu_naissance?: string | null
          nom: string
          prenom: string
          profession?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          adresse?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string
          id?: string
          lieu_naissance?: string | null
          nom?: string
          prenom?: string
          profession?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      publications_quotidiennes: {
        Row: {
          auteur_id: string
          contenu: string
          created_at: string | null
          date_publication: string
          id: string
          publie: boolean | null
          titre: string
          type_publication: string
          updated_at: string | null
        }
        Insert: {
          auteur_id: string
          contenu: string
          created_at?: string | null
          date_publication: string
          id?: string
          publie?: boolean | null
          titre: string
          type_publication: string
          updated_at?: string | null
        }
        Update: {
          auteur_id?: string
          contenu?: string
          created_at?: string | null
          date_publication?: string
          id?: string
          publie?: boolean | null
          titre?: string
          type_publication?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      recus_inscription: {
        Row: {
          catechumene_id: string | null
          created_at: string | null
          date_paiement: string
          details_paiement: Json | null
          fichier_recu_url: string | null
          genere_le: string | null
          id: string
          methode_paiement: string | null
          montant_paye: number
          numero_recu: string
        }
        Insert: {
          catechumene_id?: string | null
          created_at?: string | null
          date_paiement: string
          details_paiement?: Json | null
          fichier_recu_url?: string | null
          genere_le?: string | null
          id?: string
          methode_paiement?: string | null
          montant_paye: number
          numero_recu: string
        }
        Update: {
          catechumene_id?: string | null
          created_at?: string | null
          date_paiement?: string
          details_paiement?: Json | null
          fichier_recu_url?: string | null
          genere_le?: string | null
          id?: string
          methode_paiement?: string | null
          montant_paye?: number
          numero_recu?: string
        }
        Relationships: [
          {
            foreignKeyName: "recus_inscription_catechumene_id_fkey"
            columns: ["catechumene_id"]
            isOneToOne: false
            referencedRelation: "catechumenes"
            referencedColumns: ["id"]
          },
        ]
      }
      resources_spirituelles: {
        Row: {
          audio_url: string | null
          auteur_id: string
          contenu: string
          created_at: string | null
          date_publication: string | null
          id: string
          image_url: string | null
          publie: boolean | null
          tags: string[] | null
          titre: string
          type: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          auteur_id: string
          contenu: string
          created_at?: string | null
          date_publication?: string | null
          id?: string
          image_url?: string | null
          publie?: boolean | null
          tags?: string[] | null
          titre: string
          type: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          auteur_id?: string
          contenu?: string
          created_at?: string | null
          date_publication?: string | null
          id?: string
          image_url?: string | null
          publie?: boolean | null
          tags?: string[] | null
          titre?: string
          type?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      sacrements: {
        Row: {
          celebrant: string | null
          created_at: string | null
          date_sacrement: string
          id: string
          lieu: string | null
          marraine: string | null
          notes: string | null
          parrain: string | null
          type_sacrement: string
          user_id: string
        }
        Insert: {
          celebrant?: string | null
          created_at?: string | null
          date_sacrement: string
          id?: string
          lieu?: string | null
          marraine?: string | null
          notes?: string | null
          parrain?: string | null
          type_sacrement: string
          user_id: string
        }
        Update: {
          celebrant?: string | null
          created_at?: string | null
          date_sacrement?: string
          id?: string
          lieu?: string | null
          marraine?: string | null
          notes?: string | null
          parrain?: string | null
          type_sacrement?: string
          user_id?: string
        }
        Relationships: []
      }
      servants_messe: {
        Row: {
          actif: boolean | null
          created_at: string | null
          disponibilites: string[] | null
          email: string | null
          id: string
          niveau_experience: string | null
          nom: string
          prenom: string
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          actif?: boolean | null
          created_at?: string | null
          disponibilites?: string[] | null
          email?: string | null
          id?: string
          niveau_experience?: string | null
          nom: string
          prenom: string
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          actif?: boolean | null
          created_at?: string | null
          disponibilites?: string[] | null
          email?: string | null
          id?: string
          niveau_experience?: string | null
          nom?: string
          prenom?: string
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      catechese_level:
        | "eveil_foi"
        | "ce1_ce2"
        | "cm1_cm2"
        | "college"
        | "lycee"
        | "adulte"
      event_type:
        | "messe"
        | "formation"
        | "pelerinage"
        | "fete"
        | "reunion"
        | "celebration"
        | "autre"
      inscription_status: "pending" | "approved" | "rejected" | "completed"
      payment_status: "pending" | "completed" | "failed" | "cancelled"
      user_role:
        | "super_admin"
        | "cure"
        | "aumonier"
        | "catechiste"
        | "secretaire"
        | "tresorier"
        | "catechumene"
        | "parent"
        | "paroissien"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      catechese_level: [
        "eveil_foi",
        "ce1_ce2",
        "cm1_cm2",
        "college",
        "lycee",
        "adulte",
      ],
      event_type: [
        "messe",
        "formation",
        "pelerinage",
        "fete",
        "reunion",
        "celebration",
        "autre",
      ],
      inscription_status: ["pending", "approved", "rejected", "completed"],
      payment_status: ["pending", "completed", "failed", "cancelled"],
      user_role: [
        "super_admin",
        "cure",
        "aumonier",
        "catechiste",
        "secretaire",
        "tresorier",
        "catechumene",
        "parent",
        "paroissien",
      ],
    },
  },
} as const
