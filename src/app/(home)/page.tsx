'use client'

import { logOut } from '@/services/auth.service'
import { useAuth } from '@/context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <main>
      {user?.displayName}
      <button onClick={logOut}>Logout</button>
    </main>
  )
}

export default Home
