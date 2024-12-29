import { db } from '@/config/firebase'
import useAlertStore from '@/store/alert.store'
import {
  doc, setDoc, query, where, collection, getDocs
} from 'firebase/firestore'
import { IAuthRegister, IUserDetails, AlertKind } from '@/types'
import alertsData from '@/content/alerts.json'

const { setAlert } = useAlertStore.getState()

export const setUserData = async (data: IAuthRegister, uid: string)
: Promise<void> => {
  try {
    const { displayName, teamId, userType } = data
    await setDoc(doc(db, 'users', uid), {
      displayName, teamId, userType, isBlocked: false, points: 0
    })
  } catch (err) {
    setAlert({ text: alertsData.list.fail, kind: AlertKind.Error })
    throw err
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
    setAlert({ text: alertsData.list.fail, kind: AlertKind.Error })
    throw err
  }
}
