import { db } from '@/config/firebase'
import {
  doc, setDoc, collection, query, where,
  getDocs, updateDoc, arrayUnion, arrayRemove
} from 'firebase/firestore'
import { ITeam, IUpdateOperation } from '@/types/team.types'
import { IAlerts } from '@/types/alert.types'
import alertsData from '@/content/auth.json'

const alerts: IAlerts = alertsData as IAlerts
// create new team
export const createTeam = async (data: ITeam)
: Promise<void> => {
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
    throw new Error(alertsData.errors.createDoc)
  }
}
// add/remove team memebers
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
