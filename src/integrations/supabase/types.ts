export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activites: {
        Row: {
          created_at: string | null
          date_activite: string | null
          description: string | null
          id: string
          lieu: string | null
          organisateur: string | null
          statut: string | null
          titre: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_activite?: string | null
          description?: string | null
          id?: string
          lieu?: string | null
          organisateur?: string | null
          statut?: string | null
          titre: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_activite?: string | null
          description?: string | null
          id?: string
          lieu?: string | null
          organisateur?: string | null
          statut?: string | null
          titre?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      catechistes: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          niveau: string | null
          nom: string
          prenom: string
          statut: string | null
          telephone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          niveau?: string | null
          nom: string
          prenom: string
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          niveau?: string | null
          nom?: string
          prenom?: string
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catechistes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      catechumenes: {
        Row: {
          catechiste_id: string | null
          created_at: string | null
          date_naissance: string | null
          email: string | null
          id: string
          niveau: string | null
          nom: string
          numero_ndi: string | null
          parent_email: string | null
          parent_nom: string | null
          parent_telephone: string | null
          prenom: string
          statut: string | null
          telephone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          catechiste_id?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string | null
          id?: string
          niveau?: string | null
          nom: string
          numero_ndi?: string | null
          parent_email?: string | null
          parent_nom?: string | null
          parent_telephone?: string | null
          prenom: string
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          catechiste_id?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string | null
          id?: string
          niveau?: string | null
          nom?: string
          numero_ndi?: string | null
          parent_email?: string | null
          parent_nom?: string | null
          parent_telephone?: string | null
          prenom?: string
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catechumenes_catechiste_id_fkey"
            columns: ["catechiste_id"]
            isOneToOne: false
            referencedRelation: "catechistes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catechumenes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          approuve_par: string | null
          categorie: string | null
          created_at: string | null
          date_approbation: string | null
          description: string | null
          id: string
          statut: string | null
          titre: string
          type_document: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          approuve_par?: string | null
          categorie?: string | null
          created_at?: string | null
          date_approbation?: string | null
          description?: string | null
          id?: string
          statut?: string | null
          titre: string
          type_document?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          approuve_par?: string | null
          categorie?: string | null
          created_at?: string | null
          date_approbation?: string | null
          description?: string | null
          id?: string
          statut?: string | null
          titre?: string
          type_document?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          catechumene_id: string | null
          commentaire: string | null
          created_at: string | null
          date_evaluation: string
          id: string
          note: number | null
        }
        Insert: {
          catechumene_id?: string | null
          commentaire?: string | null
          created_at?: string | null
          date_evaluation: string
          id?: string
          note?: number | null
        }
        Update: {
          catechumene_id?: string | null
          commentaire?: string | null
          created_at?: string | null
          date_evaluation?: string
          id?: string
          note?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_catechumene_id_fkey"
            columns: ["catechumene_id"]
            isOneToOne: false
            referencedRelation: "catechumenes"
            referencedColumns: ["id"]
          },
        ]
      }
      evenements: {
        Row: {
          created_at: string | null
          date_debut: string
          date_fin: string | null
          description: string | null
          id: string
          lieu: string | null
          titre: string
          type_evenement: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_debut: string
          date_fin?: string | null
          description?: string | null
          id?: string
          lieu?: string | null
          titre: string
          type_evenement?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_debut?: string
          date_fin?: string | null
          description?: string | null
          id?: string
          lieu?: string | null
          titre?: string
          type_evenement?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      evenements_liturgiques: {
        Row: {
          created_at: string | null
          date_evenement: string
          description: string | null
          heure_debut: string | null
          heure_fin: string | null
          id: string
          lieu: string | null
          titre: string
          type_evenement: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_evenement: string
          description?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          lieu?: string | null
          titre: string
          type_evenement?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_evenement?: string
          description?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          lieu?: string | null
          titre?: string
          type_evenement?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      horaires_secretariat: {
        Row: {
          created_at: string | null
          heure_fermeture: string | null
          heure_ouverture: string
          id: string
          jour: string
          pause_debut: string | null
          pause_fin: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          heure_fermeture?: string | null
          heure_ouverture: string
          id?: string
          jour: string
          pause_debut?: string | null
          pause_fin?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          heure_fermeture?: string | null
          heure_ouverture?: string
          id?: string
          jour?: string
          pause_debut?: string | null
          pause_fin?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inscriptions_activites: {
        Row: {
          activite_date: string | null
          activite_lieu: string | null
          activite_titre: string
          activite_type: string | null
          created_at: string
          date_inscription: string
          date_rappel: string | null
          id: string
          notes: string | null
          rappel_envoye: boolean | null
          statut: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activite_date?: string | null
          activite_lieu?: string | null
          activite_titre: string
          activite_type?: string | null
          created_at?: string
          date_inscription?: string
          date_rappel?: string | null
          id?: string
          notes?: string | null
          rappel_envoye?: boolean | null
          statut?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activite_date?: string | null
          activite_lieu?: string | null
          activite_titre?: string
          activite_type?: string | null
          created_at?: string
          date_inscription?: string
          date_rappel?: string | null
          id?: string
          notes?: string | null
          rappel_envoye?: boolean | null
          statut?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inscriptions_activites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      intentions_messe: {
        Row: {
          created_at: string | null
          date_demandee: string | null
          email: string | null
          id: string
          intention: string
          montant: number | null
          nom: string
          prenom: string
          statut: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_demandee?: string | null
          email?: string | null
          id?: string
          intention: string
          montant?: number | null
          nom: string
          prenom: string
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_demandee?: string | null
          email?: string | null
          id?: string
          intention?: string
          montant?: number | null
          nom?: string
          prenom?: string
          statut?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          contenu: string
          created_at: string | null
          destinataire_id: string | null
          expediteur_id: string | null
          id: string
          lu: boolean | null
          sujet: string | null
          updated_at: string | null
        }
        Insert: {
          contenu: string
          created_at?: string | null
          destinataire_id?: string | null
          expediteur_id?: string | null
          id?: string
          lu?: boolean | null
          sujet?: string | null
          updated_at?: string | null
        }
        Update: {
          contenu?: string
          created_at?: string | null
          destinataire_id?: string | null
          expediteur_id?: string | null
          id?: string
          lu?: boolean | null
          sujet?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_destinataire_id_fkey"
            columns: ["destinataire_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_expediteur_id_fkey"
            columns: ["expediteur_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_abonnes: {
        Row: {
          created_at: string | null
          date_inscription: string | null
          email: string
          id: string
          nom: string | null
          prenom: string | null
          statut: string | null
        }
        Insert: {
          created_at?: string | null
          date_inscription?: string | null
          email: string
          id?: string
          nom?: string | null
          prenom?: string | null
          statut?: string | null
        }
        Update: {
          created_at?: string | null
          date_inscription?: string | null
          email?: string
          id?: string
          nom?: string | null
          prenom?: string | null
          statut?: string | null
        }
        Relationships: []
      }
      paiements: {
        Row: {
          created_at: string | null
          id: string
          montant: number
          reference: string | null
          statut: string | null
          type_paiement: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          montant: number
          reference?: string | null
          statut?: string | null
          type_paiement?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          montant?: number
          reference?: string | null
          statut?: string | null
          type_paiement?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paiements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      permanences_peres: {
        Row: {
          created_at: string | null
          heure_debut: string
          heure_fin: string | null
          id: string
          jour: string
          pretre: string
          type_permanence: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          heure_debut: string
          heure_fin?: string | null
          id?: string
          jour: string
          pretre: string
          type_permanence: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          heure_debut?: string
          heure_fin?: string | null
          id?: string
          jour?: string
          pretre?: string
          type_permanence?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      presences: {
        Row: {
          catechumene_id: string | null
          created_at: string | null
          date_presence: string
          id: string
          present: boolean | null
        }
        Insert: {
          catechumene_id?: string | null
          created_at?: string | null
          date_presence: string
          id?: string
          present?: boolean | null
        }
        Update: {
          catechumene_id?: string | null
          created_at?: string | null
          date_presence?: string
          id?: string
          present?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "presences_catechumene_id_fkey"
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
          email: string | null
          id: string
          nom: string | null
          prenom: string | null
          profession: string | null
          role: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          adresse?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string | null
          id: string
          nom?: string | null
          prenom?: string | null
          profession?: string | null
          role?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          adresse?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string | null
          id?: string
          nom?: string | null
          prenom?: string | null
          profession?: string | null
          role?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sacrements: {
        Row: {
          created_at: string | null
          description: string | null
          horaires: string | null
          id: string
          notes: string | null
          pieces_requises: string[] | null
          tarifs: string | null
          titre: string
          type_sacrement: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          horaires?: string | null
          id?: string
          notes?: string | null
          pieces_requises?: string[] | null
          tarifs?: string | null
          titre: string
          type_sacrement: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          horaires?: string | null
          id?: string
          notes?: string | null
          pieces_requises?: string[] | null
          tarifs?: string | null
          titre?: string
          type_sacrement?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_document: {
        Args: { approver_id: string; document_id: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "admin"
        | "catechiste"
        | "catechumene"
        | "parent"
        | "cure"
        | "aumonier"
        | "member"
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
      app_role: [
        "admin",
        "catechiste",
        "catechumene",
        "parent",
        "cure",
        "aumonier",
        "member",
      ],
    },
  },
} as const
