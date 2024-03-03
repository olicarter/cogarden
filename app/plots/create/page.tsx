import Nav from '@/components/Nav'
import Button from '@/components/Button'
import ImageUploadFormField from './ImageUploadFormField'
import { redirect } from 'next/navigation'
import cn from '@/utils/cn'
import TextInput from '@/components/TextInput'
import Map from './Map'
import IconButton from '@/components/IconButton'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import * as RadioGroup from '@/components/RadioGroup'
import FormField from '@/components/FormField'
import { createClient } from '@/utils/supabase/server'

type SearchParams = {
  address?: string
  area?: string
  step: string
  latitude?: string
  longitude?: string
  water?: string
  storage?: string
  price?: string
}

const steps = [
  // {
  //   name: 'photos',
  //   description: 'Listings with 3 or more photos are rented 80% faster',
  // },
  {
    name: 'location',
    description:
      'Enter the address and drag the pin to the most accurate location of the plot',
  },
  { name: 'plot', description: 'Enter details about the plot' },
  {
    name: 'payment',
    description: 'Choose how much and how often you would like to be paid',
  },
]

export default function Page(props: { searchParams: SearchParams }) {
  const goToNextStep = async (formData: FormData) => {
    'use server'
    const nextStepName = formData.get('next-step-name') as string
    const rawStepData = {
      address: formData.get('address'),
      latitude: formData.get('latitude'),
      longitude: formData.get('longitude'),
      area: formData.get('area'),
      water: formData.get('water'),
      storage: formData.get('storage'),
      price: formData.get('price'),
    }
    const search = formData.get('search') as string
    const searchParams = new URLSearchParams(search)

    Object.entries(rawStepData).forEach(([name, value]) => {
      if (typeof value === 'string') searchParams.set(name, value)
    })

    searchParams.set('step', nextStepName)
    redirect(`/plots/create?${searchParams.toString()}`)
  }

  const goToPrevStep = async (formData: FormData) => {
    'use server'
    const prevStepName = formData.get('prev-step-name') as string
    const search = formData.get('search') as string
    const searchParams = new URLSearchParams(search)
    searchParams.set('step', prevStepName)
    redirect(`/plots/create?${searchParams.toString()}`)
  }

  const createPlot = async (formData: FormData) => {
    'use server'
    const search = formData.get('search') as string
    const searchParams = new URLSearchParams(search)
    const supabase = createClient()
    const address = searchParams.get('address') as string
    const longitude = searchParams.get('longitude') as string
    const latitude = searchParams.get('latitude') as string
    const area = parseFloat(searchParams.get('area') as string)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.error('User not found')
      return
    }

    const { data: insertAddressData, error: insertAddressError } =
      await supabase
        .from('addresses')
        .insert({
          street_name: address,
          location: `POINT(${longitude} ${latitude})`,
        })
        .select()
        .single()

    if (insertAddressError) {
      console.error(insertAddressError)
      return
    }

    const { error } = await supabase.from('plots').insert({
      address: insertAddressData.id,
      area,
      host: user.id,
    })

    if (error) {
      console.error(error)
      return
    }

    redirect('/')
  }

  if (!props.searchParams.step) {
    const search = new URLSearchParams()
    search.set('step', steps[0].name)
    redirect(`/plots/create?${search.toString()}`)
  }

  const search = new URLSearchParams(props.searchParams)
  const currentStepName = search.get('step') || steps[0].name
  const currentStep = steps.find(step => step.name === currentStepName)
  const currentIndex = steps.findIndex(step => step.name === currentStepName)
  const prevStepName = steps[currentIndex - 1]?.name
  const nextStepName = steps[currentIndex + 1]?.name
  const isLastStep = currentIndex === steps.length - 1

  return (
    <div className="flex flex-col gap-2 grow">
      <div className="p-2 pb-0">
        <Nav />
      </div>
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
      <form className="flex flex-col gap-4 grow justify-between p-4">
        <input type="hidden" name="search" value={search.toString()} />
        {currentStepName === 'photos' && <ImageUploadFormField />}
        {currentStepName === 'location' && (
          <LocationStep searchParams={props.searchParams} />
        )}
        {currentStepName === 'plot' && (
          <PlotStep searchParams={props.searchParams} />
        )}
        {currentStepName === 'payment' && (
          <PaymentStep searchParams={props.searchParams} />
        )}
        <div className="flex gap-4 justify-end">
          <input name="next-step-name" type="hidden" value={nextStepName} />
          <input name="prev-step-name" type="hidden" value={prevStepName} />
          <Button
            className={cn(
              'duration-300 grow transition-[flex-basis]',
              currentIndex === 0 ? 'basis-full' : 'basis-[calc(100%-64px)]',
            )}
            color="amber-100"
            formAction={isLastStep ? createPlot : goToNextStep}
          >
            Continue
          </Button>
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
    </div>
  )
}

function LocationStep({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="gap-4 grid grid-rows-2 grow">
      <Map />
      <FormField
        label="Address"
        description="Enter the most accurate address for the plot, then drag the pin on the map to the precise location"
      >
        <TextInput
          className="peer"
          defaultValue={searchParams.address}
          name="address"
          required
        />
      </FormField>
    </div>
  )
}

function PlotStep({ searchParams }: { searchParams: SearchParams }) {
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
          defaultValue={searchParams.area}
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
        <RadioGroup.Root
          defaultValue={searchParams.water}
          name="water"
          required
        >
          <RadioGroup.Item value="true">Yes</RadioGroup.Item>
          <RadioGroup.Item value="false">No</RadioGroup.Item>
        </RadioGroup.Root>
      </FormField>
      <FormField
        label="Is there storage?"
        description="Plots with storage are rented 60% faster"
      >
        <RadioGroup.Root
          defaultValue={searchParams.storage}
          name="storage"
          required
        >
          <RadioGroup.Item value="true">Yes</RadioGroup.Item>
          <RadioGroup.Item value="false">No</RadioGroup.Item>
        </RadioGroup.Root>
      </FormField>
    </div>
  )
}

function PaymentStep({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        label="How much do you want to charge?"
        description="The average price per m2 in your area is 8.12 EUR /month"
        className="grid-cols-2"
      >
        <TextInput
          className="peer"
          defaultValue={searchParams.price}
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
