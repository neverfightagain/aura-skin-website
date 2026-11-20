import type { ProductItem } from "../../products/types";

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductDetails = ProductItem & {
  brand?: string;
  sku?: string;
  availabilityStatus?: string;
  shippingInformation?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
  reviews?: ProductReview[];
};
