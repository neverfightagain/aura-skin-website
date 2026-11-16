import {useQuery} from "@tanstack/react-query";
import {getProducts} from "../api/getProducts.ts";
import ProductCard from "./card/ProductCard.tsx";
import MainTitle from "../../../shared/ui/MainTitle.tsx";

const MainStore = () => {

  const { data: products, isLoading, isError, error, refetch} = useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
    select: (response) => response.products,
  })

  if (isLoading) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center font-serif text-xl tracking-wider text-stone-600'>
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

  if (!products) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center font-serif text-xl tracking-wider text-stone-600'>
        Failed to load products!
      </div>
    );
  }

  return (
    <section className='max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col items-center pb-24'>
      <MainTitle
        text={'THE NOURISHING SERIES'}
      />

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default MainStore