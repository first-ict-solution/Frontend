// types.ts

export interface Product {
  id: number;
  name: string;
  description?: string;
  specification?: string;
  category_id?: number;
  slug?: string;
  price: string;          
  discount?: string;      
  default_image?: string; 
  instock?: number;       
  category_name?: string;
  category?: {
    id: number;
    name: string;
    icon?: string;
    root_category_id?: number;
    slug?: string;
    created_at?: string;
    updated_at?: string;
  };
  images?: Array<{
    id: number;
    product_id: number;
    image_id: number;
    created_at?: string;
    updated_at?: string;
    image: {
      id: number;
      url: string;
      created_at?: string;
      updated_at?: string;
    };
  }>; 
}



export interface PaginatedResponse<T> {
  products: T[];
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
