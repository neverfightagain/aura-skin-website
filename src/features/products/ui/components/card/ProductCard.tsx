import type {ProductItem} from "../../../types";
import {useState} from "react";
import { useCartStore } from "../../../../cart/model/useCartStore.ts";
import { motion } from "motion/react";
import {Link} from "react-router-dom";

type Props = {
  product: ProductItem;
  index: number;
}

const FALLBACK_IMG = 'https://placehold.co/400x400/222/999?text=No+Photo'

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (col: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: col * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const ProductCard = ({product, index}: Props) => {

  const [cardImg, setCardImg] = useState<string>(product.images[0]);
  const totalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  const addItem = useCartStore((state) => state.addItem)
  const increaseItemQuantity = useCartStore((state) => state.increaseItemQuantity)
  const decreaseItemQuantity = useCartStore((state) => state.decreaseItemQuantity)
  const cartItem = useCartStore((state) => state.cart.find((item) => item.id === product.id))

  return (
    <motion.article
      className='flex flex-col group'
      variants={cardVariants}
      custom={index % 3}
      initial='hidden'
      whileInView='visible'
      viewport={{once: true, amount: 0.2}}
    >
      <Link
          to={`/product/${product.id}`}
      >
      <div className='w-full aspect-4/5 bg-[#ece7df] overflow-hidden flex items-center justify-center'>
        <img
          src={cardImg}
          onError={() => setCardImg(FALLBACK_IMG)}
          alt={product.title}
          loading="lazy"
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>
      </Link>

      <div className='mt-4 flex flex-col'>
        <h3
          className='font-serif text-base sm:text-lg uppercase tracking-[0.06em] text-[#1a1816] truncate text-left'
          title={product.title}
        >
          {product.title}
        </h3>

        <div className='flex items-center justify-between mt-1 text-xs font-sans'>
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

          {cartItem ? (
            <div className='flex items-center gap-2 text-stone-800'>
              <button
                onClick={() => decreaseItemQuantity(product.id)}
                className='w-5 h-5 flex items-center justify-center border border-stone-300 hover:border-stone-800 transition-colors cursor-pointer text-xs'
                aria-label='Decrease quantity'
              >
                -
              </button>
              <span className='text-xs font-medium'>{cartItem.quantity}</span>
              <button
                onClick={() => increaseItemQuantity(product.id)}
                className='w-5 h-5 flex items-center justify-center border border-stone-300 hover:border-stone-800 transition-colors cursor-pointer text-xs'
                aria-label='Increase quantity'
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(product)}
              className='text-xs uppercase tracking-wider font-sans text-stone-800 hover:text-stone-500 cursor-pointer transition-colors'
            >
              Add to bag
            </button>
          )}
        </div>
      </div>

      <div className='w-full border-b border-[#d8d2c8] mt-3.5'></div>
    </motion.article>
  );
}

export default ProductCard