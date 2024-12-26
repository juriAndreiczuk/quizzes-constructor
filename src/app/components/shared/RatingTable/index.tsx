'use client'

import useLoginc from '@/app/components/shared/RatingTable/useLogic'
import RatingTeams from '@/app/components/shared/RatingTable/RatingTeams'
import RatingUsers from '@/app/components/shared/RatingTable/RatingUsers'

const RatingTable = () => {
  const { sortedTeams, mvp } = useLoginc()
 
  return (
    <div className='grid md:grid-cols-2 gap-5'>
      <div className='col-span-1'>
        <RatingTeams teamList={sortedTeams} />
      </div>
      <div className="col-span-1">
        <RatingUsers userList={mvp} />
      </div>
    </div>
  )

}

export default RatingTable
