import type { Metadata } from 'next'
import { Source_Code_Pro } from 'next/font/google'
import './globals.css'
import UserInitialize from './components/UserInitialize'
import AlertBox from './components/ui/AlertBox'
import SpaceGradient from '@/app/components/layout/SpaceGradient'

const sourceCodePro = Source_Code_Pro({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif']
})


export const metadata: Metadata = {
  title: 'Quizzes Builder',
  description: 'Education and fun for everyone',
}

const RootLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <html lang="en">
    <body className={`${sourceCodePro.className} min-h-screen`}>
      <SpaceGradient>
        <UserInitialize />
        <AlertBox />
        <div className='container max-w-[850px]'>
          {children}
        </div>
      </SpaceGradient>
    </body>
  </html>
)

export default RootLayout
