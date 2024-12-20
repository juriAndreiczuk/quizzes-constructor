import Button from '@/app/components/ui/Button'
import { IBoxesList } from '@/types/content.types'
import ContentCard from '@/app/components/layout/ContentCard'

const BoxesList = ({ listItems }: { listItems: IBoxesList[] }) => {
  return (
    <ul className={`grid md:grid-cols-${listItems.length < 3 ? '2' : '3'} gap-5`}>
    { listItems.map(box => (
      box && box.link && (
        <li
          key={box.link}
          className='col-span-1'
        >
          <ContentCard cardClasses='w-full h-full'>
            <div className="flex flex-col justify-between w-full p-16 h-full text-center">
              <div>
                <h3 className='text-20 uppercase text-white font-medium'>{ box.title }</h3>
                <p className='text-12 text-white font-light mt-16'>{box.description}</p>
              </div>
              <div className='flex justify-center'>
                <Button btnLink={box.link} btnMod='primary-small'>Open</Button>
              </div>
            </div>
          </ContentCard>
        </li>
      )
    )) }
  </ul>
  )
}

export default BoxesList