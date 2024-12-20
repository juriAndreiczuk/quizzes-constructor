import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import { ITeamRarting, ITeam, IUserDetails } from '@/types/user.types'
import { useEffect, useState } from 'react'

const useLogic = () => {
  const { items: teams } = useTeamsCollectionStore()
  const { users, fetchUsers } = useUsersStore()
  const [sortedTeams, setSertedTeams] = useState<ITeamRarting[] | null>(null)
  const [mvp, setMvp] = useState<IUserDetails[] | null>(null)

  const getTeamPoints = (team: ITeam): number => users.length ? users
    .filter(user => user.teamId === team.id)
    .reduce((acc, user) => acc + user.points, 0) : 0
    
  const sortTeams = () =>  teams
    .sort((a, b) => getTeamPoints(b) - getTeamPoints(a))
    .map(team => ({ 
      team,
      points: getTeamPoints(team)
    }))

  const getMVPs = () =>
      users
        .sort((a, b) => b.points - a.points)
        .slice(0, 3)

  useEffect(() => {
    fetchUsers()

    if(teams) {
      setSertedTeams(sortTeams())
      setMvp(getMVPs())
    }
  }, [teams])

  return { sortedTeams, getTeamPoints, mvp}
}

export default useLogic