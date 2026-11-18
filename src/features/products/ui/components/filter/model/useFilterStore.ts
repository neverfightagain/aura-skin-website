import {create} from 'zustand'

export type CategoryOption = 'all' | 'beauty' | 'fragrances' | 'skin-care'
export type SortOption = 'featured' | 'price-asc' | 'price-desc'

type FilterState = {
    category: CategoryOption
    sort: SortOption
    minPrice: string
    maxPrice: string
    setCategory: (cat: CategoryOption) => void
    setSort: (cat: SortOption) => void
    setMinPrice: (num: string) => void
    setMaxPrice: (num: string) => void
    setDefault: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
    category: 'all',
    sort: "featured",
    minPrice: '',
    maxPrice: '',
    setCategory: (category) => {
       set({ category: category})
    },
    setSort: (category) => {
        set({ sort: category })
    },
    setMinPrice: (number) => {
        if (!/^\d*\.?\d*$/.test(number)) return
        set({minPrice: number})
    },
    setMaxPrice: (number) => {
        if (!/^\d*\.?\d*$/.test(number)) return
        set({maxPrice: number})
    },
    setDefault: () => set({
        category: 'all',
        sort: 'featured',
        minPrice: '',
        maxPrice: '',
    })
}))