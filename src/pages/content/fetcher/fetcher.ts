import apiClient from "@/lib/apiClient";
import type { ApiResponse, Content } from "../type/type";


export const getLatestContents = async (): Promise<Content[]> => {
    const res = await apiClient.get<ApiResponse<Content[]>>("/api/contents");
    return res.data.data;
};


export const getContentDetails = async (slug: string): Promise<Content> => {
    const res = await apiClient.get<ApiResponse<Content>>(`/api/contents/${slug}`);
    return res.data.data;
};


export const getRelatedContents = async (contentId: number, categoryId: number): Promise<Content[]> => {
    const res = await apiClient.get<ApiResponse<Content[]>>(
        `/api/related-contents/${contentId}/${categoryId}`
    );
    return res.data.data;
};
