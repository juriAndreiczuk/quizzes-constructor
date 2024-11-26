import Cookies from 'js-cookie'
import { auth } from '@/config/firebase'
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, UserCredential, updateProfile
} from 'firebase/auth'
import {
  IUser, AuthMode, AuthTokens, IUserLogin, IUserRegister
} from '@/types/auth.types'

export const onAuthChange = (
  callback: (user: IUser | null) => void
): (() => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user)
  })
  return unsubscribe
}

const register = async (data: IUserRegister)
:Promise<UserCredential> => {
  const { email, password, displayName } = data
  const userData = await createUserWithEmailAndPassword(auth, email, password)
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName })
  }
  return userData
}

export const userAuth = async (data: (IUserLogin | IUserRegister), mode: AuthMode)
: Promise<IUser | undefined> => {
  try {
    const userData = await (
      mode === AuthMode.Login
        ? signInWithEmailAndPassword(auth, data.email, data.password)
        : register(data as IUserRegister)
    )
    const token = await userData.user?.getIdToken()
    Cookies.set(AuthTokens.ID_TOKEN, token)
    return userData.user
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const logOut = async ():Promise<void> => {
  try {
    signOut(auth)
    Cookies.remove(AuthTokens.ID_TOKEN)
  } catch (err) {
    console.log(err)
    throw err
  }
}
