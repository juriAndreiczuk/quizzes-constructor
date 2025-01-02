import ContentCard from '@/app/components/layout/ContentCard'
import { IProgresData } from '@/types'

const ProgresData = ({ userData }: { userData: IProgresData }) => (
  <ContentCard cardClasses='mt-8'>
    <h2 className='text-20 text-white font-medium mb-8'>
      Name: <span className='text-accent'>{userData.name}</span>
    </h2>
    <h2 className='text-20 border-y-addl border-y-[1px] text-white font-medium py-8'>
      Team: <span className='text-accent'>{userData.team}</span>
    </h2>
    <h3 className='text-20 text-white font-medium mt-8'>
      Points: <span className='text-accent'>{userData.points}</span>
    </h3>
  </ContentCard>
)

export default ProgresData
