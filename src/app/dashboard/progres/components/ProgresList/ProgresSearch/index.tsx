import Image from 'next/image'

const ProgresSearch = ({ onSearchChange }: { onSearchChange: (txt: string) => void }) => (
  <div className='flex items-center mb-16'>
    <input
      className='block w-4/5 md:w-1/2 from-white to-light bg-gradient-to-r p-8 rounded-md my-8 focus:outline-addl appearance-none cursor-pointer'
      type='text'
      placeholder='Search the question'
      onChange={(e) => { onSearchChange(e.target.value) }}
    />
    <Image
      className='ml-16'
      src='/assets/search.svg'
      height={30}
      width={30}
      alt='search'
    />
  </div>
)

export default ProgresSearch
