import cn from '@/utils/cn'
import { type ComponentPropsWithoutRef } from 'react'

export default function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<'label'>) {
  return (
    <label className={cn('leading-normal text-sm', className)} {...props} />
  )
}
