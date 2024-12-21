'use client'

import pageContent from '@/content/home.json'
import BoxesList from '@/app/components/BoxesList'
import { IBoxesList } from '@/types/content.types'

const Home = () => (
  <BoxesList
    listItems={pageContent.boxesList as IBoxesList[]}
  />
)

export default Home
