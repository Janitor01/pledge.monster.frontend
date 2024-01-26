'use client'

import React, { FC, useState, useEffect, useRef } from 'react'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type RewardTier = {
  title: string
  amount: number
  description: string
}

type GoalsFormData = {
  funding_goal: number
  reward_tiers: RewardTier[]
}

export const Goals: FC = () => {
  const methods = useForm<GoalsFormData>({
    defaultValues: {
      funding_goal: 0,
      reward_tiers: [],
    },
  })
  const { projectData, setProjectData } = useProjectData()
  const { fields, append, remove, update } = useFieldArray({
    control: methods.control,
    name: 'reward_tiers',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const onSubmit = (data: GoalsFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
  }
  const [editingTierIndex, setEditingTierIndex] = useState<number | null>(null)

  const handleAddRewardTier = (tier: RewardTier) => {
    if (editingTierIndex !== null) {
      // It's an edit, update the specific tier in the field array
      update(editingTierIndex, tier)
      setEditingTierIndex(null) // Reset editing index
    } else {
      // It's a new addition
      append(tier)
    }
    setIsModalOpen(false)
  }

  const openModal = () => {
    setEditingTierIndex(null)
    setIsModalOpen(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  const editRewardTier = (index: number) => {
    setEditingTierIndex(index)
    const tier = fields[index]
    methods.setValue(`reward_tiers.${index}.title`, tier.title)
    methods.setValue(`reward_tiers.${index}.amount`, tier.amount)
    methods.setValue(`reward_tiers.${index}.description`, tier.description)
    setIsModalOpen(true)
  }

  const inputClassName =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <>
      <FormProvider {...methods}>
        <Card className="card-component">
          <CardContent className="pb-3 pt-6">
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <div className={cn('w-full space-y-2')}>
                <label htmlFor="funding_goal" className="text-base">
                  Funding Goal
                </label>
                <input
                  {...methods.register('funding_goal')}
                  type="number"
                  id="funding_goal"
                  className={inputClassName}
                />
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={cn('flex w-full items-center justify-between space-y-2')}
                  onClick={() => editRewardTier(index)}
                >
                  {field.title} - ${field.amount}
                  <Button
                    type="button"
                    style={{ background: '#008195', color: 'white' }}
                    className="text-destructive-400 px-3"
                    onClick={(e) => {
                      e.stopPropagation() // This stops the event from bubbling up
                      remove(index)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={openModal}>
                Add Reward Tier
              </Button>

              <Button>
                <input type="submit" value="Submit" className={cn('submit-button-style')} />
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>

      {isModalOpen && (
        <div className="popup-style" ref={modalRef}>
          <RewardTierForm
            onConfirm={handleAddRewardTier}
            initialData={editingTierIndex !== null ? fields[editingTierIndex] : undefined}
          />
        </div>
      )}
    </>
  )
}

export default Goals

const inputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const RewardTierForm: FC<{ onConfirm: (tier: RewardTier) => void; initialData?: RewardTier }> = ({
  onConfirm,
  initialData,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<RewardTier>()
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'inherit'
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [])

  const onSubmit = (data: RewardTier) => {
    onConfirm(data)
    reset()
    adjustTextareaHeight()
  }

  useEffect(() => {
    if (!initialData) {
      reset({ title: '', amount: 0, description: '' })
    } else {
      setValue('title', initialData.title)
      setValue('amount', initialData.amount)
      setValue('description', initialData.description)
    }
  }, [initialData, reset, setValue])

  return (
    <div className="modal-content-wrapper">
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input
              {...register('title')}
              type="text"
              placeholder="Reward Tier Title"
              className={inputClassName}
            />
            <input
              {...register('amount')}
              type="number"
              placeholder="Amount Required"
              className={inputClassName}
            />
            <textarea
              {...register('description')}
              placeholder="Description"
              className={inputClassName}
              ref={descriptionRef}
              onChange={adjustTextareaHeight}
            />
            <Button type="submit">Confirm</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
