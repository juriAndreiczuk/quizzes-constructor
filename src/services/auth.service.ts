import Cookies from 'js-cookie'
import { auth } from '@/config/firebase'
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, UserCredential, User
} from 'firebase/auth'
import { AuthMode, AuthTokens, IAuthLogin, IAuthRegister } from '@/types/auth.types'
import { IAlerts } from '@/types/alert.types'
import { UserTypes } from '@/types/user.types'
import { IUpdateOperation } from '@/types/team.types'
import alertsData from '@/content/auth.json'
import { getUserData, setUserData } from './user.service'
import { updateTeamMembers } from './teams.service'

const alerts: IAlerts = alertsData as IAlerts

export const onAuthChange = (
  callback: (user: User | null) => void
): (() => void) => onAuthStateChanged(auth, (user) => { callback(user) })

const register = async (data: IAuthRegister)
: Promise<UserCredential> => {
  const { email, password, displayName, teamId, userType } = data
  const userData = await createUserWithEmailAndPassword(auth, email, password)
  if (auth.currentUser) {
    await setUserData({ displayName, teamId, userType } as IAuthRegister, auth.currentUser.uid)
    await updateTeamMembers(teamId, auth.currentUser.uid, IUpdateOperation.Add)
  }
  return userData
}

export const userAuth = async (
  data: (IAuthLogin | IAuthRegister),
  mode: AuthMode,
  errorHandler: (error: string) => void
): Promise<User | undefined> => {
  try {
    const userData = await (
      mode === AuthMode.Login
        ? signInWithEmailAndPassword(auth, data.email, data.password)
        : register(data as IAuthRegister)
    )
    const token = await userData.user?.getIdToken()
    const user = await getUserData(userData.user?.uid)
    Cookies.set(AuthTokens.ID_TOKEN, token)
    Cookies.set(AuthTokens.USER_ROLE, user?.userType || UserTypes[1])
    return userData.user
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}

export const logOut = async (errorHandler: (error: string) => void)
: Promise<void> => {
  try {
    signOut(auth)
    Cookies.remove(AuthTokens.ID_TOKEN)
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}
