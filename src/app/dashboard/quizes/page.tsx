'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import QuizesLinks from '@/app/dashboard/quizes/components/QuizesLinks'
import PageIntro from '@/app/components/layout/PageIntro'

const Home = () => (
  <StatusChecker>
    <UserProfile />
    <PageIntro
      introTitle='Choose a quiz'
      introButton={{ url: '/dashboard', label: 'Back Home' }}
    />
    <QuizesLinks />
  </StatusChecker>
)

export default Home
