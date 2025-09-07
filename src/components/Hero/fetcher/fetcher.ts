import apiClient from "@/lib/apiClient";
import type { Slider } from "../type/type";
import type { ApiResponse } from "../type/type";

export const getSliders = async (): Promise<Slider[]> => {
  const res = await apiClient.get<ApiResponse<Slider[]>>("/api/get-sliders");
  return res.data.data; 
};
