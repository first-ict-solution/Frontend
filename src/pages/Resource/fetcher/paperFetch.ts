import ApiService from "@/services/ApiService";
import type { Paper } from "@/types";

export const getLatestPapers = async (): Promise<Paper[]> => {
  const res = await ApiService.get("/api/papers");
  return res.data.data;
};

export const getPaperDetails = async (slug: string): Promise<Paper> => {
  const res = await ApiService.get(`/api/papers/${slug}`);
  return res.data.data;
};

export const getRelatedPapers = async (
  paperId: string,
  categoryId: string,
): Promise<Paper[]> => {
  const res = await ApiService.get(
    `/api/related-papers/${paperId}/${categoryId}`,
  );
  return res.data.data;
};
