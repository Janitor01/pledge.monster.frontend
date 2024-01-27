'use client'

import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { useProjectData } from '../../app/projectdatacontext'

type ProjectInfoFormData = {
  info: string
  project_image_url: string
  project_video_url: string
  social_media_links: string[]
}

const inputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const textareaClassName = `${inputClassName} h-40`

export const ProjectInfo: FC<{ theme: string }> = ({
  theme,
  projectInfoContent,
  setProjectInfoContent,
  validateNextPageEnabled,
}) => {
  useEffect(() => {
    validateNextPageEnabled()
  }, [projectInfoContent])
  const { projectData, setProjectData } = useProjectData()
  const methods = useForm<ProjectInfoFormData>()
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const onSubmit = (data: ProjectInfoFormData) => {
    console.log('Form data:', data)

    // No need to fetch social media links separately as they are part of 'data'
    const newProjectData = {
      ...projectData,
      project_info: {
        ...projectData.project_info,
        info: editingInfo,
        project_image_url: data.project_image_url,
        project_video_url: data.project_video_url,
        social_media_links: data.social_media_links,
      },
    }

    console.log('Updated Project Data to be sent:', newProjectData)
    setProjectData(newProjectData)
  }

  const modalRef = useRef<HTMLDivElement>(null)
  const projectName = projectData.title
  const socialMediaPlatforms = [
    { name: 'Twitter', iconPath: '/icons/twitter.svg' },
    { name: 'Telegram', iconPath: '/icons/telegram.svg' },
    { name: 'Discord', iconPath: '/icons/discord.svg' },
    { name: 'Github', iconPath: '/icons/github.svg' },
  ]

  const addSocialMediaLink = (url: string) => {
    const existingLinks = methods.getValues('social_media_links') || []
    methods.setValue('social_media_links', [...existingLinks, url])
  }

  const [showProjectInfoForm, setShowProjectInfoForm] = useState(false)

  const handleEditProjectInfo = (info: string) => {
    methods.setValue('info', info)
    setShowProjectInfoForm(false)
  }

  const [showSocialMediaForm, setShowSocialMediaForm] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('')

  const handleAddSocialMediaLink = (platform: string, url: string) => {
    // Fetch existing links and add the new one
    const existingLinks = methods.getValues('social_media_links') || []
    const updatedLinks = [...existingLinks, url]
    methods.setValue('social_media_links', updatedLinks) // Update the form state
    setProjectInfoContent({ ...projectInfoContent, [platform]: url, allSet: true })
    setShowSocialMediaForm(false)
  }

  const handleSocialMediaIconClick = (platform: string) => {
    setSelectedPlatform(platform)
    setShowSocialMediaForm(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (modalRef.current && !modalRef.current.contains(target)) {
      setShowProjectInfoForm(false)
      setShowSocialMediaForm(false)
    }
  }

  useEffect(() => {
    if (showProjectInfoForm || showSocialMediaForm) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProjectInfoForm, showSocialMediaForm])

  const [editingInfo, setEditingInfo] = useState<string>('')

  const handleEditProjectInfoClick = () => {
    // If there's no editingInfo, use the existing info from projectData
    setEditingInfo(editingInfo || projectData.project_info?.info || '')
    setShowProjectInfoForm(true)
  }

  const handleUpdateProjectInfo = (updatedInfo: string) => {
    console.log('Updated info:', updatedInfo)
    // Update the project data with the new info
    const newProjectData = {
      ...projectData,
      project_info: {
        ...projectData.project_info,
        info: updatedInfo, // Set the updatedInfo directly to the info field
      },
    }

    // Update the projectData state
    setProjectData(newProjectData)

    // Close the form modal
    setShowProjectInfoForm(false)

    // Log to check the updated projectData
    console.log('Updated projectData:', newProjectData)
  }

  return (
    <>
      <FormProvider {...methods}>
        <Card className="card-component">
          <CardContent className="pb-3 pt-6">
            <h2>{projectName}</h2> {/* NOT DISPLAYING THE NAME YET */}
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <Button type="button" onClick={() => setShowProjectInfoForm(true)}>
                Edit Project Information
              </Button>
              {isInfoModalOpen && (
                <textarea
                  {...methods.register('info')}
                  placeholder="Project Information"
                  className={inputClassName}
                  value={projectInfoContent.projectInfo}
                  onChange={(event) => {
                    setProjectInfoContent({
                      ...projectInfoContent,
                      projectInfo: event.target.value,
                      allSet: true,
                    })
                  }}
                />
              )}
              <input
                {...methods.register('project_image_url')}
                placeholder="Project Image URL"
                className={inputClassName}
                value={projectInfoContent.projectImageUrl}
                onChange={(event) => {
                  setProjectInfoContent({
                    ...projectInfoContent,
                    projectImageUrl: event.target.value,
                    allSet: true,
                  })
                }}
              />
              <input
                {...methods.register('project_video_url')}
                placeholder="Project Video URL"
                className={inputClassName}
                value={projectInfoContent.projectVideoUrl}
                onChange={(event) => {
                  setProjectInfoContent({
                    ...projectInfoContent,
                    projectVideoUrl: event.target.value,
                    allSet: true,
                  })
                }}
              />
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
              <Button type="submit">Save Project Info</Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>

      {showProjectInfoForm && (
        <div className="popup-style" ref={modalRef}>
          <ProjectInfoForm onConfirm={handleUpdateProjectInfo} existingInfo={editingInfo} />
        </div>
      )}

      {showSocialMediaForm && (
        <div className="popup-style" ref={modalRef}>
          <SocialMediaLinkForm onConfirm={handleAddSocialMediaLink} platform={selectedPlatform} />
        </div>
      )}
    </>
  )
}

export default ProjectInfo

const ProjectInfoForm: FC<{ onConfirm: (info: string) => void; existingInfo: string }> = ({
  onConfirm,
  existingInfo,
}) => {
  // Initialize the form here with existingInfo as the default value for 'info'
  const { register, handleSubmit, reset } = useForm<{ info: string }>({
    defaultValues: { info: existingInfo },
  })

  // Handle form submission
  const onSubmit = (data: { info: string }) => {
    // Call onConfirm with the submitted info
    onConfirm(data.info)
  }

  return (
    <div className="modal-content-wrapper">
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <textarea
              {...register('info')}
              placeholder="Project Information"
              className={textareaClassName}
            />
            <Button type="submit">Confirm</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

const SocialMediaLinkForm: FC<{
  onConfirm: (platform: string, url: string) => void
  platform: string
}> = ({ onConfirm, platform }) => {
  const { register, handleSubmit, reset } = useForm<{ url: string }>()

  const onSubmit = (data: { url: string }) => {
    onConfirm(platform, data.url)
  }

  return (
    <div className="modal-content-wrapper">
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
