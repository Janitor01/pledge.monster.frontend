'use client'

import { FC, useEffect, useState } from 'react'

import countries from 'i18n-iso-countries'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type LocationFormData = {
  location: string
}

export const Location: FC = ({ countryContent, setCountryContent, validateNextPageEnabled }) => {
  useEffect(() => {
    validateNextPageEnabled()
  }, [countryContent])
  const methods = useForm<LocationFormData>({
    defaultValues: { location: '' },
  })
  const { projectData, setProjectData } = useProjectData()
  const [countryList, setCountryList] = useState<{ code: string; name: string }[]>([])

  useEffect(() => {
    import('i18n-iso-countries/langs/en.json').then((lang) => {
      countries.registerLocale(lang)
      setCountryList(
        Object.entries(countries.getNames('en', { select: 'official' })).map(([code, name]) => ({
          code,
          name,
        })),
      )
    })
  }, [])

  const onSubmit = (data: LocationFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
  }

  const inputClassName =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <FormProvider {...methods}>
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div>
              <label htmlFor="country" className="text-base">
                Country
              </label>
              {countryList.length > 0 && (
                <select
                  {...methods.register('location')}
                  id="country"
                  className={inputClassName}
                  onChange={(event) => {
                    setCountryContent({
                      ...countryContent,
                      country: event.target.value,
                      allSet: !!event.target.value,
                    })
                  }}
                >
                  {countryList.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
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

export default Location
