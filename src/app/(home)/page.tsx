'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import QuizesLinks from '@/app/(home)/components/QuizesLinks'

const Home = () => (
  <StatusChecker>
    <UserProfile />
    <QuizesLinks />
  </StatusChecker>
)

export default Home
