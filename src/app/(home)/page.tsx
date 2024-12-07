'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import QuizzesLinks from '@/app/(home)/components/QuizzesLinks'

const Home = () => (
  <StatusChecker>
    <UserProfile />
    <QuizzesLinks />
  </StatusChecker>
)

export default Home
