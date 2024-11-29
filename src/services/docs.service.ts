import { db } from '@/config/firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types/alert.types'

const alerts: IAlerts = alertsData as IAlerts

export const getDocumentData = async <T>(uid: string, docName: string)
: Promise<T | null | undefined> => {
  try {
    const document = await getDoc(doc(db, docName, uid))
    if (document.exists()) {
      return document.data() as T
    }
    return null
  } catch (err) {
    throw new Error(alerts.errors.getDoc)
  }
}

export const getAllDocuments = async <T>(docName: string, errorHandler: (error: string) => void)
: Promise<T[]> => {
  try {
    const documents: T[] = []
    const snapshot = await getDocs(collection(db, docName))
    snapshot.forEach(item => {
      const data = item.data() as T
      documents.push({
        id: item.id,
        ...data
      })
    })
    return documents
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}
