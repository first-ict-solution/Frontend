import ApiService from "@/services/ApiService";
import { Product, Service } from "@/types";

export const searchItems = async (
  query: string,
): Promise<{ products: Product[]; services: Service[] }> => {
  const res = await ApiService.get(
    `/api/search?q=${encodeURIComponent(query)}`,
  );

  return {
    products: res.data.data?.products || [],
    services: res.data.data?.services || [],
  };
};
