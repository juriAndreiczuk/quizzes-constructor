import { useState, useEffect } from 'react'
import useAlertStore from '@/store/alert.store'
import { AlertKind } from '@/types/alert.types'
import { ITeam } from '@/types/team.types'
import { getAllTeams } from '@/services/teams.service'

const useTeams = () => {
  const [teams, setTeams] = useState<ITeam[]>([])
  const setAlert = useAlertStore(state => state.setAlert)

  const getTeams = async () => {
    const allTeams: ITeam[] = await getAllTeams((val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })

    if (allTeams.length) {
      setTeams(allTeams)
    }
  }

  useEffect(() => { getTeams() }, [])

  return teams
}

export default useTeams
