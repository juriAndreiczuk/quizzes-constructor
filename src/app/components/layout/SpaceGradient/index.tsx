import styles from './SpaceGradient.module.css'
import { ReactNode } from 'react'

const SpaceGradient = ({ children }: { children: ReactNode }) => (
  <div className={`py-32  min-h-screen relative ${styles.space}`}>
    { children }
  </div>
)

export default SpaceGradient
