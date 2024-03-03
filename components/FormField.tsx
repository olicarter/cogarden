import cn from '@/utils/cn'
import { type ReactNode, type ComponentPropsWithoutRef } from 'react'

interface FormFieldProps extends ComponentPropsWithoutRef<'div'> {
  description?: ReactNode
  label: string
}

export default function FormField({
  children,
  className,
  description,
  label,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('gap-x-2 grid h-fit', className)} {...props}>
      {children}
      <label
        className={cn(
          '-order-1 col-span-full font-semibold text-sm whitespace-nowrap',
          !description && 'mb-2',
        )}
      >
        {label}
      </label>
      {description && (
        <p className="-order-1 col-span-full mb-2 opacity-50 text-xs">
          {description}
        </p>
      )}
    </div>
  )
}
