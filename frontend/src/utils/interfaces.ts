export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  pages: number;
  publishedYear: number;
  price: number;
  createdAt: string;
  coverImage?: string;
}


export interface IPresidentMessage {
  image: string;
  name: string;
  message: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  location: string;
  tags?: string[];
  images: string[];
  mainImage?: string;
  price: number;
  beforeDiscount?: number;
  material?: string;
  dimensions?: string;
  stock: number;
  isFeatured?: boolean;
  isAvailable?: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}