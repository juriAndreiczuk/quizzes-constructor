import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from '@/app/components/layout/ContentCard/ContentCard.module.css'

const ContentCard = ({ children, cardClasses, cardMod = 'default' }
: {
  children: ReactNode,
  cardClasses?: string,
  cardMod?: string
}) => (
  <div className={clsx(
    'shadow-accent border-[1px] border-accent p-16 rounded-sm mb-32',
    styles.card,
    cardClasses,
    { 'sm:p-32': cardMod !== 'mini' }
  )}
  >
    { children }
  </div>
)

export default ContentCard
