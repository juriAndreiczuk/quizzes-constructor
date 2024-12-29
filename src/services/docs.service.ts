import { db } from '@/config/firebase'
import useAlertStore from '@/store/alert.store'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import alertsData from '@/content/alerts.json'
import { AlertKind } from '@/types'

const { setAlert } = useAlertStore.getState()

export const getDocument = async <T>(uid: string, docName: string)
: Promise<T | null | undefined> => {
  try {
    const document = await getDoc(doc(db, docName, uid))
    if (document.exists()) {
      const data = {
        id: uid,
        ...document.data()
      }
      return data as T
    }
    return null
  } catch (err) {
    setAlert({ text: alertsData.list.fail, kind: AlertKind.Error })
    throw err
  }
}

export const updateDocument = async <T>(data: T, docName: string, id: string)
: Promise<void> => {
  try {
    await updateDoc(doc(db, docName, id), data as Partial<T>)
  } catch (err) {
    setAlert({ text: alertsData.list.fail, kind: AlertKind.Error })
  }
}

export const removeDocument = async (docName: string, id: string)
: Promise<void> => {
  try {
    await deleteDoc(doc(db, docName, id))
    setAlert({ text: alertsData.list.removed, kind: AlertKind.Success })
  } catch (err) {
    setAlert({ text: alertsData.list.fail, kind: AlertKind.Error })
  }
}
