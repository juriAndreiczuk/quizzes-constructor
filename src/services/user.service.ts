import { db } from '@/config/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { IAuthRegister } from '@/types/auth.types'
import { IUserDetails } from '@/types/user.types'

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
: Promise<IUserDetails | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    const { displayName, teamId, userType, points } = userDoc.data() as IUserDetails
    return userDoc.exists() ? { displayName, teamId, userType, points } : null
  } catch(err) {
    console.log(err)
    throw err
  }
}
