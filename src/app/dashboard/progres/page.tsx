'use client'

import ProgresList from '@/app/dashboard/progres/components/ProgresList'
import PageIntro from '@/app/components/layout/PageIntro'

const Progres = () => (
  <>
    <PageIntro
      introTitle='Your progres'
      introIcon='/assets/graph-up.svg'
      introButton={{ url: '/dashboard', label: 'Back Home' }}
    />
    <ProgresList />
  </>
)

export default Progres
