type Props = {
   text: string
}

const MainTitle = ({text}: Props) => {
    return (
        <h1 className='text-3xl sm:text-4xl md:text-[42px] font-serif font-normal uppercase tracking-[0.14em] text-[#1a1816] pt-8 pb-6 sm:pt-14 sm:pb-12 text-center'>
            {text}
        </h1>

    )
}

export default MainTitle