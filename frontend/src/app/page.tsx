'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ContractIds } from '@/deployments/deployments';
import { HomePageTitle } from '@/app/components/home-page-title';
import { ChainInfo } from '@/components/web3/chain-info';
import { PresaleInfo } from '@/components/web3/presale-info';
import { Tokenomics } from '@/components/web3/tokenomics';
import { Logo } from '@/components/web3/logo';
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
      <div className="container flex grow flex-col items-center justify-center">
        <HomePageTitle />

        {/* Swiper Carousel */}
        <Swiper
          className='my-swiper'
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
          autoHeight={true}
          effect='coverflow'
          
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
              
        
              "--swiper-navigation-color": "#FFFFFF",

              
            } as React.CSSProperties) // Casting to React.CSSProperties
            
          }} 
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          pagination={{ type: 'progressbar', clickable: false }}
          navigation={{ enabled: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          
        >
          <SwiperSlide className="slide"><Logo /></SwiperSlide>
          
          <SwiperSlide className="slide" ><BugBiteContractInteractions /></SwiperSlide>
          <SwiperSlide className="slide"><Tokenomics /></SwiperSlide>
          <SwiperSlide className="slide"><PresaleInfo /></SwiperSlide>
          {/* Add more SwiperSlides as needed */}
        </Swiper>

        {/* Contract Address */}
        <p className="text-center font-mono text-xs text-gray-600 mt-4 mb-4">
          Contract Address: <br />
          {contract ? contractAddress : 'Loading…'}
        </p>

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="theme-toggle">
        <Image src={themeIcon} priority height={18} width={18} alt={`${themeLabel} Theme Icon`} />
      
      </button>
      </div>
    </>
  );
}