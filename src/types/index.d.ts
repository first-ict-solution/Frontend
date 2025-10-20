export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface Content {
  id: number;
  category_id: number;
  name: string;
  description: string;
  paragraph: string;
  slug: string;
  content_image: string;
  created_at: string;
}

export interface Slider {
  id: number;
  status: number;
  image: Image;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  specification?: string;
  category_id?: number;
  slug?: string;
  price: string;
  discount?: string;
  default_image?: string;
  instock?: number;
  category_name?: string;
  category?: {
    id: number;
    name: string;
    icon?: string;
    root_category_id?: number;
    slug?: string;
  };
  images: {
    id: number;
    image: Image;
  }[];
}

export interface Paper {
  id: string;
  category_id: string;
  name: string;
  paper_image: string;
  paper_file: string;
  description: string;
  downloadable: number;
}

export interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category_name?: string;
  default_image?: string;
  proposal?: string;
  terms?: string;
  features?: string;
  image_description?: string;
  images?: {
    image: Image;
  }[];
}

export interface Team {
  id: number;
  name: string;
  slug: string;
  position: string;
  team_image?: string;
  description?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}
