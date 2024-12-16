'use client'

const Button = (
  { children, btnLink, btnMod = 'primary', btnDisabled = false, buttonClick = () => {} } :
  { 
    children: React.ReactNode,
    btnLink?: string,
    btnMod?: 'primary' | 'accent' | 'primary-small' | 'accent-small',
    btnDisabled?: boolean,
    buttonClick?: () => void
  }
) => {

  const btnColor = {
    'primary': 'text-20 text-white from-addl to-main px-16 py-8 shadow-addl border-addl',
    'accent': 'from-accent to-addl text-20 py-8 px-16 shadow-accent border-accent',
    'primary-small': 'from-addl to-main text-14 py-4 px-8 shadow-addl border-addl',
    'accent-small': 'from-accent to-addl text-14 py-4 px-8 shadow-accent border-accent'
  }

  const classNames = `${btnColor[btnMod]} text-white block border-[1px] bg-gradient-to-br rounded-lg font-medium transition-all lg:hover:scale-[1.025]`

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