import ApiService from "@/services/ApiService";
import type { Product } from "@/types";

export const getLatestProducts = async (
  limit: number = 10,
): Promise<{
  products: Product[];
  meta: {
    current_page: number;
    last_page: number;
  };
}> => {
  const res = await ApiService.get(`/api/products?limit=${limit}`);
  return res.data.data;
};

export const getProductDetails = async (slug: string): Promise<Product> => {
  const res = await ApiService.get(`/api/products/${slug}`);
  return res.data.data;
};

export const getRelatedProducts = async (
  productId: number,
  categoryId: number,
): Promise<Product[]> => {
  const res = await ApiService.get(
    `/api/related-products/${productId}/${categoryId}`,
  );
  return res.data.data;
};
