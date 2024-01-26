'use client'

import { FC, useState, useEffect } from 'react';

type HomePageTitleProps = {
  activeSlide: number;
};

export const HomePageTitle: FC<HomePageTitleProps> = ({ activeSlide }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Immediately set opacity to 0 when activeSlide changes
    setOpacity(0);

    // Wait for a very brief moment before fading in
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 10); // small delay for the fade-in effect

    return () => clearTimeout(timer);
  }, [activeSlide]);

  let content;
  switch (activeSlide) {
    case 0:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Welcome to Pledge Monster!</h1>
          
          <p className="text-m mt-2  w-10/12 mx-auto">
            Discover a world where dreams become reality. Pledge Monster is your go-to platform for turning ideas into successful projects. Join us on this exciting journey!
          </p>
        </div>

      );
    break;
    case 1:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Choose Your Category</h1>
        
          <p className="text-m mt-2  w-10/12 mx-auto">
            Select the perfect category and subcategory for your project. Whether its tech innovation or creative arts, find your niche here and let your idea shine!
          </p>
        </div>

      );
    break;
    case 2:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Your Projects Location</h1>
          
          <p className="text-m mt-2 w-10/12 mx-auto">
            Tell us where your project is based. Connecting with local communities or reaching a global audience starts with your location.
          </p>
        </div>

      );
    break;
    case 3:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Media Matters</h1>
          
          <p className="text-m mt-2  w-10/12 mx-auto">
            Bring your project to life with images and videos. Show your audience the vision and passion behind your idea.
          </p>
        </div>

      );
    break;
    case 4:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Set Your Timeline</h1>
        
          <p className="text-m mt-2 w-10/12 mx-auto">
            Choose your launch date and campaign duration. Timing is key to success – plan your journey with us!
          </p>
        </div>

      );
    break;
    case 5:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Goals and Rewards</h1>
          
          <p className="text-m mt-2  w-10/12 mx-auto">
            Set your funding targets and create attractive reward tiers for your backers. Let your supporters become a part of your success.
          </p>
        </div>

      );
    break;
    case 6:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Story and Challenges</h1>
          
          <p className="text-m mt-2  w-10/12 mx-auto">
            Share the journey that led you here. Be transparent about potential risks and challenges, and how you plan to overcome them.
          </p>
        </div>

      );
    break;
    case 7:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">FAQ</h1>
        
          <p className="text-m mt-2  w-10/12 mx-auto">
            Address common queries and concerns. Your FAQs can provide reassurance and clarity to your backers.
          </p>
        </div>

      );
    break;
    case 8:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Project Information</h1>
          
          <p className="text-m mt-2  w-10/12 mx-auto">
            Detail the specifics of your project. What are you creating? Whats the vision? Let your audience know everything about your project.
          </p>
        </div>

      );
    break;
    case 9:
      content = (
        <div>
          <h1 className="text-[2.5rem] font-black tracking-tighter">Meet the Team</h1>
          
          <p className="text-m mt-2  w-10/12 mx-auto">
            Introduce your talented team. Share your stories and experiences that make you the perfect group to bring this project to life.
          </p>
        </div>

      );
    break;
    
    default:
      content = "Default Content";
  }

  return (
    <>
       <div className="flex items-center text-center font-mono">
        <div className="container flex flex-col justify-center items-center text-center font-mono overflow-hidden content-container" style={{ transition: 'opacity 0.5s ease-in-out', opacity: opacity }}>
          {content}
        </div>
      </div>
    </>
  );
};