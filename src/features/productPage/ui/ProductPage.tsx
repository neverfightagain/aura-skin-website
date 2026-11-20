import {useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import { getProduct } from "../api/getProduct.ts";
import {useParams, Link} from "react-router-dom";
import {Loader2, MoveLeftIcon} from "lucide-react";
import UserReview from "./UserReview.tsx";
import {useCartStore} from "../../cart/model/useCartStore.ts";
import {AnimatePresence, motion} from 'motion/react'

const FALLBACK_IMG = 'https://placehold.co/400x500/ece7df/78716c?text=No+Photo';

const ProductPage = () => {

    const { id } = useParams();
    const [activeImg, setActiveImg] = useState(0);
    const [openTab, setOpenTab] = useState<'details' | 'reviews' | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const addItem = useCartStore((state) => state.addItem);
    const increaseItemQuantity = useCartStore((state) => state.increaseItemQuantity);
    const decreaseItemQuantity = useCartStore((state) => state.decreaseItemQuantity);

    const {data: product, isLoading, error, refetch} = useQuery({
        queryFn: () => getProduct(id!),
        queryKey: ["product", id],
        enabled: Boolean(id),
    })

    const cartItem = useCartStore((state) =>
        product ? state.cart.find((item) => item.id === product.id) : undefined
    );

    const toggleTab = (tab: 'details' | 'reviews') => {
        setOpenTab((prev) => (prev === tab ? null : tab));
    };

    const scrollToImage = (index: number) => {
        const el = carouselRef.current;
        if (!el) return;

        el.scrollTo({
            left: index * el.clientWidth,
            behavior: 'smooth',
        });
        setActiveImg(index);
    };

    const handleCarouselScroll = () => {
        const el = carouselRef.current;
        if (!el || el.clientWidth === 0) return;

        const index = Math.round(el.scrollLeft / el.clientWidth);
        if (index !== activeImg) {
            setActiveImg(index);
        }
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 14 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    }

    if (isLoading) {
        return (
            <div className='min-h-[50vh] flex items-center justify-center gap-2 font-serif text-xl tracking-wider text-stone-600'>
                <Loader2 className='w-4 h-4 animate-spin text-stone-600' />
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4'>
                <p className='font-serif text-xl text-stone-700'>
                    There is an error... {error.message}
                </p>
                <button
                    onClick={() => refetch()}
                    className='px-5 py-2 text-xs uppercase tracking-widest border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer'
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className='min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4'>
                <p className='font-serif text-xl text-stone-700 uppercase'>
                    this product is not available right now.
                </p>
                <Link
                    to='/'
                    className='px-5 py-2 text-xs uppercase tracking-widest border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer'
                >
                    go back to store
                </Link>
            </div>
        )
    }


    const totalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const images = product.images.length > 0 ? product.images : [FALLBACK_IMG];
    const reviews = product.reviews ?? [];

    return (
        <motion.section
            className='max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-12'
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className='mb-8 sm:mb-10'
                variants={itemVariants}
            >
                <Link
                    to='/'
                    className='group inline-flex flex-col items-start gap-1.5 text-xs tracking-[0.2em] uppercase font-sans text-stone-500 hover:text-stone-900 transition-colors'
                >
                    <MoveLeftIcon className='w-5 h-5 stroke-[1.1] transition-transform duration-300 group-hover:-translate-x-1' />
                    <span>Return to store</span>
                </Link>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start'>
                <div className='lg:col-span-6'>
                    <motion.div
                        ref={carouselRef}
                        onScroll={handleCarouselScroll}
                        variants={itemVariants}
                        className='flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden'
                    >
                        {images.map((img, index) => (
                            <div
                                key={img + index}
                                className='w-full shrink-0 snap-center aspect-4/5 bg-[#ece7df] flex items-center justify-center overflow-hidden'
                            >
                                <img
                                    className='w-full h-full object-cover'
                                    src={img}
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK_IMG;
                                    }}
                                    alt={`${product.title} ${index + 1}`}
                                />
                            </div>
                        ))}
                    </motion.div>

                    {images.length > 1 && (
                        <div className='flex items-center justify-center gap-3 mt-4'>
                            {images.map((img, index) => (
                                <motion.button
                                    variants={itemVariants}
                                    key={img + index}
                                    type='button'
                                    onClick={() => scrollToImage(index)}
                                    className={`w-14 sm:w-16 aspect-4/5 bg-[#ece7df] overflow-hidden border cursor-pointer transition-opacity ${
                                        activeImg === index
                                            ? 'border-[#1a1816]'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        onError={(e) => {
                                            e.currentTarget.src = FALLBACK_IMG;
                                        }}
                                        alt={`${product.title} thumbnail ${index + 1}`}
                                        className='w-full h-full object-cover'
                                    />
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>

                <div className='lg:col-span-6 flex flex-col'>
                    <motion.span
                        variants={itemVariants}
                        className='text-xs uppercase tracking-[0.18em] text-stone-500 font-sans'
                    >
                        {String(product.id).padStart(2, '0')} / {product.category}
                    </motion.span>

                    <motion.h1
                        variants={itemVariants}
                        className='font-serif text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-[#1a1816] leading-tight mt-3'
                    >
                        {product.title}
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        className='mt-3 flex items-baseline gap-2.5 text-lg sm:text-xl font-sans text-[#1a1816]'
                    >
                        {product.discountPercentage === 0 ? (
                            <span>{totalPrice} USD</span>
                        ) : (
                            <>
                                <span className='line-through text-stone-400 text-base'>
                                    {product.price} USD
                                </span>
                                <span>{totalPrice} USD</span>
                            </>
                        )}
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className='w-full border-b border-[#d8d2c8] my-6'
                    />

                    <motion.p
                        variants={itemVariants}
                        className='text-sm leading-relaxed text-stone-600 font-sans'
                    >
                        {product.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className='mt-8'>
                        {cartItem ? (
                            <div className='w-full h-12 flex items-center justify-between bg-[#1a1816] text-[#fbf9f5] px-5 text-xs uppercase tracking-[0.2em] font-sans'>
                                <button
                                    type='button'
                                    onClick={() => decreaseItemQuantity(product.id)}
                                    className='w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer text-base'
                                    aria-label='Decrease quantity'
                                >
                                    −
                                </button>
                                <span>{cartItem.quantity} in bag</span>
                                <button
                                    type='button'
                                    onClick={() => increaseItemQuantity(product.id)}
                                    className='w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer text-base'
                                    aria-label='Increase quantity'
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                type='button'
                                onClick={() => addItem(product)}
                                className='w-full h-12 flex items-center justify-center bg-[#1a1816] text-[#fbf9f5] text-xs uppercase tracking-[0.2em] font-sans hover:bg-stone-800 transition-colors cursor-pointer'
                            >
                                Add to bag
                            </button>
                        )}
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className='mt-10 border-t border-[#d8d2c8]'
                    >
                        <button
                            type='button'
                            onClick={() => toggleTab('details')}
                            className='w-full py-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#1a1816] font-sans cursor-pointer'
                        >
                            <span>Details &amp; Shipping</span>
                            <span className='text-base font-light'>
                                {openTab === 'details' ? '−' : '+'}
                            </span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openTab === 'details' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    className='overflow-hidden'
                                >
                                    <div className='pb-5 text-xs sm:text-sm text-stone-600 font-sans space-y-2.5'>
                                        {product.brand && (
                                            <div className='flex justify-between gap-4'>
                                                <span className='uppercase tracking-[0.12em] text-stone-400 text-xs'>Brand</span>
                                                <span className='text-right text-[#1a1816]'>{product.brand}</span>
                                            </div>
                                        )}
                                        <div className='flex justify-between gap-4'>
                                            <span className='uppercase tracking-[0.12em] text-stone-400 text-xs'>Availability</span>
                                            <span className='text-right text-[#1a1816]'>
                                                {product.availabilityStatus ?? `${product.stock} in stock`}
                                            </span>
                                        </div>
                                        {product.shippingInformation && (
                                            <div className='flex justify-between gap-4'>
                                                <span className='uppercase tracking-[0.12em] text-stone-400 text-xs'>Shipping</span>
                                                <span className='text-right text-[#1a1816]'>{product.shippingInformation}</span>
                                            </div>
                                        )}
                                        {product.warrantyInformation && (
                                            <div className='flex justify-between gap-4'>
                                                <span className='uppercase tracking-[0.12em] text-stone-400 text-xs'>Warranty</span>
                                                <span className='text-right text-[#1a1816]'>{product.warrantyInformation}</span>
                                            </div>
                                        )}
                                        {product.returnPolicy && (
                                            <div className='flex justify-between gap-4'>
                                                <span className='uppercase tracking-[0.12em] text-stone-400 text-xs'>Returns</span>
                                                <span className='text-right text-[#1a1816]'>{product.returnPolicy}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className='border-y border-[#d8d2c8]'
                    >
                        <button
                            type='button'
                            onClick={() => toggleTab('reviews')}
                            className='w-full py-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#1a1816] font-sans cursor-pointer'
                        >
                            <span>Reviews ({reviews.length})</span>
                            <span className='text-base font-light'>
                                {openTab === 'reviews' ? '−' : '+'}
                            </span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openTab === 'reviews' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    className='overflow-hidden'
                                >
                                    <div className='pb-5 space-y-4 font-sans'>
                                        <div className='flex items-center justify-between text-xs uppercase tracking-[0.14em] text-stone-500'>
                                            <span>Average rating</span>
                                            <span className='text-[#1a1816] font-medium'>
                                                {product.rating.toFixed(1)} / 5
                                            </span>
                                        </div>

                                        {reviews.length === 0 ? (
                                            <p className='text-sm text-stone-500'>No reviews yet.</p>
                                        ) : (
                                            <div className='space-y-3'>
                                                {reviews.map((review, index) => (
                                                    <UserReview
                                                        review={review}
                                                        key={review.reviewerEmail + index}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default ProductPage;