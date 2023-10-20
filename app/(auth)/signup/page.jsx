"use client"
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// components
import SignUpForm from './SignUpForm'

export default function Signup() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [candidat, setCandidat] = useState(false)

  useEffect(() => {
      setCandidat(true);
    }, [candidat]);

  const handleSubmit = async (e, email, password, type) => {
    e.preventDefault()
    setError('')

    let candidat = false
    if(type == "candidat"){
      candidat = true
    }

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          Employer : candidat,
        },
      },
    })
    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.push('/verify')
    } 
  }

  return (
    <main className='h-2/3'>

      <SignUpForm handleSubmit={handleSubmit} />

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}