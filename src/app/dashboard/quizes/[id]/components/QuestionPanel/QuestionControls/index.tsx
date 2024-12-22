import Button from '@/app/components/ui/Button'

const QuestionControls  = ({ pointsAmount, showAlert, isDisabled, onClick }: {
  pointsAmount: string | number | undefined,
  showAlert: boolean | undefined,
  isDisabled: boolean | undefined
  onClick: () => void
}) => (
  <div className='mt-16 flex justify-between items-center'>
    <div>
      { showAlert && (
        <div>
          <div className='bg-white py-8 px-16 rounded-md shadow-accent animate-pulse'>
            <p className='text-16 text-main font-medium'>
              You receive <span className='text-accent'>{ pointsAmount }%</span> of the points.
            </p>
          </div>
          <div className='h-[.2rem] w-full mt-8 bg-gradient-to-br from-accent to-light animate-loading-line origin-left'></div>
        </div>
      )}
    </div>
    <Button
      btnDisabled={ isDisabled }
      buttonClick={onClick}
    >
      Send
    </Button>
  </div>
)

export default QuestionControls
