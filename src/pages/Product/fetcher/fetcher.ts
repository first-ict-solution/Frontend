import apiClient from "@/lib/apiClient";
import type { ApiResponse, PaginatedResponse, Product } from "../type/type";


export const getLatestProducts = async (limit: number = 10): Promise<PaginatedResponse<Product>> => {
  const res = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(`/api/products?limit=${limit}`);
  return res.data.data; 
};


export const getProductDetails = async (slug: string): Promise<Product> => {
  const res = await apiClient.get<ApiResponse<Product>>(`/api/products/${slug}`);
  return res.data.data;
};


export const getRelatedProducts = async (productId: number, categoryId: number): Promise<Product[]> => {
  const res = await apiClient.get<ApiResponse<Product[]>>(
    `/api/related-products/${productId}/${categoryId}`
  );
  return res.data.data;
};
