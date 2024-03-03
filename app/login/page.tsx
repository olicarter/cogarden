import { createClient } from '@/utils/supabase/server'
import { RedirectType, redirect } from 'next/navigation'
import { Plant } from '@phosphor-icons/react/dist/ssr'
import FormField from '@/components/FormField'
import TextInput from '@/components/TextInput'
import SubmitButton from './SubmitButton'
import ResendOTPButton from './ResendOTPButton'

export default async function Login({
  searchParams,
}: {
  searchParams: { email: string; message: string; status: string }
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/', RedirectType.replace)

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) redirect('/login?message=Could not authenticate user')

    redirect('/')
  }

  return (
    <div className="bg-green-950 flex flex-col gap-8 items-center justify-center max-w-96 min-h-screen p-8 self-center text-green-50 w-full">
      <header className="flex flex-col items-center">
        <Plant size={80} />
        <h1 className="font-semibold text-3xl">cogarden</h1>
      </header>
      <form action={signIn} className="flex flex-col gap-4 w-full">
        {searchParams.status === 'otp-sent' ? (
          <>
            <input name="email" type="hidden" value={searchParams.email} />
            <p className="text-center text-sm">
              Follow the link sent to <strong>{searchParams.email}</strong> to
              finish signing in
            </p>
            <ResendOTPButton />
          </>
        ) : (
          <>
            <FormField label="Email" description={searchParams.message}>
              <TextInput
                className="peer"
                name="email"
                placeholder="you@example.com"
                required
              />
            </FormField>
            <FormField label="Password" description={searchParams.message}>
              <TextInput
                className="peer"
                name="password"
                placeholder="••••••••"
                required
                type="password"
              />
            </FormField>
            <SubmitButton />
          </>
        )}
      </form>
    </div>
  )
}
