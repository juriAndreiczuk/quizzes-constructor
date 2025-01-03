'use client'

import { useEffect, useRef } from 'react'
import useLogic from '@/app/(home)/HomeBanner/BannerSlider/useLogic'

const BannerSlider = ({ sliderText }: { sliderText: string }) => {
  const title = useRef<HTMLSpanElement[]>([])
  const { textAnimation } = useLogic()

  useEffect(() => { textAnimation(title.current) }, [])
  return (
    <p className='text-27 sm:text-34 font-medium capitalize mt-16 h-[1.68rem] sm:h-[2.125rem] overflow-hidden relative text-light leading-none w-full'>
      { sliderText.split(', ').map((word, index) => (
        <span
          ref={el => { el && title.current.push(el) }}
          key={`${word}-${index}`}
          className='block absolute top-0 left-0'
        >
          {word.split('').map((letter, n) => (
            <span
              key={`${letter}-${n}`}
              data-word='letter'
              className='leading-none translate-y-[100%] relative inline-block'
            >
              {letter}
            </span>
          ))}
        </span>
      )) }
    </p>
  )
}

export default BannerSlider
