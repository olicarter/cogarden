'use client'

import cn from '@/utils/cn'
import * as RUIAvatar from '@radix-ui/react-avatar'
import { type ComponentPropsWithoutRef } from 'react'

interface AvatarProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  src?: ComponentPropsWithoutRef<'img'>['src']
}

export default function Avatar({ name, size = 'md', src }: AvatarProps) {
  const initials = name.includes(' ')
    ? name.split(' ')[0][0] + name.split(' ')[1][0]
    : name[0]

  return (
    <RUIAvatar.Root
      className={cn('border-2 border-green-100 overflow-hidden rounded-full', {
        'h-6 w-6': size === 'xs',
        'h-8 w-8': size === 'sm',
        'h-10 w-10': size === 'md',
        'h-12 w-12': size === 'lg',
      })}
    >
      <RUIAvatar.Image
        className="h-full w-full object-cover"
        src={src}
        alt={name}
      />
      <RUIAvatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {initials}
      </RUIAvatar.Fallback>
    </RUIAvatar.Root>
  )
}
