import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import UserInitialize from './components/UserInitialize'
import AlertBox from './components/ui/AlertBox'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smits',
  description: 'Education and fun for everyone',
}

const RootLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <html lang="en">
    <body className={inter.className}>
      <UserInitialize />
      <AlertBox />
      {children}
    </body>
  </html>
)

export default RootLayout
