export type ProductResponse = {
  products: ProductItem[];
  total: number;
}

export type ProductItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

export type CartItem = Pick<ProductItem,
  'id' | 'title' | 'price' | 'discountPercentage'
> & { quantity: number, image: string };