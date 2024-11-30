import Cookies from 'js-cookie'
import { auth } from '@/config/firebase'
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, UserCredential, User
} from 'firebase/auth'
import { AuthMode, AuthTokens, IAuthLogin, IAuthRegister } from '@/types/auth.types'
import { IAlerts } from '@/types/alert.types'
import { UserTypes, IUserDetails } from '@/types/user.types'
import { IUpdateOperation } from '@/types/collection.types'
import alertsData from '@/content/auth.json'
import { getDocumentData, updateCollectionItems } from '@/services/docs.service'
import { setUserData } from './user.service'

const alerts: IAlerts = alertsData as IAlerts
// auth event listener
export const onAuthChange = (callback: (user: User | null) => void)
: void => {
  onAuthStateChanged(auth, (user) => { callback(user) })
}
// registration function
const register = async (data: IAuthRegister)
: Promise<UserCredential> => {
  const { email, password, displayName, teamId, userType } = data
  const userData = await createUserWithEmailAndPassword(auth, email, password)
  if (auth.currentUser) {
    await setUserData({ displayName, teamId, userType } as IAuthRegister, auth.currentUser.uid)
    if (teamId !== UserTypes[0]) {
      await updateCollectionItems('teams', 'members', teamId, auth.currentUser.uid, IUpdateOperation.Add)
    }
  }
  return userData
}
// user authentication (login/registration)
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
    const user = await getDocumentData<IUserDetails>(userData.user?.uid, 'users')
    Cookies.set(AuthTokens.ID_TOKEN, token)
    Cookies.set(AuthTokens.USER_ROLE, user?.userType || UserTypes[1])
    return userData.user
  } catch (err) {
    throw new Error(alerts.errors.auth)
  }
}
// logout function (firebase + clear cookies)
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
