import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import { Header, Footer, Providers } from '@/components/index'


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata = {
  metadataBase: new URL("https://murathan.online"),
  title: { default: "Murathan Algır — Full-Stack Developer", template: "%s | Murathan Algır" },
  description: "Created with ♥ by Murathan",
  openGraph: {
    type: "website",
    siteName: "murathan.online",
    images: ["/api/og?title=Murathan%20Alg%C4%B1r&desc=Full%E2%80%91Stack%20Developer%20%E2%80%A2%20Next.js%20%2F%20TypeScript&badge=Portfolio"],
  },
  twitter: { card: "summary_large_image", creator: "@murathaan" },
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
        >
          <div>
        <Providers>
          <Header />
          <main className='grow pt-20'>{children}</main>
          <Footer />
        </Providers>
        </div>
      </body>
    </html>
  )
}