import apiClient from "@/lib/apiClient";
import type { RoadmapItem, ApiResponse } from "../type/roadmapType";


export const getFullRoadmap = async (): Promise<RoadmapItem[]> => {
  const res = await apiClient.get<ApiResponse<RoadmapItem[]>>("/api/roadmap");
  return res.data.data;
};


export const getRoadmapById = async (id: number): Promise<RoadmapItem> => {
  const res = await apiClient.get<ApiResponse<RoadmapItem>>(`/api/roadmap/${id}`);
  return res.data.data;
};
