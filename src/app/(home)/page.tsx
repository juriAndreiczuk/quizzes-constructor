import PageHeader from '@/app/components/layout/PageHeader'
import HomeBanner from '@/app/(home)/HomeBanner'
import Button from '@/app/components/ui/Button'
import Image from 'next/image'

const Home = () => (
  <>
    <PageHeader>
      <Button
        btnLink='/auth'
        btnMod='accent-small'
      >
        <span className='hidden sm:block'>Start</span>
        <Image
          className='sm:ml-8'
          src='/assets/rocket.svg'
          width={20}
          height={20}
          alt='house'
        />
      </Button>
    </PageHeader>
    <HomeBanner />
  </>
)

export default Home
