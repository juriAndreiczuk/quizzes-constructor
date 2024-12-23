'use client'

import Tabs from '@/app/components/ui/Tabs'
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
      {teams && teams.length > 0 && (
        <>
          <h4 className='text-20 font-bold text-white mb-16'>Teams</h4>
          <Tabs tabsLabels={[...teams.map(team => team.name)]}>
            { teams.map(team => (
              <div
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
              </div>
            )) }
          </Tabs>
        </>
      )}
    </div>
  )
}

export default TeamsList
