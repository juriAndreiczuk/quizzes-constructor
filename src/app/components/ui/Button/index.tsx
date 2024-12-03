'use client'

const Button = (
  { children, btnLink, btnMod = 'primary', btnDisabled = false, buttonClick = () => {} } :
  { 
    children: React.ReactNode,
    btnLink?: string,
    btnMod?: string,
    btnDisabled?: boolean,
    buttonClick?: () => void
  }
) => {
  const btnColor = {
    'primary': 'bg-main text-20 py-8 px-16',
    'accent': 'bg-accent text-20 py-8 px-16',
    'primary-small': 'bg-main text-14 py-4 px-8',
    'accent-small': 'bg-accent text-14 py-4 px-8'
  }

  const classNames = `${btnColor[btnMod]} text-white block rounded-lg font-medium transition-all lg:hover:scale-[1.05]`

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
      style={{ opacity: btnDisabled ? '.8' : '1' }}
      className={classNames}
      onClick={buttonClick}
    >
      {children}
    </button>
  )
}

export default Button