import { IInfoBox } from '@/types/'

const InfoBox = ({ boxTitle, boxText, children }: IInfoBox) => (
  <div>
    <h3 className='text-34 font-medium text-accent'>{boxTitle}</h3>
    <div className='rounded-full border-4 border-white w-[290px] h-[290px] my-16 overflow-hidden mx-auto relative flex items-center justify-center bg-dark'>
      { children }
    </div>
    <p className='text-16 font-normal my-16 text-white lg:px-32'>{boxText}</p>
  </div>
)

export default InfoBox
