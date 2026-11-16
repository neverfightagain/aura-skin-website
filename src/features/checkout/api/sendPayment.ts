import type {PaymentRequest, Response} from "../types";

export const sendPayment = async (item: PaymentRequest): Promise<Response> => {
  const fakePayload = {...item, id: Date.now()}

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return fakePayload
}