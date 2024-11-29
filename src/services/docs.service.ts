import { db } from '@/config/firebase'
import {
  doc, getDoc, collection, getDocs, updateDoc
} from 'firebase/firestore'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types/alert.types'

const alerts: IAlerts = alertsData as IAlerts
// get  document by id
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
// get  all documents by collection name
export const getAllDocuments = async <T>(docName: string)
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
    throw new Error(alerts.errors.getDoc)
  }
}
// update document by id and collection name
export const updateDocument = async <T>(data: T, docName: string, id: string)
: Promise<void> => {
  try {
    await updateDoc(doc(db, docName, id), data as Partial<T>)
  } catch (err) {
    throw new Error(alerts.errors.updateDoc)
  }
}
