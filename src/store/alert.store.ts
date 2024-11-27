import { create } from 'zustand'
import { IAlert, IAlertState, AlertKind } from '@/types/alert.types'

const defaultAlert: IAlert = {
  message: '',
  kind: AlertKind.Info,
  show: false
}

const useAlertStore = create<IAlertState>(set => ({
  alert: defaultAlert,

  setAlert: (alert: IAlert) => {
    set({ alert })

    setTimeout(() => {
      set({ alert: defaultAlert })
    }, 5000)
  }
}))

export default useAlertStore
