import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { RedirectType, redirect } from 'next/navigation'
import { Plant } from '@phosphor-icons/react/dist/ssr'
import Button from '@/components/Button'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/', RedirectType.replace)
  }

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="bg-green-950 flex flex-col gap-8 items-center justify-center min-h-screen p-8 text-green-50">
      <header className="flex flex-col items-center">
        <Plant size={80} />
        <h1 className="font-semibold text-3xl">cogarden</h1>
      </header>
      <form action={signIn} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <label className="leading-normal text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="bg-green-800 border-none h-12 placeholder:text-green-950 px-4 focus:ring-2 focus:ring-green-100 rounded-lg"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="leading-normal text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="bg-green-800 border-none h-12 placeholder:text-green-950 px-4 focus:ring-2 focus:ring-green-100 rounded-lg"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button color="green-300">Sign in</Button>
          <Button color="green-300" formAction={signUp}>
            Sign up
          </Button>
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
