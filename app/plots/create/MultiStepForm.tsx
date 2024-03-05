'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import cn from '@/utils/cn'
import TextInput from '@/components/TextInput'
import Map from './Map'
import IconButton from '@/components/IconButton'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import * as RadioGroup from '@/components/RadioGroup'
import FormField from '@/components/FormField'
import Button from '@/components/Button'
import ImageUploadFormField from './ImageUploadFormField'
import { useFormStatus } from 'react-dom'
import { ComponentPropsWithoutRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

type Step = {
  name: string
  description: string
}

export default function MultiStepForm({
  steps,
  user,
}: {
  steps: Step[]
  user: User
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  const currentStepName = searchParams.get('step') || steps[0].name
  const currentStep = steps.find(step => step.name === currentStepName)
  const currentIndex = steps.findIndex(step => step.name === currentStepName)
  const prevStepName = steps[currentIndex - 1]?.name
  const nextStepName = steps[currentIndex + 1]?.name
  const isLastStep = currentIndex === steps.length - 1

  const goToNextStep = (formData: FormData) => {
    const rawStepData = {
      address: formData.get('address'),
      latitude: formData.get('latitude'),
      longitude: formData.get('longitude'),
      area: formData.get('area'),
      water: formData.get('water'),
      storage: formData.get('storage'),
      price: formData.get('price'),
    }

    Object.entries(rawStepData).forEach(([name, value]) => {
      if (typeof value === 'string') urlSearchParams.set(name, value)
    })

    urlSearchParams.set('step', nextStepName)
    router.push(`/plots/create?${urlSearchParams.toString()}`)
  }

  const goToPrevStep = () => {
    urlSearchParams.set('step', prevStepName)
    router.push(`/plots/create?${urlSearchParams.toString()}`)
  }

  const createPlot = () => {
    const supabase = createClient()
    const address = searchParams.get('address') as string
    const longitude = searchParams.get('longitude') as string
    const latitude = searchParams.get('latitude') as string
    const area = parseFloat(searchParams.get('area') as string)
    const water = searchParams.get('water') === 'true'
    const storage = searchParams.get('storage') === 'true'
    const price = parseFloat(searchParams.get('price') as string)

    supabase
      .from('addresses')
      .insert({
        street_name: address,
        location: `POINT(${longitude} ${latitude})`,
      })
      .select()
      .single()
      .then(({ data: insertAddressData, error: insertAddressError }) => {
        if (insertAddressError) {
          console.error(insertAddressError)
          return
        }

        supabase
          .from('plots')
          .insert({
            address: insertAddressData.id,
            area,
            has_water: water,
            has_storage: storage,
            host: user.id,
            price_per_month: price,
          })
          .then(({ error }) => {
            if (error) {
              console.error(error)
              return
            }

            router.push('/')
          })
      })
  }

  return (
    <>
      <div className="flex font-semibold gap-4 px-4 text-xl">
        {steps.map((step, index) => (
          <span
            className={cn(
              'capitalize',
              index > currentIndex && 'opacity-50',
              index < currentIndex && 'hidden',
            )}
            key={step.name}
          >
            {step.name}
          </span>
        ))}
      </div>
      <p className="opacity-50 px-4 text-sm">{currentStep?.description}</p>
      <form
        action={isLastStep ? createPlot : goToNextStep}
        className="flex flex-col gap-4 grow justify-between p-4"
      >
        <input type="hidden" name="search" value={searchParams.toString()} />
        {currentStepName === 'photos' && <ImageUploadFormField />}
        {currentStepName === 'location' && <LocationStep />}
        {currentStepName === 'plot' && <PlotStep />}
        {currentStepName === 'payment' && <PaymentStep />}
        {currentStepName === 'review' && <ReviewStep />}
        <div className="flex gap-4 justify-end">
          <SubmitButton
            className={
              currentIndex === 0 ? 'basis-full' : 'basis-[calc(100%-64px)]'
            }
            color="amber-100"
          />
          <IconButton
            className="-order-1"
            color="green-900"
            formAction={goToPrevStep}
            formNoValidate
            icon={ArrowLeft}
            tabIndex={currentIndex === 0 ? -1 : undefined}
          />
        </div>
      </form>
    </>
  )
}

function LocationStep() {
  const searchParams = useSearchParams()
  const address = searchParams.get('address') as string

  return (
    <div className="gap-4 grid grid-rows-2 grow">
      <Map />
      <FormField
        label="Address"
        description="Enter the most accurate address for the plot, then drag the pin on the map to the precise location"
      >
        <TextInput
          className="peer"
          defaultValue={address}
          name="address"
          required
        />
      </FormField>
    </div>
  )
}

function PlotStep() {
  const searchParams = useSearchParams()
  const area = searchParams.get('area') as string
  const water = searchParams.get('water') as string
  const storage = searchParams.get('storage') as string

  return (
    <div className="flex flex-col gap-4">
      <FormField
        label="Plot area"
        description="Multiply the length by the width to get the area"
        className="grid-cols-2"
      >
        <TextInput
          autoComplete="off"
          className="peer"
          defaultValue={area}
          min={0.1}
          name="area"
          required
          step={0.1}
          type="number"
        />
        <div className="flex font-semibold items-center order-3">
          m<sup>2</sup>
        </div>
      </FormField>
      <FormField
        label="Is there a water source?"
        description="Plots with a water source are rented 180% faster"
      >
        <RadioGroup.Root defaultValue={water} name="water" required>
          <RadioGroup.Item value="true">Yes</RadioGroup.Item>
          <RadioGroup.Item value="false">No</RadioGroup.Item>
        </RadioGroup.Root>
      </FormField>
      <FormField
        label="Is there storage?"
        description="Plots with storage are rented 60% faster"
      >
        <RadioGroup.Root defaultValue={storage} name="storage" required>
          <RadioGroup.Item value="true">Yes</RadioGroup.Item>
          <RadioGroup.Item value="false">No</RadioGroup.Item>
        </RadioGroup.Root>
      </FormField>
    </div>
  )
}

function PaymentStep() {
  const searchParams = useSearchParams()
  const price = searchParams.get('price') as string

  return (
    <div className="flex flex-col gap-4">
      <FormField
        label="How much do you want to charge?"
        description="The average price per m2 in your area is 8.12 EUR /month"
        className="grid-cols-2"
      >
        <TextInput
          className="peer"
          defaultValue={price}
          min={0}
          name="price"
          required
          step={0.01}
          type="number"
        />
        <div className="flex font-semibold items-center">EUR /month</div>
      </FormField>
    </div>
  )
}

function ReviewStep() {
  const searchParams = useSearchParams()
  const address = searchParams.get('address') as string
  const area = searchParams.get('area') as string
  const water = searchParams.get('water') as string
  const storage = searchParams.get('storage') as string
  const price = searchParams.get('price') as string

  return (
    <div className="flex flex-col gap-4">
      <ul>
        <li>Address: {address}</li>
        <li>
          Area: {area} m<sup>2</sup>
        </li>
        <li>Water: {water}</li>
        <li>Storage: {storage}</li>
        <li>Price: {price} EUR /month</li>
      </ul>
    </div>
  )
}

function SubmitButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={cn('duration-300 grow transition-[flex-basis]', className)}
      loading={pending}
      {...props}
    >
      {pending ? 'Saving...' : 'Continue'}
    </Button>
  )
}
