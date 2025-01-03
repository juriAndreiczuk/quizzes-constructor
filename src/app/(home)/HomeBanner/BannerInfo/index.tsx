import Button from '@/app/components/ui/Button'
import Image from 'next/image'
import { IHomeBanner } from '@/types'

const BannerInfo = ({ infoTitle, infoDesc, infoButton, infoImage }: IHomeBanner) => (
  <div className='relative grid md:grid-cols-2'>
    <div className='z-20 relative col-span-1 h-full flex items-center'>
      <div className='flex flex-col items-start'>
        <h1 className='text-50 sm:text-71 md:text-[80px] leading-[1.2] font-bold text-center bg-gradient-to-r from-accent to-addl bg-clip-text text-transparent'>{ infoTitle }</h1>
        <h2 className='text-16 sm:text-18 font-normal my-16 text-white'>{ infoDesc }</h2>
        <Button btnLink={infoButton.url}>
          {infoButton.title}
        </Button>
      </div>
    </div>
    <div className='col-span-1 flex h-full items-center justify-center md:justify-end mt-32 md:mt-0'>
      <div className='rounded-full border-4 border-white w-[290px] overflow-hidden relative'>
        <div
          className='absolute w-[220px] h-[71px]  top-[51%]  left-[50%] tranform translate-x-[-50%] translate-y-[-50%] z-20 rounded-[50%] animate-pulse'
          style={{ boxShadow: '0px 20px 20px 0px MediumOrchid' }}
        />
        <Image
          className='relative block max-w-full z-10'
          src={infoImage}
          width={350}
          height={350}
          alt='planet'
        />
      </div>
    </div>
  </div>
)

export default BannerInfo
