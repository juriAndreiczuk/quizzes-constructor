'use client'

import { useState } from 'react'
import useCollection from '@/app/hooks/useCollection'
import { getAllDocuments, removeDocument } from '@/services/docs.service'
import { ITeam } from '@/types/team.types'
import { IUserDetails } from '@/types/user.types'
import TeamsUser from '@/app/admin/components/TeamsUser'

const TeamsList = () => {
  const [selectedUser, setSelectedUser] = useState<IUserDetails | null>(null)

  const teamsService = (): Promise<ITeam[]> => getAllDocuments<ITeam>('teams')
  const usersService = (): Promise<IUserDetails[]> => getAllDocuments<IUserDetails>('users')

  const teams = useCollection(teamsService, selectedUser) as ITeam[]
  const users = useCollection(usersService, selectedUser) as IUserDetails[]

  const getMembers = (team: ITeam): IUserDetails[] => (
    users.length ? users.filter(user => user.teamId === team.id) : []
  )

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
            {!getMembers(team).length && (
              <button
                onClick={() => { team.id && removeDocument('teams', team.id) }}
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
    </>
  )
}

export default TeamsList
