// types/slider.ts
export interface SliderImage {
  id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Slider {
  id: number;
  status: number;
  image_id: number;
  image: SliderImage;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  errors: any[];
  message: string;
  condition: boolean;
}