'use client'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import cn from '@/utils/cn'

export function Root({ className, ...props }: RadixRadioGroup.RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      className={cn('gap-2 grid grid-cols-2', className)}
      {...props}
    />
  )
}

export function Item({
  className,
  ...props
}: RadixRadioGroup.RadioGroupItemProps) {
  return (
    <RadixRadioGroup.Item
      className={cn(
        `bg-green-900 flex font-medium gap-3 h-12 items-center justify-center px-4 rounded-2xl shrink-0 text-amber-50 whitespace-nowrap
        data-[state=checked]:bg-amber-100 data-[state=checked]:text-green-950
        disabled:cursor-not-allowed disabled:opacity-50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100`,
        className,
      )}
      {...props}
    />
  )
}
