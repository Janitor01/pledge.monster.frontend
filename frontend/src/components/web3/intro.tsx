'use client'

import { FC, useEffect } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type IntroFormData = {
  title: string
  elevator_pitch: string
  // ...other fields as needed
}

export const Intro: FC = ({
  titleContent,
  setTitleContent,
  validateNextPageEnabled,
  swiper,
  updateSwiper,
}) => {
  const methods = useForm<IntroFormData>()
  const { projectData, setProjectData } = useProjectData()
  updateSwiper()
  const onSubmit = (data: IntroFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
    if (titleContent.allSet) {
      swiper.slideNext()
    }
  }

  useEffect(() => {
    validateNextPageEnabled()
  }, [titleContent])

  // Adjusted input style for full width
  const inputClassName =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <FormProvider {...methods}>
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className={cn('w-full space-y-2')}>
              <label
                htmlFor="title"
                className={cn(methods.formState.errors.title && 'text-destructive', 'text-base')}
              >
                Project Title
              </label>
              <input
                {...methods.register('title')}
                type="text"
                id="title"
                className={inputClassName}
                value={titleContent.title}
                onChange={(event) => {
                  setTitleContent({
                    ...titleContent,
                    title: event.target.value,
                    allSet: !!event.target.value && !!titleContent.elevatorPitch,
                  })

                  validateNextPageEnabled()
                }}
              />
              {/* Error messages and descriptions as before */}
            </div>
            <div className={cn('space-y-2')}>
              <label
                htmlFor="elevator_pitch"
                className={cn(
                  methods.formState.errors.elevator_pitch && 'text-destructive',
                  'text-base',
                )}
              >
                Elevator Pitch
              </label>
              <input
                {...methods.register('elevator_pitch')}
                type="text"
                id="elevator_pitch"
                value={titleContent.elevatorPitch}
                className={inputClassName}
                onChange={(event) => {
                  const text = event.target.value
                  const allSet = !!titleContent.title && !!text
                  console.log(allSet)
                  setTitleContent({
                    ...titleContent,
                    elevatorPitch: event.target.value,
                    allSet,
                  })
                }}
              />
              {/* Error messages and descriptions as before */}
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

export default Intro
