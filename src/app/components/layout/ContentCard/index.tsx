import { ReactNode } from 'react'
import styles from '@/app/components/layout/ContentCard/ContentCard.module.css'

const ContentCard = ({ children, cardClasses, cardMod = 'default' }
: {
  children: ReactNode,
  cardClasses?: string,
  cardMod?: string
}
) => (
  <div className={`${styles.card} ${cardClasses} shadow-accent border-[1px] border-accent p-16 rounded-xl mb-32  sm:${cardMod !== 'mini' && 'p-32'}`}>
    { children }
  </div>
)

export default ContentCard
