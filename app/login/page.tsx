import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AppleLogo, Envelope, Plant } from '@phosphor-icons/react/dist/ssr'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
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
    <div className="bg-green-950 flex flex-col gap-8 items-center justify-center min-h-screen p-8">
      <header className="flex flex-col items-center">
        <Plant size={80} />
        <h1 className="font-semibold text-3xl">cogarden</h1>
      </header>
      <ul className="flex flex-col gap-4 w-full">
        <li>
          <button className="bg-black flex focus:outline-none focus:ring-2 focus:ring-green-100 font-medium gap-3 h-12 items-center justify-center px-4 rounded-full text-white w-full">
            <AppleLogo size={24} />
            Continue with Apple
          </button>
        </li>
        <li>
          <button className="bg-green-300 flex focus:outline-none focus:ring-2 focus:ring-green-100 font-medium gap-3 h-12 items-center justify-center px-4 rounded-full text-green-950 w-full">
            <Envelope size={24} />
            Continue with email
          </button>
        </li>
      </ul>
      <form action={signIn} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <label className="leading-normal text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="bg-green-900 border-none h-12 placeholder:text-green-950 px-4 focus:ring-2 focus:ring-green-100 rounded-lg"
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
            className="bg-green-900 border-none h-12 placeholder:text-green-950 px-4 focus:ring-2 focus:ring-green-100 rounded-lg"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            formAction={signUp}
            className="bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium h-12 rounded-full text-green-50"
          >
            Sign up
          </button>
          <button className="bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium h-12 rounded-full text-green-50">
            Sign in
          </button>
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
