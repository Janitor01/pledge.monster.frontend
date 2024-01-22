'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ContractIds } from '@/deployments/deployments';
import { HomePageTitle } from '@/app/components/home-page-title';
import { ChainInfo } from '@/components/web3/chain-info';
import { PresaleInfo } from '@/components/web3/presale-info';
import { Intro } from '@/components/web3/intro';
import { Category } from '@/components/web3/category';
import { Location } from '@/components/web3/location';
import { Media } from '@/components/web3/media';
import { Launch } from '@/components/web3/launch';
import { Goals } from '@/components/web3/goals';
import { Story } from '@/components/web3/story';
import { Faq } from '@/components/web3/faq';
import { ProjectInfo } from '@/components/web3/projectinfo';
import { TeamInfo } from '@/components/web3/teaminfo';
import { ConnectButton } from '@/components/web3/connect-button';
import { GreeterContractInteractions } from '@/components/web3/greeter-contract-interactions';
import { BugBiteContractInteractions } from '@/components/web3/bugbite-contract-interaction';
import { HomeTopBar } from './components/home-top-bar';
import { contractQuery, useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon';
import { Swiper, SwiperSlide } from 'swiper/react';
import themedark from 'public/icons/themedark.svg'
import themelight from 'public/icons/themelight.svg'
import 'swiper/css';
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { ProjectDataProvider } from '../app/projectdatacontext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './globals.css';
import { AlignCenter } from 'lucide-react';

export default function HomePage() {
  const [theme, setTheme] = useState('light'); // Set default theme as 'light'

  useEffect(() => {
    // Access localStorage only after component mounts
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Apply the saved theme class to the body element
    document.body.className = savedTheme;
  }, []);

  const themeIcon = theme === 'light' ? themedark : themelight;
  const themeLabel = theme === 'light' ? 'Dark' : 'Light';

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Apply the new theme class to the body element
    document.body.className = newTheme;
  };

  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon();
  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.bugbite);

  return (
    <>
    
      <div className='relative mt-2'>
        <HomeTopBar />
      </div>

      <div className="container  flex grow flex-col items-center justify-center">       
        <Swiper
          className="swiper-3d"
          modules={[Navigation, Pagination, A11y, EffectCoverflow]}
          autoHeight={true}
          effect='coverflow'       
          coverflowEffect={{
            rotate: 30, 
            stretch: 0, 
            depth: 400, 
            modifier: 1, 
            slideShadows: true,
            }}
          
          style={{ 
            width: '100%', 
            height: '50%', 
            margin: '0 auto',
            marginTop: '2%',
            paddingLeft: 0,
        
            ...({ 
              "--swiper-navigation-sides-offset": "10%",        
            } as React.CSSProperties)
            
          }} 
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          pagination={{ type: 'progressbar', clickable: false }}
          navigation={{ enabled: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}

          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1.5,
              spaceBetween: 10
            },
            
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20
            },
            
            640: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            
          }}    
        >

          
          <ProjectDataProvider>
          <SwiperSlide className="slide"><Intro /></SwiperSlide>              
          <SwiperSlide className="slide" ><Category /></SwiperSlide>
          <SwiperSlide className="slide">< Location /></SwiperSlide>
          <SwiperSlide className="slide">< Media /></SwiperSlide>
          <SwiperSlide className="slide">< Launch /></SwiperSlide>
          <SwiperSlide className="slide">< Goals /></SwiperSlide>
          <SwiperSlide className="slide">< Story /></SwiperSlide>
          <SwiperSlide className="slide">< Faq /></SwiperSlide>
          <SwiperSlide className="slide">< ProjectInfo /></SwiperSlide>
          <SwiperSlide className="slide">< TeamInfo /></SwiperSlide>
          </ProjectDataProvider>
          
        </Swiper>
          
        





      <p className="text-center font-mono text-xs text-gray-600 mt-4 mb-4">
        pledge.monster <br />
        decentralized fundraising
      </p>

      
      <button onClick={toggleTheme} className="theme-toggle">
        <Image src={themeIcon} priority height={18} width={18} alt={`${themeLabel} Theme Icon`} />
      </button>
      </div>
      
    </>
  );
}