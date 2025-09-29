import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "../type/type";
import type { Product, Service } from "../type/type";

export const searchItems = async (
  query: string
): Promise<{ products: Product[]; services: Service[] }> => {
  const res = await apiClient.get<ApiResponse<{ products: Product[]; services: Service[] }>>(
    `/api/search?q=${encodeURIComponent(query)}`
  );

  return {
    products: res.data.data?.products || [],
    services: res.data.data?.services || [],
  };
};
