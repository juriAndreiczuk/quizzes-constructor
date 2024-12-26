import ContentCard from '@/app/components/layout/ContentCard'
import { ITeamRarting } from '@/types'

const RatingTeams = ({ teamList }: { teamList: ITeamRarting[] | null }) => (
  <ContentCard>
    <h2 className='text-27 font-medium text-light mb-16'>Best teams</h2>
    { teamList ? teamList.map(({ team, points }, index) => (
      <div key={team.id} className='mb-16'>
        <h4 className='text-20 font-bold text-white mb-8'>{team.name}</h4>
        <p className='text-16 text-white'>Points: {points}</p>
        <div
          className='h-[.5rem] bg-gradient-to-r from-addl to-light my-16'
          style={{ width: `${((points / teamList[0].points) * 100).toFixed()}%` }}
        />
      </div>
    )) : <p className='text-20 leading-[1.1] text-white font-bold my-16'>No data</p> }
  </ContentCard>
)

export default RatingTeams
