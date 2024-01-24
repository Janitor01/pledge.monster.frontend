'use client'

import { useEffect } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { A11y, EffectCoverflow, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { HomePageTitle } from '@/app/components/home-page-title'
import { BugBiteContractInteractions } from '@/components/web3/bugbite-contract-interaction'
import { Logo } from '@/components/web3/logo'
import { PresaleInfo } from '@/components/web3/presale-info'
import { Tokenomics } from '@/components/web3/tokenomics'

import { HomeTopBar } from './components/home-top-bar'
import './globals.css'

export default function HomePage() {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.bugbite)

  return (
    <>
      <div className="relative mt-2">
        <HomeTopBar />
      </div>
      <div className="container flex grow flex-col items-center justify-center">
        <HomePageTitle />

        {/* Swiper Carousel */}
        <Swiper
          className="my-swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
          autoHeight={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 30, // Rotation of the slide in degrees
            stretch: 0, // Stretch space between slides (in px)
            depth: 400, // Depth offset inpx (slides translate in Z axis)
            modifier: 1, // Effect multiplier
            slideShadows: true, // Enables/disables slide shadows
          }}
          style={{
            width: '100%',
            height: '40%',
            margin: '0 auto',
            marginTop: '2%',
            paddingLeft: 35,

            ...({
              '--swiper-navigation-color': '#FFFFFF',
            } as React.CSSProperties), // Casting to React.CSSProperties
          }}
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          pagination={{ type: 'progressbar', clickable: false }}
          navigation={{ enabled: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className="slide">
            <Logo />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <BugBiteContractInteractions />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <Tokenomics />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <PresaleInfo />
          </SwiperSlide>
          {/* Add more SwiperSlides as needed */}
        </Swiper>

        {/* Contract Address */}
        <p className="mb-4 mt-4 text-center font-mono text-xs text-gray-600">
          Contract Address: <br />
          {contract ? contractAddress : 'Loading…'}
        </p>
      </div>
    </>
  )
}
