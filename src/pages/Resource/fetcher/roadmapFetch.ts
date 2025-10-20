import ApiService from "@/services/ApiService";
import type { RoadmapItem } from "@/types";

export const getFullRoadmap = async (): Promise<RoadmapItem[]> => {
  const res = await ApiService.get("/api/roadmap");
  return res.data.data;
};

export const getRoadmapById = async (id: number): Promise<RoadmapItem> => {
  const res = await ApiService.get(`/api/roadmap/${id}`);
  return res.data.data;
};
