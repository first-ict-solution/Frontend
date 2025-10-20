import type { Slider } from "@/types";
import ApiService from "@/services/ApiService";

export const getSliders = async (): Promise<Slider[]> => {
  const res = await ApiService.get("/api/get-sliders");
  return res.data.data;
};
