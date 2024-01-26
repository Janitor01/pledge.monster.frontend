'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import themedark from 'public/icons/themedark.svg'
import themelight from 'public/icons/themelight.svg'
import { toast } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

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

import { ProjectDataProvider } from '../app/projectdatacontext'
import { HomeTopBar } from './components/home-top-bar'
import './globals.css'

export default function HomePage() {
  const [theme, setTheme] = useState('light')
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.body.className = savedTheme
  }, [])

  const themeIcon = theme === 'light' ? themedark : themelight
  const themeLabel = theme === 'light' ? 'Dark' : 'Light'

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.className = newTheme
  }

  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <div className="relative mt-2">
        <HomeTopBar />
      </div>

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
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
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
              <Intro />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Category />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Location />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Media theme={theme} />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Launch />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Goals />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Story />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Faq />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <ProjectInfo theme={theme} />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <TeamInfo theme={theme} />
            </SwiperSlide>
          </ProjectDataProvider>
        </Swiper>

        <p className="mb-4 mt-4 text-center font-mono text-xs text-gray-600">
          pledge.monster <br />
          decentralized fundraising
        </p>

        <button onClick={toggleTheme} className="theme-toggle">
          <Image src={themeIcon} priority height={18} width={18} alt={`${themeLabel} Theme Icon`} />
        </button>
      </div>
    </>
  )
}
