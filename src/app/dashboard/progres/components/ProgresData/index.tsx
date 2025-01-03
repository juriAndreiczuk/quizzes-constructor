import ContentCard from '@/app/components/layout/ContentCard'
import { IProgresData } from '@/types'
import Image from 'next/image'

const ProgresData = ({ userData }: { userData: IProgresData }) => (
  <ContentCard cardClasses='mt-8'>
    <div className='flex items-center mb-16'>
      <Image
        src='/assets/warning-circle.svg'
        alt='info'
        width={20}
        height={20}
      />
      <p className='text-16 text-white font-medium ml-8'>
        If you want to change your name or team, you need to contact the administrator
      </p>
    </div>
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
