export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          created_at: string
          id: string
          location: unknown
          street_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: unknown
          street_name: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: unknown
          street_name?: string
        }
        Relationships: []
      }
      plots: {
        Row: {
          address: string
          area: number
          created_at: string
          has_storage: boolean | null
          has_water: boolean | null
          host: string
          id: string
          price_per_month: number
        }
        Insert: {
          address: string
          area: number
          created_at?: string
          has_storage?: boolean | null
          has_water?: boolean | null
          host: string
          id?: string
          price_per_month: number
        }
        Update: {
          address?: string
          area?: number
          created_at?: string
          has_storage?: boolean | null
          has_water?: boolean | null
          host?: string
          id?: string
          price_per_month?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_plots_host_fkey"
            columns: ["host"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_spaces_address_fkey"
            columns: ["address"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          }
        ]
      }
      plots_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          plot: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          plot?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          plot?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_plots_images_plot_fkey"
            columns: ["plot"]
            isOneToOne: false
            referencedRelation: "plots"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          created_at: string
          first_name: string
          user_id: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          first_name: string
          user_id: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          first_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_plot_with_location: {
        Args: {
          plot_id: string
        }
        Returns: {
          id: string
          street_name: string
          lat: number
          lng: number
        }[]
      }
      nearby_plots: {
        Args: {
          lat: number
          lng: number
        }
        Returns: {
          id: string
          area: number
          street_name: string
          lat: number
          lng: number
          dist_meters: number
          host_first_name: string
          host_avatar_url: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
