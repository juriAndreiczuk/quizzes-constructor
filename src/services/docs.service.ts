import { db } from '@/config/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types'

const alerts: IAlerts = alertsData

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
    throw new Error(alerts.errors.getDoc)
  }
}

export const updateDocument = async <T>(data: T, docName: string, id: string)
: Promise<void> => {
  try {
    await updateDoc(doc(db, docName, id), data as Partial<T>)
  } catch (err) {
    throw new Error(alerts.errors.updateDoc)
  }
}

export const removeDocument = async (docName: string, id: string)
: Promise<void> => {
  try {
    await deleteDoc(doc(db, docName, id))
  } catch (err) {
    throw new Error(alerts.errors.deleteDoc)
  }
}
