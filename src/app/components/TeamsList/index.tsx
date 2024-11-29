'use client'

import useCollection from '@/app/hooks/useCollection'
import { getAllDocuments } from '@/services/docs.service'
import { ITeam } from '@/types/team.types'
import { IUserDetails } from '@/types/user.types'

const TeamsList = () => {
  const teamsService = (): Promise<ITeam[]> => getAllDocuments<ITeam>('teams')
  const usersService = (): Promise<IUserDetails[]> => getAllDocuments<IUserDetails>('users')

  const teams = useCollection(teamsService) as ITeam[]
  const users = useCollection(usersService) as IUserDetails[]

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
