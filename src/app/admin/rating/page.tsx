'use client'

import PageIntro from '@/app/components/layout/PageIntro'
import RatingTable from '@/app/components/RatingTable'

const Rating = () => (
  <>
    <PageIntro
      introTitle='Rating'
      introIcon='/assets/medal1st.svg'
      introButton={{ url: '/admin', label: 'Back Home' }}
    />
    <RatingTable />
  </>
)

export default Rating
