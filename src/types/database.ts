export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  specifications: {
    size?: {
      width: number;
      length: number;
      height: number;
    };
    features?: string[];
    [key: string]: any;
  };
  images: string[];
  videos: string[];
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}