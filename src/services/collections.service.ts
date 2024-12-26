import { db } from '@/config/firebase'
import {
  doc, getDoc, collection, getDocs, updateDoc, DocumentData,
  arrayUnion, arrayRemove, setDoc, query, where
} from 'firebase/firestore'
import alertsData from '@/content/auth.json'
import { IUpdateOperation, IAlerts } from '@/types'

const alerts: IAlerts = alertsData as IAlerts

export const getCollection = async <T>(docName: string, ids?: string[])
: Promise<T[]> => {
  try {
    const documents: T[] = []
    const q = ids && ids.length > 0 
      ? query(collection(db, docName), where('__name__', 'in', ids)) 
      : collection(db, docName)

    const snapshot = await getDocs(q)

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

export const addToCollection = async <T extends { [key: string]: any }>(docName: string, data: T, uniqueField: string)
: Promise<void | DocumentData> => {
  try {
    const collectionRef = collection(db, docName)
    const documentRef = doc(collectionRef)

    const q = query(collectionRef, where(uniqueField, '==', (data as any)[uniqueField]))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
      throw new Error(alerts.errors.createDoc)
    } else {
      await setDoc(documentRef, data)
      return getDoc(documentRef)
    }
  } catch (err) {
    throw new Error(alerts.errors.createDoc)
  }
}

export const updateCollection = async (
  collectionName: string,
  itemsName: string,
  docId: string,
  itemId: string,
  action: IUpdateOperation
): Promise<void> => {
  try {
    const collectionRef = doc(db, collectionName, docId)
    if (action === IUpdateOperation.Add) {
      await updateDoc(collectionRef, {
        [itemsName]: arrayUnion(itemId)
      })
    } else if (action === IUpdateOperation.Remove) {
      await updateDoc(collectionRef, {
        [itemsName]: arrayRemove(itemId)
      })
    }
  } catch (err) {
    throw new Error(alertsData.errors.updateDoc)
  }
}
