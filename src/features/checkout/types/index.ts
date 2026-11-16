import type {CartItem} from "../../products/types";
import type {Checkout} from "../validation/orderValidation.ts";

export type PaymentRequest = {
  user: Checkout
  items: CartItem[]
  total: number
}

export type Response = PaymentRequest & {
  id: number
} | undefined