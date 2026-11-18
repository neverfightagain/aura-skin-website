import type { ProductResponse } from "../types";
import {productApi} from "../../../shared/api/productApi.ts";

const CATEGORIES = ['beauty', 'fragrances', 'skin-care']

export const getProducts = async (): Promise<ProductResponse> => {
  const responses = await Promise.all(
      CATEGORIES.map((category) =>
        productApi.get<ProductResponse>(`/products/category/${category}`)
      )
  )

  const products = responses.flatMap((res) => res.data.products)
  const total = responses.reduce((sum, res) => sum + res.data.total, 0);

  return { products, total }

}