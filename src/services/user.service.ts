import { db } from '@/config/firebase'
import { getDocumentData, getAllDocuments } from '@/services/docs.service'
import {
  doc, setDoc, query, where, collection, getDocs
} from 'firebase/firestore'
import { IAuthRegister } from '@/types/auth.types'
import { IUserDetails } from '@/types/user.types'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types/alert.types'

const alerts: IAlerts = alertsData as IAlerts

export const getAllUsers = async (errorHandler: (error: string) => void)
: Promise<IUserDetails[]> => getAllDocuments<IUserDetails>('users', errorHandler)

export const getUserData = async (uid: string)
: Promise<IUserDetails | null | undefined> => getDocumentData<IUserDetails>(uid, 'users')

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
