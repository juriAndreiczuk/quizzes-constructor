import gsap from 'gsap'

const useLogic = (): {
  textAnimation: (title: HTMLSpanElement[]) => void
} => {
  const textAnimation = (title: HTMLSpanElement[]) => {
    title.forEach((word, index) => {
      const letters = word && word.querySelectorAll('[data-word="letter"]')
      gsap.timeline()
        .to(letters, { y: 0, stagger: { amount: 0.59, from: 'center' }, duration: 0.5, }, index * 3)
        .to(letters, { y: '-100%', stagger: { amount: 0.59, from: 'center' }, duration: 1 }, '+=1.5')
        .eventCallback('onComplete', () => {
          gsap.set(letters, { y: '100%' })

          if (index === title.length - 1) textAnimation(title)
        })
    })
  }
  return { textAnimation }
}

export default useLogic
