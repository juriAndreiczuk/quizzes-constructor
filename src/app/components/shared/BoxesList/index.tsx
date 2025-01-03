import clsx from 'clsx'
import Button from '@/app/components/ui/Button'
import { IBoxesList } from '@/types'
import ContentCard from '@/app/components/layout/ContentCard'
import Image from 'next/image'

const BoxesList = ({ listItems }: { listItems: IBoxesList[] }) => (
  <ul className={clsx(
    'grid gap-5 sm:grid-cols-2',
    listItems.length < 3 ? '' : 'lg:grid-cols-3'
  )}
  >
    { listItems.map(box => (
      box && box.link && (
        <li
          key={box.link}
          className='col-span-1 md:grid-cols-2'
        >
          <ContentCard
            cardClasses='w-full h-full'
            cardMod='mini'
            cardParalax
          >
            <div className="flex flex-col justify-between w-full p-16 h-full text-center">
              <div>
                { box.icon && (
                  <Image
                    className='mx-auto mb-16'
                    src={box.icon}
                    alt={box.title}
                    height={30}
                    width={30}
                  />
                )}
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

export default BoxesList
