import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from '@/app/components/layout/ContentCard/ContentCard.module.scss'
import Tilt from 'react-parallax-tilt'

const ContentCard = ({ children, cardClasses, cardMod = 'default', cardParalax = false }
: {
  children: ReactNode,
  cardClasses?: string,
  cardMod?: string,
  cardParalax?: boolean
}) => {
  const paralaxEnabled = typeof window !== 'undefined' && window.innerWidth > 992

  return (
    <Tilt
      tiltEnable={paralaxEnabled && cardParalax}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      className='h-full w-full mb-32'
    >
      <div className={clsx(
        'shadow-accent border-[1px] border-accent p-16 rounded-sm',
        styles.card,
        cardClasses,
        { 'sm:p-32': cardMod !== 'mini' }
      )}
      >
        { children }
      </div>
    </Tilt>
  )
}
export default ContentCard
