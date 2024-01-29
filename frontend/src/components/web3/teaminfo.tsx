'use client'

import Image from 'next/image'
import React, { FC, useEffect, useRef, useState } from 'react'

import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import 'swiper/css'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { useProjectData } from '../../app/projectdatacontext'

type TeamMember = {
  name: string
  role: string
  image_url: string
  social_media_links: string[]
}

type TeamInfoFormData = {
  team_members: TeamMember[]
}

const inputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

export const TeamInfo: FC<{ theme: string }> = ({
  theme,
  teamContent,
  setTeamContent,
  validateNextPageEnabled,
  handleSubmitButton,
}) => {
  useEffect(() => {
    console.log(teamContent)
    validateNextPageEnabled()
  }, [teamContent])
  const methods = useForm<TeamInfoFormData>({
    defaultValues: {
      team_members: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'team_members',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { projectData, setProjectData } = useProjectData()
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const handleAddTeamMember = (member: TeamMember) => {
    append(member)
    setTeamContent({ ...teamContent, team: [...teamContent.team, member], allSet: true })
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const onSubmit = (data: TeamInfoFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
    handleSubmitButton()
  }

  const socialMediaPlatforms = [
    { name: 'Twitter', iconPath: '/icons/twitter.svg' },
    { name: 'Telegram', iconPath: '/icons/telegram.svg' },
    { name: 'Discord', iconPath: '/icons/discord.svg' },
    { name: 'Github', iconPath: '/icons/github.svg' },
  ]

  return (
    <>
      <FormProvider {...methods}>
        <Card className="card-component">
          <CardContent className="pb-3 pt-6">
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <Button type="button" onClick={openModal}>
                Add New Team Member
              </Button>

              <Swiper
                className="team-info-swiper"
                modules={[Navigation, A11y]}
                spaceBetween={10}
                slidesPerView={'auto'}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={{ enabled: true }}
                style={{
                  width: '100%',
                  margin: '0 auto',
                  marginTop: '2%',
                  paddingLeft: 0,
                  borderRadius: '15px',
                  background: theme === 'light' ? '#D1DBE1' : '#3C4143',

                  ...({
                    '--swiper-navigation-sides-offset': '2%',
                    '--swiper-navigation-color': 'white',
                  } as React.CSSProperties),
                }}
              >
                {fields.map((field, index) => (
                  <SwiperSlide key={field.id} className="team-info-swiper">
                    <div className={'team-member-item ${theme}-theme'}>
                      {field.image_url ? (
                        <img
                          src={field.image_url}
                          alt={field.name}
                          onError={(e) => {
                            e.currentTarget.src = 'default-image-url'
                          }}
                        />
                      ) : (
                        <div>No Image Available</div>
                      )}
                      <div>
                        {field.name}
                        <br />
                        {field.role}
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          remove(index)
                          let team = [...teamContent.team]
                          team = team.filter((el, currentIndex) => currentIndex != index)
                          setTeamContent({ ...teamContent, team, allSet: team.length > 0 })
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Button>
                <input type="submit" value="Submit" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>

      {isModalOpen && (
        <div className="popup-style" ref={modalRef}>
          <TeamMemberFormModal
            onConfirm={handleAddTeamMember}
            theme={theme}
            socialMediaPlatforms={socialMediaPlatforms}
          />
        </div>
      )}
    </>
  )
}

export default TeamInfo

const TeamMemberFormModal: FC<{
  onConfirm: (member: TeamMember) => void
  theme: string
  socialMediaPlatforms: any[]
}> = ({ onConfirm, theme, socialMediaPlatforms }) => {
  const { register, handleSubmit, reset, setValue, getValues } = useForm<TeamMember>()
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [socialMediaLinks, setSocialMediaLinks] = useState<{ [key: string]: string }>({})

  const [showSocialMediaLinkForm, setShowSocialMediaLinkForm] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setValue('image_url', newUrl)
    setImagePreviewUrl(newUrl)
  }

  const handleSocialMediaIconClick = (platform: string) => {
    setSelectedPlatform(platform)
    setShowSocialMediaLinkForm(true)
  }

  const handleAddSocialMediaLink = (platform: string, url: string) => {
    setSocialMediaLinks({ ...socialMediaLinks, [platform]: url })
    setSelectedPlatform(null)
  }

  const onSubmit = () => {
    const nameValue = getValues('name')
    const roleValue = getValues('role')

    const updatedData = {
      name: nameValue,
      role: roleValue,
      image_url: imagePreviewUrl || '',
      social_media_links: Object.entries(socialMediaLinks).map(([_, url]) => url),
    }

    console.log('Submitting data:', updatedData)
    onConfirm(updatedData)
    reset()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowSocialMediaLinkForm(false)
        setSelectedPlatform(null)
        reset()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [reset])

  return (
    <>
      <div className="modal-content-wrapper" ref={modalRef}>
        <Card className="card-component">
          <CardContent className="pb-3 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <input {...register('name')} placeholder="Name" className={inputClassName} />
              <input {...register('role')} placeholder="Role" className={inputClassName} />
              <input
                value={getValues('image_url') || ''}
                onChange={handleImageUrlChange}
                placeholder="Image URL"
                className={inputClassName}
              />
              {imagePreviewUrl && (
                <img src={imagePreviewUrl} alt="Preview" className="h-auto w-1/3" />
              )}
              <h2 className="mt-4 text-center font-mono text-gray-400">Social Media</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: '1%',
                  marginBottom: '2%',
                }}
              >
                {socialMediaPlatforms.map((platform) => (
                  <div
                    key={platform.name}
                    onClick={() => handleSocialMediaIconClick(platform.name)}
                    className="social-media-icon"
                  >
                    <Image
                      src={platform.iconPath}
                      alt={platform.name}
                      width={24}
                      height={24}
                      className={theme === 'light' ? 'invert-image' : ''}
                    />
                  </div>
                ))}
              </div>
              <Button type="submit">Confirm</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {showSocialMediaLinkForm && selectedPlatform && (
        <div className="popup-style-two" ref={modalRef}>
          <SocialMediaLinkForm onConfirm={handleAddSocialMediaLink} platform={selectedPlatform} />
        </div>
      )}
    </>
  )
}

const SocialMediaLinkForm: FC<{
  onConfirm: (platform: string, url: string) => void
  platform: string
}> = ({ onConfirm, platform }) => {
  const { register, handleSubmit, reset } = useForm<{ url: string }>()

  const onSubmit = (data: { url: string }) => {
    onConfirm(platform, data.url)
    reset()
  }

  return (
    <div className="modal-content-wrapper" style={{ width: '80%', margin: 'auto', zIndex: 1000 }}>
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input
              {...register('url')}
              placeholder={`${platform} Link`}
              className={inputClassName}
            />
            <Button type="submit">Add Link</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
