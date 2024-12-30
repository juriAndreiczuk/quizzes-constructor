import PageHeader from '@/app/components/layout/PageHeader'
import AuthPanel from '@/app/auth/components/AuthPanel'
import Button from '@/app/components/ui/Button'
import Image from 'next/image'

const Auth = () => (
  <>
    <PageHeader>
      <Button
        btnLink='/'
        btnMod='accent-small'
      >
        <span className='hidden sm:block'>Homepage</span>
        <Image
          className='sm:ml-8'
          src='/assets/home-alt-slim-horiz.svg'
          width={20}
          height={20}
          alt='house'
        />
      </Button>
    </PageHeader>
    <AuthPanel />
  </>
)

export default Auth
