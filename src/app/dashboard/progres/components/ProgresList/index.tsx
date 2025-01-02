'use client'

import { useState } from 'react'
import ContentCard from '@/app/components/layout/ContentCard'
import ProgresSearch from '@/app/dashboard/progres/components/ProgresList/ProgresSearch'
import ProgresItem from '@/app/dashboard/progres/components/ProgresList/ProgresItem'
import { IProgresList } from '@/types'

const ProgresList = ({ completedQuestions, filteredQuestions }: IProgresList) => {
  const [search, setSearch] = useState<string>('')

  return (
    <>
      <ProgresSearch
        onSearchChange={setSearch}
      />
      <ContentCard>
        { completedQuestions.length ? (
          <ul>
            { filteredQuestions(search).length ? filteredQuestions(search).map((item, n) => (
              <ProgresItem
                key={item.questionData.id}
                itemData={item}
                itemIndex={n}
              />
            )) : <h2 className='text-20 sm:text-27 text-white font-medium sm:pl-16 py-16'>Nothing found</h2> }
          </ul>
        ) : <h2 className='text-20 sm:text-27 text-white py-32 text-center font-medium'>You have not answered the questions yet</h2> }
      </ContentCard>
    </>
  )
}

export default ProgresList
