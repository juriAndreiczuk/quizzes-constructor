'use client'

import { useEffect } from 'react'
import useTeamsStore from '@/store/teams.store'
import useUsersStore from '@/store/users.store'
import TeamsForm from '@/app/admin/components/TeamsPanel/TeamsForm'
import TeamsList from '@/app/admin/components/TeamsPanel/TeamsList'
import TeamsUser from '@/app/admin/components/TeamsPanel/TeamsUser'

const TeamsPanel = () => {
  const { fetchTeams } = useTeamsStore()
  const { fetchUsers, selectedUser } = useUsersStore()

  useEffect(() => {
    fetchTeams()
    fetchUsers()
  }, [fetchTeams, fetchUsers])

  return (
    <main>
      <hr />
      <h1>Teams panel</h1>
      <TeamsForm />
      <TeamsUser
        key={selectedUser ? selectedUser.displayName : 'default'}
      />
      <TeamsList />
    </main>
  )
}

export default TeamsPanel
