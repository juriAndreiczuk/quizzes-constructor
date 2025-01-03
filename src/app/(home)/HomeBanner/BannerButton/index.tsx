'use client'

import Image from 'next/image'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const BannerButton = () => (
  <button
    onClick={() => { gsap.to(window, { duration: 0.7, scrollTo: 700 }) }}
    className='mx-auto mt-64 pt-16 block'
  >
    <Image
      className='relative block animate-bounce'
      src='/assets/page-down.svg'
      width={35}
      height={35}
      alt='arrow down'
    />
  </button>
)

export default BannerButton
