import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Response } from "../types";
import CongratEmoji from "../../../assets/CongratEmoji.gif";

type Props = {
  order: NonNullable<Response>;
};

const OrderModal = ({ order }: Props) => {

  return (
    <div
      className='fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='order-modal-title'
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className='relative bg-[#fbf9f5] border border-[#d8d2c8] w-full max-w-md p-6 sm:p-8 text-center max-h-[90vh] overflow-y-auto'
      >

        <p className='text-[11px] font-sans uppercase tracking-[0.2em] text-stone-500'>
          Order Confirmed
        </p>

        <img
          src={CongratEmoji}
          alt='Congratulations'
          className='w-16 h-16 mx-auto my-4 object-contain'
        />

        <h2
          id='order-modal-title'
          className='mt-2 font-serif text-2xl sm:text-3xl uppercase tracking-[0.08em] text-[#1a1816] font-normal'
        >
          Congratulations!
        </h2>

        <p className='mt-3 text-xs font-sans leading-relaxed text-stone-600'>
          Order <span className='text-stone-900 font-medium'>№{order.id}</span> has been placed.
          Confirmation details were sent to{" "}
          <span className='text-stone-900 font-medium'>{order.user.email}</span>.
        </p>


        <Link
          to='/'
          className='mt-6 w-full block text-center uppercase font-sans bg-black text-white text-xs tracking-[0.16em] py-3.5 px-4 font-medium transition-colors hover:bg-stone-800'
        >
          Continue shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderModal;
