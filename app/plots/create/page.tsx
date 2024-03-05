import Nav from '@/components/Nav'
import { RedirectType, redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import MultiStepForm from './MultiStepForm'

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
    description: 'Drag the marker to the location of the plot',
  },
  { name: 'plot', description: 'Enter details about the plot' },
  {
    name: 'payment',
    description: 'Choose how much and how often you would like to be paid',
  },
  {
    name: 'review',
    description: 'Review the details of your listing before publishing it',
  },
]

export default async function Page(props: { searchParams: SearchParams }) {
  if (!props.searchParams.step) {
    const search = new URLSearchParams()
    search.set('step', steps[0].name)
    redirect(`/plots/create?${search.toString()}`, RedirectType.replace)
  }

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login', RedirectType.replace)
  }

  return (
    <div className="flex flex-col gap-2 grow">
      <div className="p-2 pb-0">
        <Nav />
      </div>
      <MultiStepForm steps={steps} user={user} />
    </div>
  )
}
