import type {HTMLInputTypeAttribute} from "react";
import type {UseFormRegister} from "react-hook-form";
import type {Checkout} from "../validation/orderValidation.ts";
import { motion } from 'motion/react'

type Props = {
    placeholder: string
    name: keyof Checkout
    register: UseFormRegister<Checkout>
    error?: string
    type?: HTMLInputTypeAttribute
    autoComplete?: string
}

const Input = ({placeholder, name, register, error, type = 'text', autoComplete}: Props) => {
    return (
        <motion.div
            className='flex flex-col gap-1.5'
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <input
                type={type}
                autoComplete={autoComplete}
                aria-invalid={Boolean(error)}
                className={`w-full bg-transparent border px-4 py-3.5 text-sm font-sans text-[#1a1816] placeholder:text-stone-400 placeholder:text-xs placeholder:uppercase placeholder:font-sans placeholder:tracking-[0.12em] sm:placeholder:tracking-[0.16em] focus:outline-none transition-colors ${
                    error
                        ? 'border-red-700/70 focus:border-red-800'
                        : 'border-[#d8d2c8] focus:border-stone-800'
                }`}
                {...register(name)}
                placeholder={placeholder}
            />
            {error && (
                <span className='text-[11px] font-sans tracking-wide text-red-700'>
                    {error}
                </span>
            )}
        </motion.div>
    )
}

export default Input;