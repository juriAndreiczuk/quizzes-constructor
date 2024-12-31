import Button from '@/app/components/ui/Button'
import Image from 'next/image'

const QuestionsFinish = () => (
  <>
    <p className='text-34 text-center text-white font-bold mt-32'>Quiz completed !</p>
    <Image
      className='mx-auto mt-32'
      src='/assets/clipboard-check.svg'
      width={100}
      height={100}
      alt='completed quiz'
    />
    <div className='flex justify-center mt-32'>
      <Button
        btnMod='primary-small'
        btnLink='/dashboard/progres'
      >
        Check your progress
      </Button>
    </div>
  </>
)

export default QuestionsFinish
