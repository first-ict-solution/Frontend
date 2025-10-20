import ApiService from "@/services/ApiService";
import { ContactMessage } from "@/types";

interface ContactResponse {
  status: boolean;
  message: string;
}

export const sendContactMessage = async (
  data: ContactMessage,
): Promise<ContactResponse> => {
  const res = await ApiService.post("/api/contact", data);
  return res.data;
};
