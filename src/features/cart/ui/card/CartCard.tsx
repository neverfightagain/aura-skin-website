import {useEffect, useState} from 'react'
import {useCartStore} from "../../model/useCartStore.ts";
import type {CartItem} from "../../../products/types";
import { motion } from "framer-motion";
import {getTotalPrice} from "../../../../shared/functions/getTotalPrice.ts";

type Props = {
  product: CartItem,
}

const CartCard = ({product}: Props) => {
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseItemQuantity = useCartStore((state) => state.increaseItemQuantity);
  const decreaseItemQuantity = useCartStore((state) => state.decreaseItemQuantity);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const [inputValue, setInputValue] = useState<string>(String(product.quantity));

  useEffect(() => {
    setInputValue(String(product.quantity))
  }, [product.quantity]);

  const inputChange = () => {
    const parsed = parseInt(inputValue, 10);

    if (isNaN(parsed) || parsed < 1) {
      setInputValue(String(product.quantity));
      return
    }

    updateItemQuantity(product.id, parsed);
  };

  const totalPrice = getTotalPrice(product.price, product.discountPercentage, product.quantity)

  return (
    <motion.article
      className='group border-b border-[#d8d2c8] flex gap-4 sm:gap-6 pb-6 pt-2'
      layout
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: 'auto'}}
      exit={{
        opacity: 0,
        x: -40,
        height: 0,
        marginBottom: 0,
        overflow: 'hidden',
      }}
      transition={{duration: 0.5}}
    >
      <div className='w-24 h-24 sm:w-32 sm:h-32 bg-[#ece7df] flex items-center justify-center shrink-0 p-2'>
        <img
          className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-105'
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className='flex-1 min-w-0 flex flex-col justify-between py-0.5'>
        <div>
          <h2
            className='font-serif uppercase text-sm sm:text-base md:text-lg truncate text-left tracking-[0.06em] text-[#1a1816]'
            title={product.title}
          >
            {product.title}
          </h2>

          <div className='flex items-center mt-1 text-xs font-sans'>
            <div className='flex items-baseline gap-1.5 text-stone-600'>
              {product.discountPercentage === 0 ? (
                <span>${totalPrice}</span>
              ) : (
                <div className='flex items-baseline gap-1.5'>
                  <span className='line-through text-stone-400 text-xs'>${product.price}</span>
                  <span className='text-stone-900 font-medium'>${totalPrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-3'>
          <div className='flex items-center'>
            <button
              onClick={() => decreaseItemQuantity(product.id)}
              className='w-7 h-7 flex items-center justify-center border border-stone-300 hover:border-stone-800 transition-colors cursor-pointer text-xs'
              aria-label='Decrease quantity'
            >
              -
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={inputChange}
              className='border-y border-stone-300 text-xs w-8 h-7 text-center focus:outline-none'
            />
            <button
              onClick={() => increaseItemQuantity(product.id)}
              className='w-7 h-7 flex items-center justify-center border border-stone-300 hover:border-stone-800 transition-colors cursor-pointer text-xs'
              aria-label='Increase quantity'
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(product.id)}
            className='text-[11px] sm:text-xs tracking-[0.16em] uppercase text-stone-500 hover:text-stone-900 transition-colors cursor-pointer text-left w-fit'
          >
            Delete
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default CartCard;