import styles from '@/app/(home)/HomeInfo/InfoAnimations/AtomAnimation/AtomAnimation.module.scss'

const AtomAnimation = () => (
  <div className={styles.atom}>
    <div className={styles.nuclear} />
    <div className={styles.wrapper}>
      <div className={styles.ring} />
    </div>
    <div className={styles.wrapper}>
      <div className={styles.ring} />
    </div>
    <div className={styles.wrapper}>
      <div className={styles.ring} />
    </div>
    <div className={styles.floor} />
  </div>
)

export default AtomAnimation
