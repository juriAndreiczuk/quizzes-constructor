import { create } from 'zustand'
import { IAlert, IAlertState, AlertKind } from '@/types'

const defaultAlert: IAlert = {
  text: null,
  kind: AlertKind.Info
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
