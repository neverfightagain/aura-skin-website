import * as axios from "axios";

export const productApi = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000,
})