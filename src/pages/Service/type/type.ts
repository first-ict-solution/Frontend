export interface ServiceImage {
  id: number;
  service_id?: number;
  image_id?: number;
  image: {
    id: number;
    url: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  category_id: number;
  category_name?: string;
  default_image?: string;
  proposal?: string;
  terms?: string;
  features?: string;
  image_description?: string;
  images?: ServiceImage[];
}


export interface ServicePaginatedResponse {
  services: Service[];
  meta: {
    current_page: number;
    last_page: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  errors: any[];
  message: string;
  condition: boolean;
}