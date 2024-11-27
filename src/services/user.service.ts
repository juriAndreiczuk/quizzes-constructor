import { db } from '@/config/firebase'
import {
  doc, setDoc, getDoc, query, where, collection, getDocs
} from 'firebase/firestore'
import { IAuthRegister } from '@/types/auth.types'
import { IUserDetails } from '@/types/user.types'

import alerts from '@/content/auth.json'

export const setUserData = async (data: IAuthRegister, uid: string)
: Promise<void> => {
  try {
    const { displayName, teamId, userType } = data
    await setDoc(doc(db, 'users', uid), {
      displayName, teamId, userType, points: 0
    })
  } catch (err) {
    throw new Error(alerts.errors.setUser)
  }
}

export const getUserData = async (uid: string)
: Promise<IUserDetails | null | undefined> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      const { displayName, teamId, userType, points } = userDoc.data() as IUserDetails
      return { displayName, teamId, userType, points }
    }
    return null
  } catch (err) {
    throw new Error(alerts.errors.getUser)
  }
}

export const getUsersByTeam = async (
  teamId: string,
  errorHandler: (error: string) => void
): Promise<IUserDetails[]> => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('teamId', '==', teamId))
    const querySnapshot = await getDocs(q)
    const users: IUserDetails[] = []
    querySnapshot.forEach(item => {
      users.push(item.data() as IUserDetails)
    })
    return users
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}

export const getAllUsers = async (errorHandler: (error: string) => void)
: Promise<IUserDetails[]> => {
  try {
    const users: IUserDetails[] = []
    const snapshot = await getDocs(collection(db, 'users'))
    snapshot.forEach(item => {
      const data = item.data() as IUserDetails
      users.push(data)
    })
    return users
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}
