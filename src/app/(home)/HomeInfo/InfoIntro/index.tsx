const InfoIntro = ({ introTitle, introDesc }: { introTitle: string, introDesc: string }) => (
  <div className='lg:px-64 pb-32'>
    <h2 className='text-50 text-light leading-[1] font-bold text-center mb-32'>
      { introTitle }
      <span className='bg-gradient-to-r from-accent to-addl bg-clip-text text-transparent block'>Quesearch</span>
    </h2>
    <p className='text-16 sm:text-18 font-normal my-16 text-white text-center'>{ introDesc }</p>
  </div>
)

export default InfoIntro
