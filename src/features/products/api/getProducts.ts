import type { ProductResponse} from "../types";
import {productApi} from "../../../shared/api/productApi.ts";

export const getProducts = async (): Promise<ProductResponse> => {
  const response = await productApi.get<ProductResponse>(`/products`);

  return response.data;
}