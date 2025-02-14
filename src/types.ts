export interface UserProfile {
  id: string;
  user_id: string;
  age: number;
  height: number;
  weight: number;
  profession: string;
  activities: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  profile: UserProfile | null;
}