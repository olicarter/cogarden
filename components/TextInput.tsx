import cn from '@/utils/cn'
import { type ComponentPropsWithoutRef } from 'react'

export default function TextInput({
  className,
  ...props
}: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={cn(
        `bg-green-900 border-none h-12 px-4 rounded-2xl text-amber-50
        autofill:shadow-[inset_0_0_0px_1000px_#14532d] autofill:[-webkit-text-fill-color:#fffbeb]
        focus:ring-2 focus:ring-amber-50
        placeholder:text-amber-50/50
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
        className,
      )}
      {...props}
    />
  )
}
