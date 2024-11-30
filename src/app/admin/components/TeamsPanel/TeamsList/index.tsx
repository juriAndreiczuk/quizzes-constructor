'use client'

import useTeamsStore from '@/store/teams.store'
import { ITeam } from '@/types/team.types'
import { IUserDetails } from '@/types/user.types'

const TeamsList = () => {
  const { teams, users, setSelectedUser, removeTeam } = useTeamsStore()

  const getMembers = (team: ITeam): IUserDetails[] => (
    users.length ? users.filter(user => user.teamId === team.id) : []
  )

  return (
    <ul>
      { teams && teams.map(team => (
        <li key={team.id}>
          {team.name}
          {!getMembers(team).length && (
            <button
              onClick={() => { team.id && removeTeam(team.id) }}
            >
              Delete
            </button>
          )}
          { team.members && team.members.length && (
            <ul>
              {getMembers(team)
                .map(user => (
                  <li key={user.displayName}>
                    {user.displayName}
                    <button onClick={() => setSelectedUser(user)}>Edit</button>
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
