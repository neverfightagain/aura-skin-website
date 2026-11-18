import {useQuery} from "@tanstack/react-query";
import {getProducts} from "../api/getProducts.ts";
import ProductCard from "./components/ProductCard.tsx";
import MainTitle from "../../../shared/ui/MainTitle.tsx";
import {motion} from "framer-motion";
import { AnimatePresence } from "motion/react";
import {useFilterStore} from "./components/filter/model/useFilterStore.ts";
import {useState} from "react";
import FilterModal from "./components/filter/FilterModal.tsx";
import SadEmoji from "../../../assets/SadEmoji.gif"
import {Loader2} from "lucide-react";


const MainStore = () => {

  const {
      category,
      sort,
      minPrice,
      maxPrice,
      setDefault } = useFilterStore()

  const { data: products, isLoading, isError, error, refetch} = useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
  })

  const filteredProducts = (products?.products ?? [])
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) => !minPrice || p.price >= Number(minPrice))
      .filter((p) => !maxPrice || p.price <= Number(maxPrice))
      .sort((a, b) => {
          if (sort === 'price-asc') return a.price - b.price;
          if (sort === 'price-desc') return b.price - a.price;
          return 0
      })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const totalProducts = filteredProducts.reduce((total) => total + 1, 0)


  if (isLoading) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center font-serif text-xl tracking-wider text-stone-600'>
          <Loader2 className='w-3.5 h-3.5 animate-spin text-stone-600' />
        Loading...
      </div>
    );
  }

  if (isError) {
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

  return (
    <section className='max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center pb-24'>
      <MainTitle
        text={'THE NOURISHING SERIES'}
      />

        <motion.div
            className='flex text-right w-full items-between justify-between border-y border-[#d8d2c8] mb-5 py-3'
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <span className='text-s uppercase font-sans tracking-[0.12em] sm:tracking-[0.16em] text-stone-800'>{totalProducts} products</span>
            <button
                className='flex items-center justify-center cursor-pointer'
                onClick={() => setIsModalOpen(true)}
            >
            <span className='text-s uppercase font-sans tracking-[0.12em] sm:tracking-[0.16em] text-stone-800'>
                filters
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className='text-stone-900'
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
            </svg>
            </button>
        </motion.div>

        {filteredProducts.length === 0
            ? (
                <div className='min-h-[50vh] flex-col flex items-center justify-center'>
                    <img
                        src={SadEmoji}
                        className='w-16 h-16 my-4 object-obtain'
                    />
                    <div className='flex flex-col gap-5'>
                    <span className='font-serif text-xl tracking-wider text-stone-600'>There is nothing</span>
                    <button
                        type='button'
                        className='w-full py-3 px-4 border border-stone-400 text-[#1a1816] text-xs uppercase tracking-[0.16em] hover:border-[#1a1816] transition-colors cursor-pointer'
                        onClick={setDefault}
                    >
                        clear filters
                    </button>
                    </div>
                </div>
            )
            : (
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14'>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )
        }

        <AnimatePresence mode='popLayout'>
        {isModalOpen && <FilterModal closeModal={setIsModalOpen}/>}
        </AnimatePresence>
    </section>
  );
}

export default MainStore