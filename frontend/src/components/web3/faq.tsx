'use client'

import React, { FC, useState, useRef, useEffect } from 'react'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

import { useProjectData } from '../../app/projectdatacontext'

type FAQ = {
  id?: string
  question: string
  answer: string
}

type FaqFormData = {
  faqs: FAQ[]
}

export const Faq: FC = () => {
  const methods = useForm<FaqFormData>({
    defaultValues: {
      faqs: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'faqs',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleAddFaq = (faq: FAQ) => {
    if (editingFaq) {
      const { index } = editingFaq
      // Update the existing FAQ
      methods.setValue(`faqs.${index}`, faq)
      setEditingFaq(null) // Clear the editing state
    } else {
      // Add a new FAQ
      append(faq)
    }
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const { projectData, setProjectData } = useProjectData()
  const onSubmit = (data: FaqFormData) => {
    console.log(data)
    setProjectData({ ...projectData, ...data })
  }
  const [editingFaq, setEditingFaq] = useState<{ faq: FAQ; index: number } | null>(null)

  const openEditModal = (faq: FAQ, index: number) => {
    setEditingFaq({ faq, index })
    setIsModalOpen(true)
    // Set the values for the individual FAQ
    methods.setValue(`faqs.${index}.question`, faq.question)
    methods.setValue(`faqs.${index}.answer`, faq.answer)
  }

  const closeAndResetModal = () => {
    setIsModalOpen(false)
    setEditingFaq(null)
    methods.reset()
  }

  return (
    <>
      <FormProvider {...methods}>
        <Card className="card-component">
          <CardContent className="pb-3 pt-6">
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <Button type="button" onClick={openModal}>
                Add New FAQ
              </Button>
              {fields.map((field, index) => (
                <div key={field.id} className={cn('flex w-full items-center justify-between')}>
                  <div onClick={() => openEditModal(field, index)}>Q: {field.question}</div>

                  <Button
                    type="button"
                    style={{ background: '#008195', color: 'white' }}
                    className="text-destructive-400 px-3"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button>
                <input type="submit" value="Submit" className={cn('submit-button-style')} />
              </Button>
            </form>
          </CardContent>
        </Card>
      </FormProvider>

      {isModalOpen && (
        <div className="popup-style" ref={modalRef}>
          <FaqFormModal onConfirm={handleAddFaq} editData={editingFaq?.faq} />
        </div>
      )}
    </>
  )
}

export default Faq

const inputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const textareaClassName = `${inputClassName} h-20`
const FaqFormModal: FC<{ onConfirm: (faq: FAQ) => void; editData?: FAQ }> = ({
  onConfirm,
  editData,
}) => {
  const { register, handleSubmit, reset } = useForm<FAQ>()

  useEffect(() => {
    if (editData) {
      reset(editData)
    }
  }, [editData, reset])

  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const onSubmit = (data: FAQ) => {
    onConfirm(data)
    reset()
  }

  return (
    <div className="modal-content-wrapper">
      <Card className="card-component">
        <CardContent className="pb-3 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <input
              {...register('question')}
              type="text"
              placeholder="Reward Tier Title"
              className={inputClassName}
            />
            <textarea {...register('answer')} placeholder="Answer" className={textareaClassName} />
            <Button type="submit">Confirm</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
