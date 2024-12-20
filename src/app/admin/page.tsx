'use client'

import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'
import pageContent from '@/content/admin.json'
import BoxesList from '@/app/components/BoxesList'
import { IBoxesList } from '@/types/content.types'

const Home = () => (
  <StatusChecker>
    <UserProfile />
    { pageContent.boxesList && (
      <BoxesList listItems={pageContent.boxesList as IBoxesList[]} />
    )}
  </StatusChecker>
)

export default Home
