'use client'

import * as RUIAvatar from '@radix-ui/react-avatar'

export default function Avatar(props: { fullName: string }) {
  const initials = props.fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()

  return (
    <RUIAvatar.Root className="border-2 border-green-100 h-10 overflow-hidden rounded-full w-10">
      <RUIAvatar.Image
        className="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt={props.fullName}
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
