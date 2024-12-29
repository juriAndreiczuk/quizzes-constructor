import { db } from '@/config/firebase'
import {
  doc, getDoc, collection, getDocs, updateDoc, DocumentData,
  arrayUnion, arrayRemove, setDoc, query, where, WithFieldValue
} from 'firebase/firestore'
import alertsData from '@/content/alerts.json'
import { IUpdateOperation, AlertKind } from '@/types'
import useAlertStore from '@/store/alert.store'

const { setAlert } = useAlertStore.getState()

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
    setAlert({ text: alertsData.list.unexpected, kind: AlertKind.Error })
    throw err
  }
}

export const addToCollection = async <T>(
  docName: string, data: T, uniqueField: string
)
: Promise<void | DocumentData> => {
  try {
    const collectionRef = collection(db, docName)
    const documentRef = doc(collectionRef)

    const q = query(collectionRef, where(uniqueField, '==', data[uniqueField as keyof T]))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
      throw new Error(alertsData.list.alreadyExist)
    } else {
      await setDoc(documentRef, data as WithFieldValue<DocumentData>)
      setAlert({ text: alertsData.list.added, kind: AlertKind.Success })
      return getDoc(documentRef)
    }
  } catch (err) {
    setAlert({ text: alertsData.list.alreadyExist, kind: AlertKind.Error })
    throw err
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
    setAlert({ text: alertsData.list.fail, kind: AlertKind.Error })
    throw err
  }
}
