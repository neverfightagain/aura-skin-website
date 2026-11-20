import type { ProductDetails } from "../types";
import {productApi} from "../../../shared/api/productApi.ts";

export const getProduct = async (productId: string): Promise<ProductDetails> => {
    const response = await productApi.get(`/products/${productId}`);

    return response.data
}