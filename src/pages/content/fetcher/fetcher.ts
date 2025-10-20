import ApiService from "@/services/ApiService";
import type { Content } from "@/types";

export const getLatestContents = async (): Promise<Content[]> => {
  const res = await ApiService.get("/api/contents");
  return res.data.data;
};

export const getContentDetails = async (slug: string): Promise<Content> => {
  const res = await ApiService.get(`/api/contents/${slug}`);
  return res.data.data;
};

export const getRelatedContents = async (
  contentId: number,
  categoryId: number,
): Promise<Content[]> => {
  const res = await ApiService.get(
    `/api/related-contents/${contentId}/${categoryId}`,
  );
  return res.data.data;
};
