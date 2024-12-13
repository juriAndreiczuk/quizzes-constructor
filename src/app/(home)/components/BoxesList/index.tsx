import Button from '@/app/components/ui/Button'
import { IBoxesList } from '@/types/content.types'

const BoxesList = ({ listItems }: { listItems: IBoxesList[] }) => {
  return (
    <ul className='grid grid-cols-3 gap-5'>
    { listItems.map(box => (
      box && box.link && (
        <li
          key={box.link}
          className='col-span-1'
        >
          <div className='block w-full h-full bg-light rounded-xl'>
            <div className="flex flex-col justify-between w-full p-16 h-full">
              <div>
                <h3 className='text-20 uppercase text-dark font-medium'>{ box.title }</h3>
                <p className='text-12 text-dark font-light my-16'>{box.description}</p>
              </div>
              <div className='flex justify-end'>
                <Button btnLink={box.link} btnMod='primary-small'>Show more</Button>
              </div>
            </div>
          </div>
        </li>
      )
    )) }
  </ul>
  )
}

export default BoxesList