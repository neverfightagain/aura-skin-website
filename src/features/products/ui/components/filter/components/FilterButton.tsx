type Props = {
    onClick: () => void
    isActive: boolean
    label: string
}

const FilterButton = ({onClick, isActive, label}: Props) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`flex items-center justify-between w-full py-2 text-left text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                isActive
                    ? 'text-[#1a1816] font-medium'
                    : 'text-stone-600 hover:text-[#1a1816]'
            }`}
        >
            <span className={isActive ? 'underline underline-offset-4 decoration-[#1a1816]' : ''}>
                {label}
            </span>
            {isActive && (
                <span className='w-1.5 h-1.5 rounded-full bg-[#1a1816]' />
            )}
        </button>
    )
}

export default FilterButton