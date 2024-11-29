import { db } from '@/config/firebase'
import { getAllDocuments, getDocumentData } from '@/services/docs.service'
import {
  doc, setDoc, collection, query, where,
  getDocs, updateDoc, arrayUnion, arrayRemove
} from 'firebase/firestore'
import { ITeam, IUpdateOperation } from '@/types/team.types'
import { IAlerts } from '@/types/alert.types'
import alertsData from '@/content/auth.json'

const alerts: IAlerts = alertsData as IAlerts

export const getAllTeams = async (errorHandler: (error: string) => void)
: Promise<ITeam[]> => getAllDocuments<ITeam>('teams', errorHandler)

export const getTeamData = async (teamId: string)
: Promise<ITeam | null | undefined> => getDocumentData<ITeam>(teamId, 'teams')

export const createTeam = async (
  data: ITeam,
  errorHandler: (error: string) => void
): Promise<void> => {
  try {
    const teamsCollection = collection(db, 'teams')
    const teamRef = doc(teamsCollection)
    const q = query(teamsCollection, where('name', '==', data.name))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
      throw new Error(alerts.errors.teamExists)
    } else {
      await setDoc(teamRef, data)
    }
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
