'use client'

import ProgresPanel from '@/app/dashboard/progres/components/ProgresPanel'
import PageIntro from '@/app/components/layout/PageIntro'

const Progres = () => (
  <>
    <PageIntro
      introTitle='Info & progres'
      introIcon='/assets/graph-up.svg'
      introButton={{ url: '/dashboard', label: 'Back Home' }}
    />
    <ProgresPanel />
  </>
)

export default Progres
