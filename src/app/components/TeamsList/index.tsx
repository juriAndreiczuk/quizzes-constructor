'use client'

import { useState } from 'react'
import useCollection from '@/app/hooks/useCollection'
import { getAllDocuments } from '@/services/docs.service'
import { ITeam } from '@/types/team.types'
import { IUserDetails } from '@/types/user.types'
import TeamsUser from '../TeamsUser'

const TeamsList = () => {
  const [selectedUser, setSelectedUser] = useState<IUserDetails | null>(null)

  const teamsService = (): Promise<ITeam[]> => getAllDocuments<ITeam>('teams')
  const usersService = (): Promise<IUserDetails[]> => getAllDocuments<IUserDetails>('users')

  const teams = useCollection(teamsService, selectedUser) as ITeam[]
  const users = useCollection(usersService, selectedUser) as IUserDetails[]

  return (
    <>
      { selectedUser
        ? (
          <TeamsUser
            key={selectedUser ? selectedUser.displayName : 'default'}
            teamsList={teams}
            userData={selectedUser}
            finishEditing={() => setSelectedUser(null)}
          />
        )
        : '' }
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
                      <button onClick={() => setSelectedUser(user)}>Edit</button>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        )) }
      </ul>
    </>
  )
}

export default TeamsList
