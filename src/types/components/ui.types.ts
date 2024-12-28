export interface IButton {
  children: React.ReactNode,
  btnLink?: string,
  btnMod?: 'primary' | 'accent' | 'primary-small' | 'accent-small',
  btnDisabled?: boolean,
  buttonClick?: () => void
}

export interface ITabs {
  children: React.ReactNode[],
  tabsLabels: string[]
}

export interface IFormField {
  label: string
  name: string
  type: string
  options?: {
    id: string
    name: string
  }[]
}

export interface IFormContent {
  fields: {
    [key: string]: IFormField
  }
  button: string
}
