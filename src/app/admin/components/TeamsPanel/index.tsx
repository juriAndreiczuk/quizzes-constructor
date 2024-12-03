'use client'

import { useEffect } from 'react'
import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import TeamsForm from '@/app/admin/components/TeamsPanel/TeamsForm'
import TeamsList from '@/app/admin/components/TeamsPanel/TeamsList'
import TeamsUser from '@/app/admin/components/TeamsPanel/TeamsUser'

const TeamsPanel = () => {
  const { fetchItems: fetchTeams } = useTeamsCollectionStore()
  const { fetchUsers, selectedUser } = useUsersStore()

  useEffect(() => {
    fetchTeams()
    fetchUsers()
  }, [fetchTeams, fetchUsers])

  return (
    <div className='bg-light p-16 rounded-xl'>
      <h2 className='text-20 font-bold text-main'>Teams panel</h2>
      <TeamsForm />
      <TeamsUser
        key={selectedUser ? selectedUser.displayName : 'default'}
      />
      <TeamsList />
    </div>
  )
}

export default TeamsPanel
