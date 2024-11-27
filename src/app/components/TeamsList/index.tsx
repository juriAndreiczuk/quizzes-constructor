'use client'

import useTeams from '@/app/hooks/auth/useTeams'

const TeamsList = () => {
  const { teams, users } = useTeams()

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
