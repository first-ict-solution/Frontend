import ApiService from "@/services/ApiService";
import type { ContactMessage } from "@/types";

export const sendContactMessage = async (
  data: ContactMessage,
): Promise<{
  status: boolean;
  message: string;
}> => {
  const res = await ApiService.post("/api/contact", data);
  return res.data;
};
