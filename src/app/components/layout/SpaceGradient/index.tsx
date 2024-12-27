import clsx from 'clsx'
import styles from './SpaceGradient.module.css'
import { ReactNode } from 'react'

const SpaceGradient = ({ children }: { children: ReactNode }) => (
  <div className={clsx(
    'py-32  min-h-screen relative',
    styles.space
  )}>
    { children }
  </div>
)

export default SpaceGradient
