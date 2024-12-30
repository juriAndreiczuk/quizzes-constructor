'use client'

import clsx from 'clsx'
import { IButton } from '@/types'

const Button = (
  { children, btnLink, btnMod = 'primary', btnDisabled = false, buttonClick = () => {} }
  : IButton
) => {
  const btnColor = {
    'primary': 'text-20 text-white from-addl to-main px-16 py-8 shadow-addl border-addl',
    'accent': 'from-accent to-addl text-20 py-8 px-16 shadow-accent border-accent',
    'primary-small': 'from-addl to-main text-14 py-4 px-8 shadow-addl border-addl',
    'accent-small': 'from-accent to-addl text-14 py-4 px-8 shadow-accent border-accent'
  }

  const classNames = clsx(
    'text-white block border-[1px] bg-gradient-to-br rounded-sm font-medium flex items-center transition-all lg:hover:scale-[1.025]',
    btnColor[btnMod]
  )

  return btnLink ? (
    <a
      className={classNames}
      href={btnLink}
    >
      {children}
    </a>
  ) : (
    <button
      disabled={btnDisabled}
      style={{ opacity: btnDisabled ? '.7' : '1' }}
      className={classNames}
      onClick={buttonClick}
    >
      {children}
    </button>
  )
}

export default Button
