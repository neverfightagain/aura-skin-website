import type {CartItem} from "../../products/types";
import {getTotalPrice} from "../../../shared/hooks/getTotalPrice.ts";

type Props = {
    item: CartItem
}

const CheckoutCard = ({item}: Props) => {

    const totalPrice = getTotalPrice(item.price, item.discountPercentage, item.quantity)

    return (
        <article className='group flex items-center gap-4 pb-4 border-b border-[#d8d2c8] last:border-b-0 last:pb-0'>
            <div className='w-18 h-18 bg-[#fbf9f5] flex shrink-0 items-center justify-center p-1.5 overflow-hidden'>
                <img
                    className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-105'
                    src={item.image}
                    alt={item.title}
                    loading='lazy'
                />
            </div>

            <div className='flex-1 min-w-0 flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                    <h3
                        className='font-serif uppercase text-sm tracking-[0.06em] text-[#1a1816] truncate text-left'
                        title={item.title}
                    >
                        {item.title}
                    </h3>

                    <span className='block mt-1 text-[11px] uppercase tracking-[0.14em] font-sans text-stone-500'>
                        <span  className='lowercase'>x</span>{item.quantity}
                    </span>
                </div>

                <span className='shrink-0 text-xs font-sans font-medium text-stone-900'>
                    ${totalPrice}
                </span>
            </div>
        </article>
    )
}

export default CheckoutCard