'use client'

const Button = (
  { children, btnLink, btnMod = 'bg-main text-white', buttonClick = () => {} } :
  { 
    children: React.ReactNode,
    btnLink?: string,
    btnMod?: string,
    buttonClick?: () => void
  }
) => {
  const classNames = `${btnMod} block py-8 px-16 rounded-lg text-20 font-medium transition-all lg:hover:scale-[1.05]`

  return btnLink ? (
    <a
      className={classNames}
      href={btnLink}
    >
      {children}
    </a>
  ) : (
    <button
      className={classNames}
      onClick={buttonClick}
    >
      {children}
    </button>
  )
}

export default Button