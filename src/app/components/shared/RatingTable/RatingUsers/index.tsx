import ContentCard from '@/app/components/layout/ContentCard'
import { IUserDetails } from '@/types'

const RatingUsers = ({ userList }: { userList: IUserDetails[] | null }) => (
  <ContentCard>
    <h2 className='text-27 font-medium text-light mb-16'>Top 3 players</h2>
    { userList ? userList.map((user, index) => (
      <div key={user.id}>
        <div className='mb-16'>
          <div className='flex items-start'>
            <p className='text-34 leading-[1.2] text-accent font-bold mr-16'>{index + 1}</p>
            <div>
              <h4>
                <span className='text-16 font-bold text-white'>{user.displayName}</span>
              </h4>
              <p className='text-14 text-white'>Points: {user.points}</p>
            </div>
          </div>
        </div>
      </div>
    )) : <p className='text-20 leading-[1.1] text-white font-bold my-16'>No data</p> } 
  </ContentCard>
)

export default RatingUsers
