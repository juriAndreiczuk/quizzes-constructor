'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import ProgresList from '@/app/progres/components/ProgresList'

const Progres = () => {
  return (
    <StatusChecker>
      <UserProfile />
      <ProgresList />
    </StatusChecker>
  )

}

export default Progres
