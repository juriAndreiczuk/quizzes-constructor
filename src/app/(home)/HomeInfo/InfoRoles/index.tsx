import Button from '@/app/components/ui/Button'
import { IInfoRoles } from '@/types'
import Image from 'next/image'

const InfoRoles = ({ rolesTitle, rolesList }: IInfoRoles) => (
  <div>
    <div className='mt-32 border-t-[1px] border-t-addl pt-32'>
      <h3 className='text-34 font-medium text-accent text-center'>{ rolesTitle }</h3>
      { rolesList && rolesList.map(item => (
        <div key={item.title} className='mt-32'>
          <div className='flex items-center'>
            <Image
              src={item.icon}
              alt={item.title}
              width={30}
              height={30}
            />
            <h4 className='text-20 font-medium text-light ml-16'>{ item.title }</h4>
          </div>
          <p className='text-16 font-normal my-8 text-white mb-16'>{ item.text }</p>
        </div>
      )) }
    </div>
    <div className='flex justify-center mt-32'>
      <Button btnLink='/auth'>
        Start
      </Button>
    </div>
  </div>
)

export default InfoRoles
