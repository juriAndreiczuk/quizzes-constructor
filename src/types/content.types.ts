export interface IBoxesList {
  link: string,
  icon?: string,
  title: string,
  description: string
}

export interface IPageIntro {
  introTitle: string,
  introButton?: { url: string, label: string },
  introIcon?: string
}
