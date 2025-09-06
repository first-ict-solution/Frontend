export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

export interface ContentImage {
    id: number;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface Content {
    id: number;
    category_id: number;
    name: string; 
    description: string;
    paragraph: string;
    slug: string;
    created_at: string;
    updated_at: string;
    image?: ContentImage;
}
