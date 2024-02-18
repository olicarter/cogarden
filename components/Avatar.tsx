'use client'

import cn from '@/utils/cn'
import * as RUIAvatar from '@radix-ui/react-avatar'

interface AvatarProps {
  fullName: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function Avatar({ fullName, size = 'md' }: AvatarProps) {
  const initials = fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()

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
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt={fullName}
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
