import apiClient from "@/lib/apiClient";
import type { ContactMessage, ContactResponse } from "../type/type";

export const sendContactMessage = async (
  data: ContactMessage
): Promise<ContactResponse> => {
  const res = await apiClient.post<ContactResponse>("/api/contact", data);
  return res.data;
};
