'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import toast from 'react-hot-toast'
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
import IpfsHelper from '@/utils/IpfsHelpers'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

import '../../globals.css'
import { ProjectDataProvider } from '../../projectdatacontext'

export default function CreatePage() {
  const { api, activeAccount, activeSigner } = useInkathon()
  const router = useRouter()

  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.pledge)

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
  const [isTransactionLoading, setTransactionLoading] = useState(false)
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

  const handleSubmitButton = async () => {
    if (isTransactionLoading) {
      return
    }

    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }
    setTransactionLoading(true)
    const TeamMember = {
      name: 'String',
      role: 'String',
      image_url: 'String',
      social_media_links: ['Vec<String>'],
    }

    console.log('start')
    const ipfs = new IpfsHelper()
    await ipfs.initialize()
    const selectedFile = mediaContent.imageUrl
    console.log(selectedFile)
    const { data } = await ipfs.putFile([selectedFile as unknown as File])
    const imageLink = `https://${data}.ipfs.w3s.link/${(selectedFile as unknown as File).name}`
    console.log({
      data,
      link: `https://${data}.ipfs.w3s.link/${(selectedFile as unknown as File).name}`,
    })
    console.log('finish')

    const newTeam = await Promise.all(
      teamContent.team.map(async (team, index) => {
        const { data } = await ipfs.putFile([team.image_url as unknown as File])
        const image_url = `https://${data}.ipfs.w3s.link/${
          (team.image_url as unknown as File).name
        }`
        return { ...team, image_url }
      }),
    )
    console.log({ newTeam })

    const ProjectInfo = {
      name: titleContent.title,
      info: projectInfoContent.projectInfo,
      image_url: projectInfoContent.projectImageuRL,
      video_url: projectInfoContent.projectVideoUrl,
      social_media_links: [
        projectInfoContent.twitter,
        projectInfoContent.telegram,
        projectInfoContent.discord,
        projectInfoContent.github,
      ],
    }
    const FAQ = {
      question: 'String',
      answer: 'String',
    }

    const RewardTier = {
      amount: 1,
      description: 'String',
    }
    const project = {
      title: titleContent.title,
      elevator_pitch: titleContent.elevatorPitch,
      category: categoryContent.category,
      subcategory: categoryContent.subCategory,
      location: countryContent.country,
      image_url: imageLink,
      video_url: mediaContent.videoUrl,
      launch_date: new Date(launchTimeContent.launchDate).getTime(), // Unix timestamp
      duration: 20, // in seconds
      funding_goals: [Number(goalContent.goal) * 1e12],
      reward_tiers: [RewardTier],
      story: storyContent.story,
      risks_and_challenges: storyContent.risks,
      faqs: faqContent.faqs,
      project_info: ProjectInfo,
      member_info: newTeam,
      wallet: activeAccount.address,
      project_urls: [
        projectInfoContent.twitter,
        projectInfoContent.telegram,
        projectInfoContent.discord,
        projectInfoContent.github,
      ],
    }
    try {
      const userLengthResult = await contractQuery(
        api as ApiPromise,
        '',
        contract as ContractPromise,
        'get_length_of_user',
        undefined,
        [activeAccount.address],
      )
      console.log({ launchTimeContent })

      const {
        output: userLength,
        isError: isE,
        decodedOutput: decO,
      } = decodeOutput(userLengthResult, contract as ContractPromise, 'get_length_of_user')
      console.log({ userLength })
      const result = await contractTxWithToast(
        api,
        activeAccount.address,
        contract,
        'deploy_crowdfund',
        {},
        [project, userLength],
      )
      console.log({ result })
      const { output, isError, decodedOutput } = decodeOutput(
        result.dryResult,
        contract as ContractPromise,
        'deploy_crowdfund',
      )
      console.log({ output })
    } catch (e) {
      setTransactionLoading(false)
      console.error(e)
    } finally {
      setTransactionLoading(false)
      console.log('Done')
      router.back()
    }
  }
  return (
    <>
      <div className="container  flex grow flex-col items-center justify-center">
        <HomePageTitle activeSlide={activeSlide} />
        {isTransactionLoading && <span className="loading loading-spinner loading-lg"></span>}
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
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Location
                countryContent={countryContent}
                setCountryContent={setCountryContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Media
                mediaContent={mediaContent}
                setMediaContent={setMediaContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
                theme={theme}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Launch
                launchTimeContent={launchTimeContent}
                setLaunchTimeContent={setLaunchTimeContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Goals
                goalContent={goalContent}
                setGoalContent={setGoalContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Story
                storyContent={storyContent}
                setStoryContent={setStoryContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <Faq
                faqContent={faqContent}
                setFaqContent={setFaqContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <ProjectInfo
                theme={theme}
                projectInfoContent={projectInfoContent}
                setProjectInfoContent={setProjectInfoContent}
                validateNextPageEnabled={validateNextPageEnabled}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
            <SwiperSlide className="slide">
              <TeamInfo
                theme={theme}
                teamContent={teamContent}
                setTeamContent={setTeamContent}
                validateNextPageEnabled={validateNextPageEnabled}
                handleSubmitButton={handleSubmitButton}
                swiper={swiper}
                updateSwiper={useUpdateSwiper}
              />
            </SwiperSlide>
          </ProjectDataProvider>
        </Swiper>
      </div>
    </>
  )
}
