import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './SpaceGradient.module.css'

const SpaceGradient = ({ children }: { children: ReactNode }) => (
  <div className={clsx(
    'py-32  min-h-screen relative',
    styles.space
  )}
  >
    { children }
  </div>
)

export default SpaceGradient
