'use client'

import QuizesLinks from '@/app/dashboard/quizes/components/QuizesLinks'
import PageIntro from '@/app/components/layout/PageIntro'

const Home = () => (
  <>
    <PageIntro
      introTitle='Choose a quiz'
      introIcon='/assets/task-list.svg'
      introButton={{ url: '/dashboard', label: 'Back Home' }}
    />
    <QuizesLinks />
  </>
)

export default Home
