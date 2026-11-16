import * as axios from "axios";

export const paymentApi = axios.create({
  baseURL: "https://api.stripe.com/v1/",
  timeout: 5000,
})