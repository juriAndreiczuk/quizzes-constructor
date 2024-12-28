import Cookies from 'js-cookie'
import { auth } from '@/config/firebase'
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, UserCredential, User
} from 'firebase/auth'
import {
  UserTypes, IUserDetails, AuthMode, IAlerts, AuthTokens,
  IAuthLogin, IAuthRegister, IUpdateOperation
} from '@/types'
import alertsData from '@/content/auth.json'
import { getDocument } from '@/services/docs.service'
import { updateCollection } from '@/services/collections.service'
import { setUserData } from './user.service'

const alerts: IAlerts = alertsData

export const onAuthChange = (callback: (user: User | null) => void)
: void => {
  onAuthStateChanged(auth, (user) => { callback(user) })
}

const register = async (data: IAuthRegister)
: Promise<UserCredential> => {
  const { email, password, displayName, teamId, userType } = data
  const userData = await createUserWithEmailAndPassword(auth, email, password)
  if (auth.currentUser) {
    await setUserData({ displayName, teamId, userType } as IAuthRegister, auth.currentUser.uid)
    if (teamId !== UserTypes[0]) {
      await updateCollection('teams', 'members', teamId, auth.currentUser.uid, IUpdateOperation.Add)
    }
  }
  return userData
}

export const userAuth = async (
  data: (IAuthLogin | IAuthRegister),
  mode: AuthMode
): Promise<User | undefined> => {
  try {
    const userData = await (
      mode === AuthMode.Login
        ? signInWithEmailAndPassword(auth, data.email, data.password)
        : register(data as IAuthRegister)
    )
    const token = await userData.user?.getIdToken()
    const user = await getDocument<IUserDetails>(userData.user?.uid, 'users')
    Cookies.set(AuthTokens.ID_TOKEN, token)
    Cookies.set(AuthTokens.USER_ROLE, user?.userType || UserTypes[1])
    return userData.user
  } catch (err) {
    throw new Error(alerts.errors.auth)
  }
}

export const logOut = async ()
: Promise<void> => {
  try {
    signOut(auth)
    Cookies.remove(AuthTokens.ID_TOKEN)
    Cookies.remove(AuthTokens.USER_ROLE)
  } catch (err) {
    throw new Error(alerts.errors.auth)
  }
}
