'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import QuizesLinks from '@/app/quizes/components/QuizesLinks'

const Home = () => (
  <StatusChecker>
    <UserProfile />
    <h1 className="text-34 font-bold text-light my-32">Choose a quiz</h1>
    <QuizesLinks />
  </StatusChecker>
)

export default Home
