// fetcher/fetcher.ts
import apiClient from "@/lib/apiClient";
import type { ApiResponse, Service, ServicePaginatedResponse } from "../type/type";


export const getLatestServices = async (
  limit: number = 10
): Promise<ServicePaginatedResponse> => {
  const res = await apiClient.get<ApiResponse<ServicePaginatedResponse>>(
    `/api/services?limit=${limit}`
  );
  return res.data.data; 
};


export const getServiceDetails = async (slug: string): Promise<Service> => {
  const res = await apiClient.get<ApiResponse<Service>>(`/api/services/${slug}`);
  return res.data.data;
};


export const getRelatedServices = async (
  serviceId: number,
  categoryId: number
): Promise<Service[]> => {
  const res = await apiClient.get<ApiResponse<Service[]>>(
    `/api/related-services/${serviceId}/${categoryId}`
  );
  return res.data.data;
};
