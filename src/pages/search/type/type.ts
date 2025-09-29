// types.ts
export type Product = {
  id: number;
  name: string;
  slug: string;
  [key: string]: any;
};

export type Service = {
  id: number;
  name: string;
  slug: string;
  [key: string]: any; 
};

export type ApiResponse<T> = {
  status: string;     
  message?: string;  
  data: T;           
};