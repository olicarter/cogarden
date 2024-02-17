import { Inter } from 'next/font/google'
import '@/app/globals.css'
import cn from '@/utils/cn'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'cogarden',
  description: 'Find space to grow',
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
      className={cn(inter.className, 'overflow-y-hidden')}
      style={{ scrollbarWidth: 'none' }}
    >
      <body className="bg-[#EFEEDF] text-green-950">
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  )
}
