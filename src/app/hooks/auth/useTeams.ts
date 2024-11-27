import { useState, useEffect } from 'react'
import useAlertStore from '@/store/alert.store'
import { AlertKind } from '@/types/alert.types'
import { ITeam } from '@/types/team.types'
import { getAllTeams } from '@/services/teams.service'
import { IUserDetails } from '@/types/user.types'
import { getUsersByTeam } from '@/services/user.service'

const useTeams = () => {
  const [teams, setTeams] = useState<ITeam[]>([])
  const [users, setUsers] = useState<IUserDetails[]>([])
  const setAlert = useAlertStore(state => state.setAlert)

  useEffect(() => {
    const fetchTeamsAndUsers = async () => {
      const allTeams: ITeam[] = await getAllTeams((val: string) => {
        setAlert({ message: val, kind: AlertKind.Error, show: true })
      })
      setTeams(allTeams)
      let allUsers: IUserDetails[] = []
      for (const team of allTeams) {
        const newUsers = await getUsersByTeam(team.id, (val: string) => {
          setAlert({ message: val, kind: AlertKind.Error, show: true })
        })

        if (newUsers.length) {
          allUsers = [...allUsers, ...newUsers]
        }
      }
      setUsers(allUsers)
    }

    fetchTeamsAndUsers()
  }, [])

  return { teams, users }
}

export default useTeams
