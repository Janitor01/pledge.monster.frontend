'use client'

import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

import eye from 'public/icons/eye.svg'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type MediaFormData = {
  image_url: string
  video_url: string
}

export const Media: FC<{ theme: string }> = ({
  theme,
  mediaContent,
  setMediaContent,
  validateNextPageEnabled,
  swiper,
}) => {
  const methods = useForm<MediaFormData>()
  const { projectData, setProjectData } = useProjectData()
  const [isHovering, setIsHovering] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    validateNextPageEnabled()
  }, [mediaContent])

  useEffect(() => {
    setProjectData({
      ...projectData,
      image_url: methods.watch('image_url'),
      video_url: methods.watch('video_url'),
    })
  }, [methods.watch('image_url'), methods.watch('video_url'), projectData, setProjectData])

  const previewMedia = (type: 'image' | 'video') => {
    const url = type === 'image' ? methods.getValues('image_url') : methods.getValues('video_url')
    if (url) {
      let content
      if (type === 'image') {
        content = <img src={url} alt="Image Preview" className="h-auto w-full" />
      } else {
        const embedUrl = url.replace('watch?v=', 'embed/')
        content = (
          <iframe
            key={url}
            width="560"
            height="315"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Preview"
          ></iframe>
        )
      }
      setModalContent(content)
      setIsHovering(true)
    }
  }
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (modalRef.current && !modalRef.current.contains(target)) {
      setIsHovering(false)
      setModalContent(null)
    }
  }

  useEffect(() => {
    if (isHovering) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isHovering])

  const inputClassName =
    'flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <>
      <FormProvider {...methods}>
        <Card className="card-component">
          <CardContent className="pb-3 pt-6">
            <form
              onSubmit={(event) => {
                // methods.handleSubmit((data) => console.log(data))
                event.preventDefault()
                if (mediaContent.allSet) {
                  swiper.slideNext()
                }
              }}
              className="flex flex-col gap-2"
            >
              <div className={cn('w-full space-y-2')}>
                <label htmlFor="image_url" className="text-base">
                  Image URL
                </label>
                <div className="flex items-center">
                  <input
                    {...methods.register('image_url')}
                    type="text"
                    id="image_url"
                    className={inputClassName}
                    value={mediaContent.imageUrl}
                    onChange={(event) => {
                      setMediaContent({
                        ...mediaContent,
                        imageUrl: event.target.value,
                        allSet: !!event.target.value && !!mediaContent.videoUrl,
                      })
                    }}
                  />
                  <button
                    type="button"
                    className="bg-primary-500 rounded-md px-3 text-white"
                    onClick={() => previewMedia('image')}
                  >
                    <Image
                      src={eye}
                      alt="Preview"
                      width={20}
                      height={20}
                      className={theme === 'light' ? 'invert-image' : ''}
                    />
                  </button>
                </div>
              </div>
              <div className={cn('w-full space-y-2')}>
                <label htmlFor="video_url" className="text-base">
                  Video URL
                </label>
                <div className="flex items-center">
                  <input
                    {...methods.register('video_url')}
                    type="text"
                    id="video_url"
                    className={inputClassName}
                    value={mediaContent.videoUrl}
                    onChange={(event) => {
                      setMediaContent({
                        ...mediaContent,
                        videoUrl: event.target.value,
                        allSet: !!event.target.value && !!mediaContent.imageUrl,
                      })
                    }}
                  />
                  <button
                    type="button"
                    className="bg-primary-500 rounded-md px-3 text-white"
                    onClick={() => previewMedia('video')}
                  >
                    <Image
                      src={eye}
                      alt="Preview"
                      width={20}
                      height={20}
                      className={theme === 'light' ? 'invert-image' : ''}
                    />
                  </button>
                </div>
              </div>
              <Button className="mt-2">
                <input
                  onClick={() => {
                    if (mediaContent.allSet) {
                      swiper.slideNext()
                    }
                  }}
                  type="submit"
                  value="Submit"
                  className={cn('submit-button-style')}
                />
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
      {isHovering && (
        <div className="popup-style" ref={modalRef}>
          {modalContent}
        </div>
      )}
    </>
  )
}

export default Media
