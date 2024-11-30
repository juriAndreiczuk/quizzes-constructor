'use client'

import { useEffect } from 'react'
import useTeamsStore from '@/store/teams.store'
import TeamsForm from '@/app/admin/components/TeamsPanel/TeamsForm'
import TeamsList from '@/app/admin/components/TeamsPanel/TeamsList'
import TeamsUser from '@/app/admin/components/TeamsPanel/TeamsUser'

const TeamsPanel = () => {
  const { fetchTeams, fetchUsers, selectedUser } = useTeamsStore()

  useEffect(() => {
    fetchTeams()
    fetchUsers()
  }, [fetchTeams, fetchUsers])

  return (
    <main>
      Teams panel
      <TeamsForm />
      <TeamsUser
        key={selectedUser ? selectedUser.displayName : 'default'}
      />
      <TeamsList />
    </main>
  )
}

export default TeamsPanel
