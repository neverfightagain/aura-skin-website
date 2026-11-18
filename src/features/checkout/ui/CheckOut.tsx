import { useState } from 'react';
import { useCartStore } from "../../cart/model/useCartStore.ts";
import { useForm } from 'react-hook-form'
import {type Checkout, checkoutValidation} from "../validation/orderValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import MainTitle from "../../../shared/ui/MainTitle.tsx";
import Input from "./components/Input.tsx";
import CheckoutCard from "./components/CheckoutCard.tsx";
import OrderModal from "./components/OrderModal.tsx";
import type {PaymentRequest, Response} from "../types";
import {sendPayment} from "../api/sendPayment.ts";
import { motion } from "motion/react";

const CheckOut = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const totalPrice = getTotalPrice();

  const [createdOrder, setCreatedOrder] = useState<Response | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Checkout>({
    resolver: zodResolver(checkoutValidation),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
    }
  })

  const onSubmit = async (data: Checkout) => {
    const totalPayload: PaymentRequest = {
      user: data,
      items: cart,
      total: getTotalPrice(),
    }

    const response = await sendPayment(totalPayload)

    clearCart()
    setCreatedOrder(response)
  }


 return (
   <section className='pb-16'>
     <MainTitle
       text={'checkout'}
     />

     <main className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-8 md:px-12'>
       <form
         id='checkout-form'
         onSubmit={handleSubmit(onSubmit)}
         noValidate
         className='lg:col-span-8 flex flex-col gap-10 sm:gap-12'
       >
         <motion.div
             className='flex flex-col gap-5'
             initial={{opacity: 0, y: 50}}
             animate={{opacity: 1, y: 0}}
             transition={{duration: 0.5}}
         >
           <h2 className='font-serif text-xl sm:text-2xl tracking-[0.08em] text-[#1a1816] uppercase font-normal text-left pb-3 border-b border-[#d8d2c8]'>
             contact information
           </h2>

           <Input
             name={'email'}
             type={'email'}
             autoComplete={'email'}
             placeholder={'Your email'}
             register={register}
             error={errors.email?.message}
           />
         </motion.div>

         <motion.div
             className='flex flex-col gap-5'
             initial={{opacity: 0, y: 50}}
             animate={{opacity: 1, y: 0}}
             transition={{duration: 0.5}}
         >
           <h2 className='font-serif text-xl sm:text-2xl tracking-[0.08em] text-[#1a1816] uppercase font-normal text-left pb-3 border-b border-[#d8d2c8]'>
             shipping details
           </h2>

           <div className='flex flex-col gap-4'>
             <Input
               name={'name'}
               autoComplete={'name'}
               placeholder={'Your name'}
               register={register}
               error={errors.name?.message}
             />
             <Input
               name={'address'}
               autoComplete={'street-address'}
               placeholder={'Shipping address'}
               register={register}
               error={errors.address?.message}
             />
             <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
               <Input
                 name={'city'}
                 autoComplete={'address-level2'}
                 placeholder={'City'}
                 register={register}
                 error={errors.city?.message}
               />
               <Input
                 name={'postalCode'}
                 autoComplete={'postal-code'}
                 placeholder={'Postal Code'}
                 register={register}
                 error={errors.postalCode?.message}
               />
             </div>
           </div>
         </motion.div>

         <motion.div
             className='pt-2'
             initial={{opacity: 0, y: 50}}
             animate={{opacity: 1, y: 0}}
             transition={{duration: 0.5}}
         >
           <Link
             to='/cart'
             className='inline-block text-xs tracking-[0.16em] uppercase font-sans text-stone-500 hover:text-stone-900 transition-colors'
           >
             ← Return to cart
           </Link>
         </motion.div>
       </form>

       <motion.aside
           className='lg:col-span-4 bg-[#ede6dc] p-6 sm:p-8 h-fit lg:sticky top-28'
           initial={{opacity: 0, y: 50}}
           animate={{opacity: 1, y: 0}}
           transition={{duration: 0.5}}
       >
         <h2 className='font-serif text-xl sm:text-2xl tracking-[0.08em] text-[#1a1816] uppercase font-normal text-left mb-6 sm:mb-8'>
           ORDER SUMMARY
         </h2>

         {cart.length === 0 ? (
           <div className='py-6 border-y border-[#d8d2c8] text-center'>
             <p className='text-xs tracking-[0.14em] uppercase font-sans text-stone-500'>
               Your cart is empty
             </p>
             <Link
               to='/'
               className='mt-3 inline-block text-xs tracking-[0.16em] uppercase font-sans text-stone-800 underline underline-offset-4 hover:text-stone-500 transition-colors'
             >
               Start shopping
             </Link>
           </div>
         ) : (
           <div className='flex flex-col gap-4 max-h-80 overflow-y-auto pr-1'>
             {cart.map((item) => (
               <CheckoutCard key={item.id} item={item} />
             ))}
           </div>
         )}

         <div className='border-t border-[#d8d2c8] mt-6 pt-6 flex flex-col gap-3 text-xs tracking-wider uppercase font-sans text-stone-600'>
           <div className='flex justify-between items-center'>
             <span>SUBTOTAL:</span>
             <span className='text-stone-900 font-medium'>${totalPrice.toFixed(2)}</span>
           </div>

           <div className='flex justify-between items-center'>
             <span>SHIPPING:</span>
             <span className='text-stone-900 font-medium normal-case'>Free</span>
           </div>
         </div>

         <div className='border-t border-[#d8d2c8] mt-6 pt-6 flex justify-between items-center text-xs tracking-wider uppercase font-sans text-stone-900 font-semibold'>
           <span>TOTAL:</span>
           <span>${totalPrice.toFixed(2)}</span>
         </div>

         <button
           type='submit'
           form='checkout-form'
           disabled={isSubmitting || cart.length === 0}
           className='mt-8 w-full flex items-center justify-center gap-2 uppercase font-sans bg-black text-white text-xs tracking-[0.16em] py-3.5 px-4 font-medium transition-colors hover:bg-stone-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
         >
           {isSubmitting ? (
             <>
               <Loader2 className='w-3.5 h-3.5 animate-spin' />
               <span>PROCESSING...</span>
             </>
           ) : (
             'COMPLETE ORDER'
           )}
         </button>
       </motion.aside>
     </main>

     {createdOrder && (
       <OrderModal order={createdOrder} />
     )}
   </section>
 )
}

export default CheckOut