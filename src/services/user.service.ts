import { db } from '@/config/firebase'
import {
  doc, setDoc, query, where, collection, getDocs
} from 'firebase/firestore'
import { IAuthRegister } from '@/types/auth.types'
import { IUserDetails } from '@/types/user.types'
import alertsData from '@/content/auth.json'
import { IAlerts } from '@/types/alert.types'

const alerts: IAlerts = alertsData as IAlerts

export const setUserData = async (data: IAuthRegister, uid: string)
: Promise<void> => {
  try {
    const { displayName, teamId, userType } = data
    await setDoc(doc(db, 'users', uid), {
      displayName, teamId, userType, isBlocked: false, points: 0
    })
  } catch (err) {
    throw new Error(alerts.errors.setUser)
  }
}

export const getUsersByTeam = async (teamId: string)
: Promise<IUserDetails[]> => {
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
    throw new Error(alerts.errors.getDoc)
  }
}
