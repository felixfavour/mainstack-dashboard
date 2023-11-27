import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppBar from './components/AppBar'
import Navbar from './components/Navbar'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mainstack',
  description: 'A Mainstack Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>
            <AppBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
