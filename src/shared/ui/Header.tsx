import { Link } from "react-router-dom";
import {useCartStore} from "../../features/cart/model/useCartStore.ts";

const Header = () => {
  const totalItems = useCartStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0))

  return (
    <header className='sticky top-0 z-50 bg-[#fbf9f5] border-b border-[#e5dfd5]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 md:px-12 h-16 sm:h-20 flex items-center justify-between'>
        <div className='flex-1'></div>

        <div className='flex-shrink-0 text-center'>
          <Link
            to='/'
            className='font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.16em] sm:tracking-[0.2em] text-[#1a1816] uppercase hover:opacity-80 transition-opacity'
          >
            AURA SKIN
          </Link>
        </div>

        <div className='flex-1 flex items-center justify-end'>
          <Link
            to='cart'
            className='relative py-0.5 text-xs tracking-[0.12em] sm:tracking-[0.16em] uppercase text-stone-800 font-sans transition-colors after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-stone-800 after:transition-all after:duration-300'
          >
            Cart({totalItems})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;