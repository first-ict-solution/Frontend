export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Paper {
  id: string;              
  category_id: string;     
  name: string;
  paper_image: string;
  paper_file: string;
  description: string;
  downloadable: number;    
  created_at: string;
  updated_at: string;
}

