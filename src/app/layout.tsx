import type { Metadata } from 'next'
import clsx from 'clsx'
import SpaceGradient from '@/app/components/layout/SpaceGradient'
import './globals.css'
import { Source_Code_Pro as sourceCodeProFont } from 'next/font/google'
import UserInitialize from './components/shared/UserInitialize'
import AlertBox from './components/ui/AlertBox'

const sourceCodePro = sourceCodeProFont({
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
    <body
      className={clsx(
        'min-h-screen',
        sourceCodePro.className
      )}
    >
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
