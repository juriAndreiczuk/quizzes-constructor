import { db } from '@/config/firebase'
import {
  doc, setDoc, getDoc, collection, query, where,
  getDocs, updateDoc, arrayUnion, arrayRemove
} from 'firebase/firestore'
import { IUserDetails } from '@/types/user.types'
import { ITeam, IUpdateOperation } from '@/types/team.types'
import { IAlerts } from '@/types/alert.types'
import alertsData from '@/content/auth.json'

const alerts: IAlerts = alertsData as IAlerts

export const createTeam = async (
  data: ITeam,
  errorHandler: (error: string) => void
): Promise<void> => {
  try {
    const teamRef = doc(collection(db, 'teams'))
    await setDoc(teamRef, data)
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}

export const getAllTeams = async (errorHandler: (error: string) => void): Promise<ITeam[]> => {
  try {
    const teams: ITeam[] = []
    const snapshot = await getDocs(collection(db, 'teams'))
    snapshot.forEach(item => {
      const data = item.data() as ITeam
      teams.push({
        id: item.id,
        ...data
      })
    })
    return teams
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
  }
}

export const getTeamData = async (
  teamId: string,
  errorHandler: (error: string) => void
): Promise<ITeam | null | undefined> => {
  try {
    const teamDoc = await getDoc(doc(db, 'teams', teamId))
    if (teamDoc.exists()) {
      return teamDoc.data() as ITeam
    }
    return null
  } catch (err) {
    err instanceof Error && errorHandler(alerts.errors[err.message] || err.message)
    throw err
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

export const updateTeamMembers = async (
  teamId: string,
  userId: string,
  action: IUpdateOperation,
): Promise<void> => {
  try {
    const teamRef = doc(db, 'teams', teamId)
    if (action === IUpdateOperation.Add) {
      await updateDoc(teamRef, {
        members: arrayUnion(userId)
      })
    } else if (IUpdateOperation.Remove) {
      await updateDoc(teamRef, {
        members: arrayRemove(userId)
      })
    }
  } catch (err) {
    throw new Error(alertsData.errors.updateTeam)
  }
}
