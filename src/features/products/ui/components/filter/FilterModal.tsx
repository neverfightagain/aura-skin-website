import {type CategoryOption, type SortOption, useFilterStore} from "./model/useFilterStore.ts";
import {motion, AnimatePresence} from 'motion/react'
import Input from "./Input.tsx";
import FilterButton from "./FilterButton.tsx";
import SortDropdown from "./SortDropown.tsx";
import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

type Props = {
    closeModal: (value: boolean) => void
}

const SORT_LABELS: Record<SortOption, string> = {
    featured: 'price: featured',
    'price-asc': 'price: low to high',
    'price-desc': 'price: high to low',
}

const FilterModal = ({closeModal}: Props) => {
    const {
        category,
        sort,
        minPrice,
        maxPrice,
        setCategory,
        setMinPrice,
        setMaxPrice,
        setDefault } = useFilterStore()

    const CATEGORIES: {category: CategoryOption, label: string}[] = [
        {category: 'all', label: 'all'},
        {category: 'beauty', label: 'beauty'},
        {category: 'fragrances', label: 'fragrances'},
        {category: 'skin-care', label: 'skin care'}
    ]

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    useEffect(() => {
        const escapeKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal(false)
            }
        }

        window.addEventListener('keydown', escapeKeyDown)

        return () => window.removeEventListener('keydown', escapeKeyDown)
    }, [])

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.25}}
            exit={{
                opacity: 0
            }}
            className='fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-xs'
            onClick={() => closeModal(false)}
        >
            <motion.aside
                initial={{x: 500}}
                animate={{x: 0}}
                transition={{duration: 0.25}}
                exit={{
                    x: 500
                }}
                className='w-full max-w-sm sm:max-w-md h-full bg-[#fbf9f5] border-l border-[#d8d2c8] flex flex-col'
                onClick={(e) => e.stopPropagation()}
            >

                <div className='sticky top-0 z-10 bg-[#fbf9f5] px-6 py-5 border-b border-[#e5dfd5] flex items-center justify-between'>
                    <h2 className='uppercase font-serif text-2xl sm:text-3xl tracking-[0.08em] text-[#1a1816] font-normal'>
                        filters
                    </h2>
                    <button
                        type='button'
                        onClick={() => closeModal(false)}
                        className='flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-stone-700 hover:text-[#1a1816] transition-colors cursor-pointer'
                        aria-label='Close filters'
                    >
                        <span>close</span>
                        <X className='w-3.5 h-3.5 stroke-[1.5]' />
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto px-6 py-6 space-y-8'>
                    <div>
                        <p className='text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-3'>
                            category
                        </p>
                        <div className='flex flex-col'>
                            {CATEGORIES.map((item) => {
                                const isActive = category === item.category
                                return (
                                    <FilterButton
                                        key={item.category}
                                        onClick={() => setCategory(item.category)}
                                        label={item.label}
                                        isActive={isActive}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <div className='relative'>
                        <p className='text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-3'>
                            sort by
                        </p>
                        <button
                            type='button'
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={() => setIsDropDownOpen((prev) => !prev)}
                            className='w-full flex items-center justify-between px-3.5 py-2.5 border border-stone-400 bg-transparent text-xs uppercase tracking-[0.12em] text-[#1a1816] hover:border-[#1a1816] transition-colors cursor-pointer'
                        >
                            <span>{SORT_LABELS[sort]}</span>
                            <ChevronDown className={`w-4 h-4 text-stone-600 transition-transform duration-200 ${isDropDownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropDownOpen && (
                                <SortDropdown
                                    key='sort-dropdown'
                                    setIsOpen={setIsDropDownOpen}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <div>
                        <p className='text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-3'>
                            price
                        </p>
                        <div className='grid grid-cols-2 gap-6'>
                            <Input
                                label='min'
                                value={minPrice}
                                onChange={setMinPrice}
                            />
                            <Input
                                label='max'
                                value={maxPrice}
                                onChange={setMaxPrice}
                            />
                        </div>
                    </div>
                </div>

                <div className='border-t border-[#e5dfd5] p-6 grid grid-cols-2 gap-3 bg-[#fbf9f5]'>
                    <button
                        type='button'
                        className='w-full py-3 px-4 border border-stone-400 text-[#1a1816] text-xs uppercase tracking-[0.16em] hover:border-[#1a1816] transition-colors cursor-pointer'
                        onClick={setDefault}
                    >
                        clear all
                    </button>
                    <button
                        type='button'
                        className='w-full py-3 px-4 bg-[#1a1816] text-white text-xs uppercase tracking-[0.16em] hover:bg-stone-800 transition-colors cursor-pointer'
                        onClick={() => closeModal(false)}
                    >
                        apply
                    </button>
                </div>
            </motion.aside>
        </motion.div>
    )
}

export default FilterModal