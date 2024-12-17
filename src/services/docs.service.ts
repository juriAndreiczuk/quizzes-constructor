import { db } from '@/config/firebase'
import {
  doc, getDoc, collection, getDocs, updateDoc, DocumentData,
  arrayUnion, arrayRemove, deleteDoc, setDoc, query, where
} from 'firebase/firestore'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types/alert.types'
import { IUpdateOperation } from '@/types/collection.types'

const alerts: IAlerts = alertsData as IAlerts
// get  document by id
export const getDocumentData = async <T>(uid: string, docName: string)
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

// remove document by id and collection name
export const removeDocument = async (docName: string, id: string)
: Promise<void> => {
  try {
    await deleteDoc(doc(db, docName, id))
  } catch (err) {
    throw new Error(alerts.errors.deleteDoc)
  }
}
// create new document
export const createDocument = async <T extends { [key: string]: any }>(docName: string, data: T, uniqueField: string)
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
// update collection item by id and collection name
export const updateCollectionItems = async (
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

export const getDocumentsByIds = async <T>(ids: string[], docName: string)
:Promise<T[] | null> => {
  try {
    const documents: T[] = []

    const q = query(collection(db, docName), where('id', 'in', ids))
    const snapshot = await getDocs(collection(db, docName))
    snapshot.forEach(item => {
      if (ids.includes(item.id)) {
        const data = item.data() as T
        documents.push({
          id: item.id,
          ...data
        })
      }
    })

    return documents
  } catch (err) {
    throw new Error(alerts.errors.getDoc)
  }
}
