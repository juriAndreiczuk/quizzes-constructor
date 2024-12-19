import  Button from '@/app/components/ui/Button'

const PageIntro = (
  { introTitle, introButton }:
  { introTitle: string, introButton?: { url: string, label: string } }
) => (
  <div className='flex items-center justify-between mb-32'>
    <h1 className='text-34 font-bold text-light'>{ introTitle }</h1>
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
