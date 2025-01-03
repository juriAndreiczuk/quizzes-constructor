import InfoRoles from '@/app/(home)/HomeInfo/InfoRoles'
import InfoIntro from '@/app/(home)/HomeInfo/InfoIntro'
import InfoBox from '@/app/(home)/HomeInfo/InfoBox'
import homeContent from '@/content/home.json'
import AtomAnimation from '@/app/(home)/HomeInfo/InfoAnimations/AtomAnimation'

const HomeInfo = () => {
  const { boxes, intro, roles } = homeContent.info

  return (
    <section className='py-64'>
      <InfoIntro
        introTitle={intro.title}
        introDesc={intro.description}
      />
      <div className='grid md:grid-cols-2 text-center mt-32'>
        <div className='col-span-1'>
          <InfoBox
            boxTitle={boxes.quizzesBox.title}
            boxText={boxes.quizzesBox.description}
          >
            <p>Decoration placeholder</p>
          </InfoBox>
        </div>
        <div className='col-span-1'>
          <InfoBox
            boxTitle={boxes.surveysBox.title}
            boxText={boxes.surveysBox.description}
          >
            <AtomAnimation />
          </InfoBox>
        </div>
      </div>
      <InfoRoles
        rolesTitle={roles.title}
        rolesList={roles.list}
      />
    </section>
  )
}

export default HomeInfo
