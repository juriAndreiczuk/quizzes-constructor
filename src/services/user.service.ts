import { db } from '@/config/firebase'
import { doc, setDoc, getDoc, DocumentData } from 'firebase/firestore'
import { IAuthRegister } from '@/types/auth.types'

export const setUserData = async (data: IAuthRegister, uid: string)
: Promise<void> => {
  try {
    const { displayName, teamId, userType } = data
    await setDoc(doc(db, 'users', uid), {
      displayName, teamId, userType, points: 0
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getUserData = async (uid: string)
: Promise<DocumentData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    return userDoc.exists() ? userDoc.data() : null
  } catch(err) {
    console.log(err)
    throw err
  }
}
