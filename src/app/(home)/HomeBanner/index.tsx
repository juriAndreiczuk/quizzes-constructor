import pageContent from '@/content/home.json'
import BannerSlider from '@/app/(home)/HomeBanner/BannerSlider'
import BannerInfo from '@/app/(home)/HomeBanner/BannerInfo'
import BannerButton from '@/app/(home)/HomeBanner/BannerButton'

const HomeBanner = () => (
  <section className='mt-64'>
    <BannerSlider sliderText={pageContent.banner.slider} />
    <BannerInfo
      infoTitle={pageContent.banner.title}
      infoDesc={pageContent.banner.description}
      infoButton={pageContent.banner.button}
      infoImage={pageContent.banner.image}
    />
    <BannerButton />
  </section>
)

export default HomeBanner
