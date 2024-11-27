'use client'

import useCollection from '@/app/hooks/useCollection'
import { getAllTeams } from '@/services/teams.service'
import { getAllUsers } from '@/services/user.service'
import { ITeam } from '@/types/team.types'
import { IUserDetails } from '@/types/user.types'

const TeamsList = () => {
  const teams = useCollection(getAllTeams) as ITeam[]
  const users = useCollection(getAllUsers) as IUserDetails[]

  return (
    <ul>
      { teams && teams.map(team => (
        <li key={team.id}>
          {team.name}
          { team.members && team.members.length && (
            <ul>
              { users.length && users
                .filter(user => user.teamId === team.id)
                .map(user => (
                  <li key={user.displayName}>
                    {user.displayName}
                  </li>
                ))}
            </ul>
          )}
        </li>
      )) }
    </ul>
  )
}

export default TeamsList
