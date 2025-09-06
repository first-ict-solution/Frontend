export interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface FullRoadmap {
  roadmap: RoadmapItem[];
}

export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
