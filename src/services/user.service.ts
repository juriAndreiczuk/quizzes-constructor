import { db } from '@/config/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { IAuthRegister } from '@/types/auth.types'
import { IUserDetails } from '@/types/user.types'
import alerts from '@/content/alerts.json'

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
