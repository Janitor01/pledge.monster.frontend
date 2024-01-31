'use client'

import { FC, useEffect, useRef } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type StoryFormData = {
  story: string
  risks_and_challenges: string
}

export const Story: FC = ({ storyContent, setStoryContent, validateNextPageEnabled, swiper }) => {
  useEffect(() => {
    validateNextPageEnabled()
  }, [storyContent])

  const methods = useForm<StoryFormData>()
  const { projectData, setProjectData } = useProjectData()
  const storyRef = useRef<HTMLTextAreaElement>(null)
  const risksRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = (ref: any) => {
    if (ref.current) {
      ref.current.style.height = 'inherit'
      const maxHeight = parseInt(window.getComputedStyle(ref.current).maxHeight, 10)
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, maxHeight)}px`
    }
  }

  const onSubmit = () => {
    if (storyContent.allSet) {
      swiper.slideNext()
    }
  }

  const inputClassName =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  const textareaClassName = `${inputClassName} max-height-textarea resize-none`

  return (
    <FormProvider {...methods}>
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit()
            }}
            className="flex flex-col gap-2"
          >
            <div className={cn('w-full space-y-2')}>
              <label htmlFor="story" className="text-base">
                Story
              </label>
              <textarea
                {...methods.register('story')}
                id="story"
                className={textareaClassName}
                ref={storyRef}
                onChange={(event) => {
                  adjustTextareaHeight(storyRef)
                  setStoryContent({
                    ...storyContent,
                    allSet: !!event.target.value && !!storyContent.risks,
                    story: event.target.value,
                  })
                }}
              />
            </div>
            <div className={cn('w-full space-y-2')}>
              <label htmlFor="risks_and_challenges" className="text-base">
                Risks and Challenges
              </label>
              <textarea
                {...methods.register('risks_and_challenges')}
                id="risks_and_challenges"
                className={textareaClassName}
                ref={risksRef}
                onChange={(event) => {
                  adjustTextareaHeight(risksRef)
                  setStoryContent({
                    ...storyContent,
                    allSet: !!event.target.value && !!storyContent.story,
                    risks: event.target.value,
                  })
                }}
              />
            </div>
            <Button>
              <input type="submit" value="Submit" className={cn('submit-button-style')} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  )
}

export default Story
