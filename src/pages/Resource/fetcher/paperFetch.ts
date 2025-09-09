import apiClient from "@/lib/apiClient";
import type { ApiResponse, Paper } from "../type/paperType";


export const getLatestPapers = async (): Promise<Paper[]> => {
  const res = await apiClient.get<ApiResponse<Paper[]>>("/api/papers");
  return res.data.data; 
};


export const getPaperDetails = async (slug: string): Promise<Paper> => {
  const res = await apiClient.get<ApiResponse<Paper>>(`/api/papers/${slug}`);
  return res.data.data;
};


export const getRelatedPapers = async (
  paperId: string,
  categoryId: string
): Promise<Paper[]> => {
  const res = await apiClient.get<ApiResponse<Paper[]>>(
    `/api/related-papers/${paperId}/${categoryId}`
  );
  return res.data.data;
};
