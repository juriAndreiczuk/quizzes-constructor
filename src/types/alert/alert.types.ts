import type { AlertKind, AlertTime } from '@/types'

export interface IAlert {
  kind: AlertKind
  text: string | null
  time?: AlertTime
}
