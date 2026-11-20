import {type SortOption, useFilterStore} from "../model/useFilterStore.ts";
import {motion} from "motion/react";
import { useRef, useEffect } from "react";

type Props = {
    setIsOpen: (isOpen: boolean) => void;
}

const SortDropdown = ({setIsOpen}: Props) => {
    const { sort, setSort } = useFilterStore();

    const SORTOPTIONS: {sortOption: SortOption, label: string}[] = [
        {sortOption: "featured", label: 'price: featured'},
        {sortOption: "price-asc", label: 'price: low to high'},
        {sortOption: "price-desc", label: 'price: high to low'},
    ]

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen])

    return (
        <motion.div
            ref={dropdownRef}
            className='absolute left-0 right-0 top-full mt-1 z-20 bg-[#fbf9f5] border border-stone-400 flex flex-col shadow-sm'
            initial={{ opacity: 0, y: -6}}
            animate={{ opacity: 1, y: 0}}
            exit={{opacity: 0, y: -6}}
            transition={{duration: 0.18}}
        >
            {SORTOPTIONS.map((item) => {
                const iActive = item.sortOption === sort
                return(
                    <button
                        key={item.sortOption}
                        type='button'
                        onClick={() => {
                            setSort(item.sortOption)
                            setIsOpen(false)
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors cursor-pointer flex items-center justify-between ${
                            iActive
                                ? 'bg-stone-200/60 text-[#1a1816] font-medium'
                                : 'text-stone-700 hover:bg-stone-100 hover:text-[#1a1816]'
                        }`}
                    >
                        <span>{item.label}</span>
                        {iActive && <span className='w-1.5 h-1.5 rounded-full bg-[#1a1816]' />}
                    </button>
                )
            })}

        </motion.div>
    )
}

export default SortDropdown