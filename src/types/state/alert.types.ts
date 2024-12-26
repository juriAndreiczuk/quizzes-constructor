import { IAlert } from '@/types'

export interface IAlertState {
  alert: IAlert
  setAlert: (alert: IAlert) => void
}
