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
          created_at: string
          date_activite: string
          description: string | null
          heure_debut: string | null
          heure_fin: string | null
          id: string
          lieu: string | null
          places_disponibles: number | null
          responsable_id: string | null
          titre: string
        }
        Insert: {
          created_at?: string
          date_activite: string
          description?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          lieu?: string | null
          places_disponibles?: number | null
          responsable_id?: string | null
          titre: string
        }
        Update: {
          created_at?: string
          date_activite?: string
          description?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          lieu?: string | null
          places_disponibles?: number | null
          responsable_id?: string | null
          titre?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      catechistes: {
        Row: {
          created_at: string
          email: string
          experience: number | null
          id: string
          nom: string
          prenom: string
          specialite: string | null
          telephone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          experience?: number | null
          id?: string
          nom: string
          prenom: string
          specialite?: string | null
          telephone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          experience?: number | null
          id?: string
          nom?: string
          prenom?: string
          specialite?: string | null
          telephone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      catechumenes: {
        Row: {
          created_at: string
          date_naissance: string | null
          email: string | null
          id: string
          niveau: string | null
          nom: string
          parent_email: string | null
          parent_nom: string | null
          parent_telephone: string | null
          prenom: string
          statut: string | null
          telephone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date_naissance?: string | null
          email?: string | null
          id?: string
          niveau?: string | null
          nom: string
          parent_email?: string | null
          parent_nom?: string | null
          parent_telephone?: string | null
          prenom: string
          statut?: string | null
          telephone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date_naissance?: string | null
          email?: string | null
          id?: string
          niveau?: string | null
          nom?: string
          parent_email?: string | null
          parent_nom?: string | null
          parent_telephone?: string | null
          prenom?: string
          statut?: string | null
          telephone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          approuve_par: string | null
          categorie: string | null
          created_at: string
          date_approbation: string | null
          description: string | null
          fichier_url: string | null
          id: string
          statut: string | null
          titre: string
          type_document: string | null
          uploaded_by: string | null
          visibility_level: string | null
        }
        Insert: {
          approuve_par?: string | null
          categorie?: string | null
          created_at?: string
          date_approbation?: string | null
          description?: string | null
          fichier_url?: string | null
          id?: string
          statut?: string | null
          titre: string
          type_document?: string | null
          uploaded_by?: string | null
          visibility_level?: string | null
        }
        Update: {
          approuve_par?: string | null
          categorie?: string | null
          created_at?: string
          date_approbation?: string | null
          description?: string | null
          fichier_url?: string | null
          id?: string
          statut?: string | null
          titre?: string
          type_document?: string | null
          uploaded_by?: string | null
          visibility_level?: string | null
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          catechumene_id: string
          commentaire: string | null
          created_at: string
          date_evaluation: string
          id: string
          niveau: string
          note: number | null
        }
        Insert: {
          catechumene_id: string
          commentaire?: string | null
          created_at?: string
          date_evaluation?: string
          id?: string
          niveau: string
          note?: number | null
        }
        Update: {
          catechumene_id?: string
          commentaire?: string | null
          created_at?: string
          date_evaluation?: string
          id?: string
          niveau?: string
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
      evenements_liturgiques: {
        Row: {
          created_at: string
          date_evenement: string
          description: string | null
          heure_debut: string | null
          heure_fin: string | null
          id: string
          lieu: string | null
          titre: string
          type_evenement: string | null
        }
        Insert: {
          created_at?: string
          date_evenement: string
          description?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          lieu?: string | null
          titre: string
          type_evenement?: string | null
        }
        Update: {
          created_at?: string
          date_evenement?: string
          description?: string | null
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          lieu?: string | null
          titre?: string
          type_evenement?: string | null
        }
        Relationships: []
      }
      inscriptions_activites: {
        Row: {
          activite_id: string
          created_at: string
          id: string
          statut: string | null
          user_id: string
        }
        Insert: {
          activite_id: string
          created_at?: string
          id?: string
          statut?: string | null
          user_id: string
        }
        Update: {
          activite_id?: string
          created_at?: string
          id?: string
          statut?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inscriptions_activites_activite_id_fkey"
            columns: ["activite_id"]
            isOneToOne: false
            referencedRelation: "activites"
            referencedColumns: ["id"]
          },
        ]
      }
      intentions_messe: {
        Row: {
          created_at: string
          date_messe: string | null
          email_demandeur: string | null
          id: string
          intention: string
          montant_don: number | null
          nom_demandeur: string | null
          statut: string | null
          telephone_demandeur: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date_messe?: string | null
          email_demandeur?: string | null
          id?: string
          intention: string
          montant_don?: number | null
          nom_demandeur?: string | null
          statut?: string | null
          telephone_demandeur?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date_messe?: string | null
          email_demandeur?: string | null
          id?: string
          intention?: string
          montant_don?: number | null
          nom_demandeur?: string | null
          statut?: string | null
          telephone_demandeur?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          contenu: string
          created_at: string
          destinataire_id: string | null
          expediteur_id: string
          id: string
          lu: boolean | null
          sujet: string
        }
        Insert: {
          contenu: string
          created_at?: string
          destinataire_id?: string | null
          expediteur_id: string
          id?: string
          lu?: boolean | null
          sujet: string
        }
        Update: {
          contenu?: string
          created_at?: string
          destinataire_id?: string | null
          expediteur_id?: string
          id?: string
          lu?: boolean | null
          sujet?: string
        }
        Relationships: []
      }
      newsletter_abonnes: {
        Row: {
          actif: boolean | null
          created_at: string
          email: string
          id: string
          nom: string | null
          prenom: string | null
        }
        Insert: {
          actif?: boolean | null
          created_at?: string
          email: string
          id?: string
          nom?: string | null
          prenom?: string | null
        }
        Update: {
          actif?: boolean | null
          created_at?: string
          email?: string
          id?: string
          nom?: string | null
          prenom?: string | null
        }
        Relationships: []
      }
      paiements: {
        Row: {
          created_at: string
          id: string
          montant: number
          reference_transaction: string | null
          statut: string | null
          type_paiement: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          montant: number
          reference_transaction?: string | null
          statut?: string | null
          type_paiement?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          montant?: number
          reference_transaction?: string | null
          statut?: string | null
          type_paiement?: string | null
          user_id?: string
        }
        Relationships: []
      }
      presences: {
        Row: {
          catechumene_id: string
          created_at: string
          date_cours: string
          id: string
          present: boolean
        }
        Insert: {
          catechumene_id: string
          created_at?: string
          date_cours: string
          id?: string
          present?: boolean
        }
        Update: {
          catechumene_id?: string
          created_at?: string
          date_cours?: string
          id?: string
          present?: boolean
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
          created_at: string
          email: string
          id: string
          nom: string | null
          prenom: string | null
          role: string | null
          telephone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nom?: string | null
          prenom?: string | null
          role?: string | null
          telephone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nom?: string | null
          prenom?: string | null
          role?: string | null
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
        Args: { document_id: string }
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "catechist" | "user"
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
      app_role: ["admin", "catechist", "user"],
    },
  },
} as const
