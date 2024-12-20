'use client'

import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import { IUserDetails, ITeam } from '@/types/user.types'
import Button from '@/app/components/ui/Button'

const TeamsList = () => {
  const { items: teams, removeItem: removeTeam } = useTeamsCollectionStore()
  const { setSelectedUser, users } = useUsersStore()

  const getMembers = (team: ITeam): IUserDetails[] => (
    users.length ? users.filter(user => user.teamId === team.id) : []
  )

  return (
    <div>
      <h4 className='text-20 font-bold text-white'>Teams</h4>
      <ul>
        { teams && teams.map(team => (
          <li
            className='text-14 mt-16 border-t-[1px] pt-16 border-t-addl'
            key={team.id}
          >
            <h5 className='text-20 font-bold mb-8 text-white'>{team.name}</h5>
            { !getMembers(team).length && (
              <Button
                btnMod='accent-small'
                buttonClick={() => { team.id && removeTeam(team.id) }}
              >
                Delete
              </Button>
            ) }
            { team.members && team.members.length && (
              <ul>
                { getMembers(team)
                  .map(user => (
                    <li className='flex items-center mb-8 pb-4' key={user.displayName}>
                      <span className='text-16 text-white mr-16'>{user.displayName}</span>
                      <Button
                        buttonClick={() => setSelectedUser(user)}
                        btnMod='accent-small'
                      >Edit</Button>
                    </li>
                  )) }
              </ul>
            ) }
          </li>
        )) }
      </ul>
    </div>
  )
}

export default TeamsList
