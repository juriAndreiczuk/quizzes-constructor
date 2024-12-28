import type { AlertKind } from '@/types'

export type IAlerts = {
  errors: {
    [key: string]: string
  }
}

export interface IAlert {
  kind: AlertKind
  message: string
  show: boolean
}
