import apiClient from "@/lib/apiClient";
import type { ApiResponse, PaginatedResponse, Team } from "../type/type";

// Get latest teams (paginated)
export const getLatestTeams = async (
  limit: number = 10
): Promise<PaginatedResponse<Team>> => {
  const res = await apiClient.get<ApiResponse<PaginatedResponse<Team>>>(
    `/api/teams?limit=${limit}`
  );
  return res.data.data;
};

// Get team details by slug
export const getTeamDetails = async (slug: string): Promise<Team> => {
  const res = await apiClient.get<ApiResponse<Team>>(`/api/teams/${slug}`);
  return res.data.data;
};

// Get related team members
export const getRelatedTeams = async (
  teamId: number,
  position: string
): Promise<Team[]> => {
  const res = await apiClient.get<ApiResponse<Team[]>>(
    `/api/related-teams/${teamId}/${position}`
  );
  return res.data.data;
};
