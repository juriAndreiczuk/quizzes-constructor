import Image from 'next/image'

const PageHeader = ({ children }: { children: React.ReactNode }) => (
  <header className='mb-32'>
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <Image
          className='max-w-[5rem] md:max-w-[120px]'
          src='/assets/logo.png'
          height={120}
          width={120}
          alt='astronaut'
        />
        <div className='flex flex-col justify-center pl-8 md:pl-32'>
          <h1 className='font-bold text-light text-27 md:text-34 leading-[1.3]'>Quesearch</h1>
          <p className='font-normal text-16 hidden sm:block md:text-18 text-white pb-4'>Quizzes & researches</p>
        </div>
      </div>
      <div className='sm:pr-4'>
        { children }
      </div>
    </div>
  </header>
)

export default PageHeader
