export interface IHomeBanner {
  infoTitle: string
  infoDesc: string
  infoButton: { title: string, url: string }
  infoImage: string
}

export interface IInfoBox {
  boxTitle: string
  boxText: string
  children: React.ReactNode
}

export interface IInfoRoles {
  rolesTitle: string
  rolesList: {
    title: string
    text: string
    icon: string
  }[]
}
