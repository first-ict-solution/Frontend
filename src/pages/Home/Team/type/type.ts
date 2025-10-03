export interface Team {
  id: number;
  name: string;
  slug: string;
  position: string;
  team_image?: string;
  description?: string;
  github?: string; 
  linkedin?: string;  
  portfolio?: string;
  created_at?: string;
  updated_at?: string;
}

// You already have:
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
