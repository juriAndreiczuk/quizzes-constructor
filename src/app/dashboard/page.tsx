'use client'

import pageContent from '@/content/dashboard.json'
import BoxesList from '@/app/components/shared/BoxesList'
import { IBoxesList } from '@/types'

const Home = () => (
  <BoxesList
    listItems={pageContent.boxesList as IBoxesList[]}
  />
)

export default Home
