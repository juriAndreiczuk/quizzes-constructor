'use client'

import { useState } from 'react'
import useLogic from '@/app/dashboard/progres/components/ProgresList/useLogic'
import ContentCard from '@/app/components/layout/ContentCard'
import ProgresSearch from '@/app/dashboard/progres/components/ProgresList/ProgresSearch'
import ProgresItem from '@/app/dashboard/progres/components/ProgresList/ProgresItem'

const ProgresList = () => {
  const { filteredQuestions, points, completedQuestions, userTeam } = useLogic()
  const [search, setSearch] = useState<string>('')

  return (
    <>
      <ProgresSearch
        onSearchChange={setSearch}
      />
      <ContentCard>
        { completedQuestions.length ? (
          <>
            <h2 className='text-20 text-white font-medium sm:pl-16'>
              Team: <span className='text-accent'>{userTeam.name}</span>
            </h2>
            <h3 className='text-20 text-white font-medium sm:pl-16 py-16 border-b-[1px] border-addl'>
              Points: <span className='text-accent'>{points}</span>
            </h3>
            <ul>
              { filteredQuestions(search).length ? filteredQuestions(search).map((item, n) => (
                <ProgresItem
                  key={item.questionData.id}
                  itemData={item}
                  itemIndex={n}
                />
              )) : <h2 className='text-20 sm:text-27 text-white font-medium sm:pl-16 py-16'>Nothing found</h2> }
            </ul>
          </>
        ) : <h2 className='text-20 sm:text-27 text-white py-32 text-center font-medium'>You have not answered the questions yet</h2> }
      </ContentCard>
    </>
  )
}

export default ProgresList
