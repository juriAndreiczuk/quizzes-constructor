import  Button from '@/app/components/ui/Button'
import Image from 'next/image'
import { IPageIntro } from '@/types/content.types'

const PageIntro = ( { introTitle, introButton, introIcon }: IPageIntro ) => (
  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-32'>
    <div className='flex items-center mb-16 sm:mb-0'>
      { introIcon && (
        <Image
          className='mr-16'
          src={ introIcon }
          alt={introTitle}
          width={30}
          height={30}
        />
      ) }
      <h1 className='text-34 font-medium text-light'>{ introTitle }</h1>
    </div>
    { introButton && (
      <Button
        btnLink={ introButton.url }
        btnMod='accent-small'
      >
        { introButton.label }
      </Button>
    ) }
</div>
)

export default PageIntro
