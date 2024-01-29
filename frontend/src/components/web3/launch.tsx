'use client'

import { FC, useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type LaunchFormData = {
  launch_date_time: string
  end_date_time: string
}

export const Launch: FC = ({
  launchTimeContent,
  setLaunchTimeContent,
  validateNextPageEnabled,
  swiper,
}) => {
  useEffect(() => {
    validateNextPageEnabled()
  }, [launchTimeContent])
  const methods = useForm<LaunchFormData>({
    defaultValues: {
      launch_date_time: '',
      end_date_time: '',
    },
  })
  const { projectData, setProjectData } = useProjectData()
  const [durationMessage, setDurationMessage] = useState('')

  // Get today's date in the correct format for the input
  const today = new Date().toISOString().slice(0, 16)

  // Watch for changes in launch_date_time to update minEndDate
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'launch_date_time' && value.launch_date_time) {
        // Set minimum end date to the selected launch date
        methods.setValue('end_date_time', value.launch_date_time)
      }
    })
    return () => subscription.unsubscribe()
  }, [methods.watch])

  // Calculate duration
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (value.launch_date_time && value.end_date_time) {
        const launchDate = new Date(value.launch_date_time)
        const endDate = new Date(value.end_date_time)
        const diffTime = Math.abs(endDate.getTime() - launchDate.getTime())
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24)
        setDurationMessage(`${diffDays} days and ${diffHours} hours`)
      }
    })
    return () => subscription.unsubscribe()
  }, [methods.watch])

  const onSubmit = (data: LaunchFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
    if (launchTimeContent.allSet) {
      swiper.slideNext()
    }
  }

  const inputClassName =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <FormProvider {...methods}>
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div className={cn('w-full space-y-2')}>
              <label htmlFor="launch_date_time" className="text-base">
                Launch Date and Time
              </label>
              <input
                {...methods.register('launch_date_time')}
                type="datetime-local"
                id="launch_date_time"
                className={inputClassName}
                min={today}
                onChange={(event) => {
                  setLaunchTimeContent({
                    ...launchTimeContent,
                    launchDate: event.target.value,
                    allSet: !!event.target.value && !!launchTimeContent.endDate,
                  })
                }}
              />
            </div>
            <div className={cn('w-full space-y-2')}>
              <label htmlFor="end_date_time" className="text-base">
                End Date and Time
              </label>
              <input
                {...methods.register('end_date_time')}
                type="datetime-local"
                id="end_date_time"
                className={inputClassName}
                min={methods.getValues('launch_date_time') || today}
                onChange={(event) => {
                  setLaunchTimeContent({
                    ...launchTimeContent,
                    endDate: event.target.value,
                    allSet: !!event.target.value && !!launchTimeContent.launchDate,
                  })
                }}
              />
            </div>
            <div className="text-center">
              {durationMessage && <p>Campaign Duration: {durationMessage}</p>}
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

export default Launch
;``
