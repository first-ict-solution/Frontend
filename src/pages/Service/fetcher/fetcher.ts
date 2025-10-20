// fetcher/fetcher.ts
import ApiService from "@/services/ApiService";
import type { Service } from "@/types";

export const getLatestServices = async (
  limit: number = 10,
): Promise<{
  services: Service[];
  meta: {
    current_page: number;
    last_page: number;
  };
}> => {
  const res = await ApiService.get(`/api/services?limit=${limit}`);
  return res.data.data;
};

export const getServiceDetails = async (slug: string): Promise<Service> => {
  const res = await ApiService.get(`/api/services/${slug}`);
  return res.data.data;
};

export const getRelatedServices = async (
  serviceId: number,
  categoryId: number,
): Promise<Service[]> => {
  const res = await ApiService.get(
    `/api/related-services/${serviceId}/${categoryId}`,
  );
  return res.data.data;
};
