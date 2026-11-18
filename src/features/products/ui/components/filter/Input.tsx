type Props = {
    label?: string
    value: string
    onChange: (value: string) => void
}

const Input = ({label, value, onChange}: Props) => {
    return (
        <label className='flex flex-col gap-1.5'>
            {label && (
                <span className='text-[11px] uppercase tracking-[0.16em] text-stone-500'>
                    {label}
                </span>
            )}
            <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='w-full border-b border-[#d8d2c8] focus:border-[#1a1816] bg-transparent py-1.5 text-sm text-[#1a1816] outline-none transition-colors'
            />
        </label>
    )
}

export default Input