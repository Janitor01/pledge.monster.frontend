'use client'

import { FC, useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import categories from 'src/config/categories.json'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type CategoryFormData = {
  category: string
  subcategory: string
}

export const Category: FC = ({
  categoryContent,
  setCategoryContent,
  validateNextPageEnabled,
  swiper,
}) => {
  const methods = useForm<CategoryFormData>({
    defaultValues: { category: '', subcategory: '' }, // Set default values for category and subcategory
  })

  useEffect(() => {
    validateNextPageEnabled()
  }, [categoryContent])
  const { projectData, setProjectData } = useProjectData()
  const [selectedCategory, setSelectedCategory] = useState('')

  const onSubmit = (data: CategoryFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
    if (categoryContent.allSet) {
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
            <div>
              <label htmlFor="category" className="text-base">
                Category
              </label>
              <select
                {...methods.register('category')}
                id="category"
                className={inputClassName}
                onChange={(event) => {
                  setCategoryContent({
                    ...categoryContent,
                    category: event.target.value,
                    allSet: !!event.target.value && !!categoryContent.subCategory,
                  })
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subcategory" className="text-base">
                Subcategory
              </label>
              <select
                {...methods.register('subcategory')}
                id="subcategory"
                className={inputClassName}
                onChange={(event) => {
                  console.log(event)
                  setCategoryContent({
                    ...categoryContent,
                    subCategory: event.target.value,
                    allSet: !!event.target.value && !!categoryContent.category,
                  })
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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

export default Category
