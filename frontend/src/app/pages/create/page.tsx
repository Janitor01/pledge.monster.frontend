'use client'

import { useState } from 'react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import { HomePageTitle } from '@/app/components/home-page-title'
import { Category } from '@/components/web3/category'
import { Faq } from '@/components/web3/faq'
import { Goals } from '@/components/web3/goals'
import { Intro } from '@/components/web3/intro'
import { Launch } from '@/components/web3/launch'
import { Location } from '@/components/web3/location'
import { Media } from '@/components/web3/media'
import { ProjectInfo } from '@/components/web3/projectinfo'
import { Story } from '@/components/web3/story'
import { TeamInfo } from '@/components/web3/teaminfo'

import '../../globals.css'
import { ProjectDataProvider } from '../../projectdatacontext'

export default function CreatePage() {
  const [theme, setTheme] = useState('light')
  const [activeSlide, setActiveSlide] = useState(0)
  const [nextPageEnabled, setPageEnabled] = useState(false)
  const [titleContent, setTitleContent] = useState({ title: '', elevatorPitch: '', allSet: false })
  const [categoryContent, setCategoryContent] = useState({
    category: '',
    subCategory: '',
    allSet: false,
  })
  const [countryContent, setCountryContent] = useState({ country: '', allSet: false })
  const [mediaContent, setMediaContent] = useState({ imageUrl: '', videoUrl: '', allSet: false })
  const [launchTimeContent, setLaunchTimeContent] = useState({
    launchDate: '',
    endDate: '',
    allSet: false,
  })
  const [faqContent, setFaqContent] = useState({
    faqs: [],
    allSet: false,
  })
  // rewardTier: '',
  // tierDescription: '',
  // tierAmount: '',
  const [goalContent, setGoalContent] = useState({
    goal: '',
    rewardTier: [],
    allSet: false,
  })
  const [storyContent, setStoryContent] = useState({
    allSet: false,
    story: '',
    risks: '',
  })
  const [projectInfoContent, setProjectInfoContent] = useState({
    allSet: false,
    projectInfo: '',
    projectImageuRL: '',
    projectVideoUrl: '',
    twitter: '',
    telegram: '',
    discord: '',
    github: '',
  })
  const [teamContent, setTeamContent] = useState({
    allSet: false,
    team: [],
  })
  const [swiper, setSwiper] = useState({})

  const useUpdateSwiper = () => {
    setSwiper(useSwiper())
  }

  const validateNextPageEnabled = () => {
    const slides = [
      titleContent,
      categoryContent,
      countryContent,
      mediaContent,
      launchTimeContent,
      goalContent,
      storyContent,
      faqContent,
      projectInfoContent,
      teamContent,
    ]
    console.log({ activeSlide, ...titleContent })
    const currentSlide = slides[activeSlide]
    if (currentSlide.allSet) {
      setPageEnabled(true)
    }
  }
  return (
    <>
      <div className="container  flex grow flex-col items-center justify-center">
        <HomePageTitle activeSlide={activeSlide} />

        <Swiper
          className="swiper-3d swiper-container"
          modules={[Navigation, Pagination, A11y, EffectCoverflow]}
          autoHeight={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: true,
          }}
          style={{
            width: '100%',
            height: '50vh',
            margin: '0 auto',
            marginTop: '2%',
            paddingLeft: 0,

            ...({
              '--swiper-navigation-sides-offset': '8%',
            } as React.CSSProperties),
          }}
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          pagination={{ type: 'progressbar', clickable: false }}
          navigation={{ enabled: true }}
          allowSlideNext={nextPageEnabled}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.activeIndex)
            setPageEnabled(false)
          }}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },

            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },

            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <ProjectDataProvider>
            <SwiperSlide className="slide">
              <Intro
                titleContent={titleContent}
                setTitleContent={setTitleContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Category
                categoryContent={categoryContent}
                setCategoryContent={setCategoryContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Location
                countryContent={countryContent}
                setCountryContent={setCountryContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Media
                mediaContent={mediaContent}
                setMediaContent={setMediaContent}
                validateNextPageEnabled={validateNextPageEnabled}
                theme={theme}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Launch
                launchTimeContent={launchTimeContent}
                setLaunchTimeContent={setLaunchTimeContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Goals
                goalContent={goalContent}
                setGoalContent={setGoalContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Story
                storyContent={storyContent}
                setStoryContent={setStoryContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Faq
                faqContent={faqContent}
                setFaqContent={setFaqContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <ProjectInfo
                theme={theme}
                projectInfoContent={projectInfoContent}
                setProjectInfoContent={setProjectInfoContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <TeamInfo
                theme={theme}
                teamContent={teamContent}
                setTeamContent={setTeamContent}
                validateNextPageEnabled={validateNextPageEnabled}
              />
            </SwiperSlide>
          </ProjectDataProvider>
        </Swiper>
      </div>
    </>
  )
}
