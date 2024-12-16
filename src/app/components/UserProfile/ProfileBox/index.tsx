const ProfileBox = ({ boxLabel, boxText }
  : { boxLabel: string, boxText: string | undefined | number }
) => (
  <div className='flex mb-4'>
    <h3 className='font-bold text-white'>{boxLabel}</h3>
    { boxText && <p className='font-light px-8 text-white'>{boxText}</p> }
  </div>
)

export default ProfileBox