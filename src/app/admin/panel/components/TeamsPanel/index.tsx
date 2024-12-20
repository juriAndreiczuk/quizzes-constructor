'use client'

import { useEffect } from 'react'
import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import TeamsForm from '@/app/admin/panel/components/TeamsPanel/TeamsForm'
import TeamsList from '@/app/admin/panel/components/TeamsPanel/TeamsList'
import TeamsUser from '@/app/admin/panel/components/TeamsPanel/TeamsUser'
import ContentCard from '@/app/components/layout/ContentCard'

const TeamsPanel = () => {
  const { fetchItems: fetchTeams } = useTeamsCollectionStore()
  const { fetchUsers, selectedUser } = useUsersStore()

  useEffect(() => {
    fetchTeams()
    fetchUsers()
  }, [fetchTeams, fetchUsers])

  return (
    <ContentCard>
      <h2 className='text-27 font-bold text-light'>Teams panel</h2>
      <TeamsForm />
      <TeamsUser
        key={selectedUser ? selectedUser.displayName : 'default'}
      />
      <TeamsList />
    </ContentCard>
  )
}

export default TeamsPanel
