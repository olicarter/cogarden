import { Inter } from 'next/font/google'
import '@/app/globals.css'
import cn from '@/utils/cn'
import Body from '@/components/Body'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'cogarden',
  description: 'Find space to grow',
  appleWebApp: {
    title: 'cogarden',
    statusBarStyle: 'black-translucent',
  },
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.className,
        'fixed top-0 bottom-0 left-0 right-0 overflow-y-hidden overscroll-none text-amber-50',
      )}
      style={{ scrollbarWidth: 'none' }}
    >
      <Body>
        <main className="h-svh flex flex-col">{children}</main>
      </Body>
    </html>
  )
}
