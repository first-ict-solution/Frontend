import type { Team } from "@/types";
import ApiService from "@/services/ApiService";

export const getLatestTeams = async (
  limit: number = 10,
): Promise<{
  data: Team[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}> => {
  const res = await ApiService.get(`/api/teams?limit=${limit}`);
  return res.data.data;
};

export const getTeamDetails = async (slug: string): Promise<Team> => {
  const res = await ApiService.get(`/api/teams/${slug}`);
  return res.data.data;
};

export const getRelatedTeams = async (
  teamId: number,
  position: string,
): Promise<Team[]> => {
  const res = await ApiService.get(`/api/related-teams/${teamId}/${position}`);
  return res.data.data;
};
