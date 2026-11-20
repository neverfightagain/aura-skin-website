import {useCartStore} from "../model/useCartStore.ts";
import CartCard from "./card/CartCard.tsx";
import { Link } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import MainTitle from "../../../shared/ui/MainTitle.tsx";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const totalPrice = getTotalPrice();

  if(cart.length === 0){
    return(
      <section className='max-w-7xl mx-auto px-4 sm:px-8 md:px-12'>
        <div className='min-h-[50vh] flex flex-col items-center justify-center pt-12 tracking-[0.14em] text-center'>
          <h2 className='uppercase font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1816]'>
            Your cart is empty
          </h2>
          <Link
            to='/'
            className='mt-8 w-full sm:w-auto min-w-[200px] block text-center uppercase font-sans bg-black text-white text-xs tracking-[0.16em] py-3.5 px-6 font-medium transition-colors hover:bg-stone-800'
          >
            Start shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='pb-16'>
      <MainTitle
        text={'Cart'}
      />

        <main className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-8 md:px-12'>
        <div className='lg:col-span-8 flex flex-col gap-6 sm:gap-8'>
          <AnimatePresence mode='popLayout'>
          {cart.map((item) => {
            return (
              <CartCard
                key={item.id}
                product={item}
              />
            )
          })}
          </AnimatePresence>
        </div>

        <div className='bg-[#ede6dc] p-6 sm:p-8 lg:col-span-4 h-fit lg:sticky top-28'>
          <h2 className='font-serif text-xl sm:text-2xl tracking-[0.08em] text-[#1a1816] uppercase font-normal text-left mb-6 sm:mb-8'>
            ORDER SUMMARY
          </h2>

          <div className='flex flex-col gap-3 text-xs tracking-wider uppercase font-sans text-stone-600'>
            <div className='flex justify-between items-center'>
              <span>SUBTOTAL:</span>
              <span className='text-stone-900 font-medium'>${totalPrice.toFixed(2)}</span>
            </div>

            <div className='flex justify-between items-center'>
              <span>SHIPPING:</span>
              <span className='text-stone-900 font-medium normal-case'>Free</span>
            </div>
          </div>

          <div className='mt-8 flex justify-between items-center text-xs tracking-wider uppercase font-sans text-stone-900 font-semibold'>
            <span>TOTAL:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Link
            to='/checkout'
            className='mt-8 w-full block text-center uppercase font-sans bg-black text-white text-xs tracking-[0.16em] py-3.5 px-4 font-medium transition-colors hover:bg-stone-800'
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </main>
    </section>
  )
}

export default Cart;