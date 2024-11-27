export enum AlertKind {
  Error = 'error',
  Info = 'info'
}

export interface IAlert {
  kind: AlertKind
  message: string
  show: boolean
}

export interface IAlertState {
  alert: IAlert
  setAlert: (alert: IAlert) => void
}
