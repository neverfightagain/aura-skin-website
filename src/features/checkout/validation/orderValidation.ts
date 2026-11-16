import { z } from "zod"

export const checkoutValidation = z.object({
  name: z
    .string()
    .min(3, 'Name length must be at least 3 characters!')
    .max(30, 'Name length can`t be more than 30 characters!')
      .trim(),

  email: z
    .email('Enter valid email address!')
    .trim(),

  address: z
    .string()
    .min(3, 'Name length must be at least 3 characters!')
    .trim(),

  postalCode: z
      .string()
      .regex(/^\d{5}$/, 'Enter valid postal code!'),

  city: z
      .string()
      .min(3)
      .max(30)
})

export type Checkout = z.infer <typeof checkoutValidation>