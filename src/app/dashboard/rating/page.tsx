'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import PageIntro from '@/app/components/layout/PageIntro'
import RatingTable from '@/app/components/RatingTable'

const Rating = () => (
  <StatusChecker>
    <UserProfile />
    <PageIntro
      introTitle='Rating'
      introButton={{ url: '/dashboard', label: 'Back Home' }}
    />
    <RatingTable />
  </StatusChecker>
)

export default Rating
