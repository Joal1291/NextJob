"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// components
import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "./LoginForm"

export default function Login() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e, email, password) => {
    e.preventDefault()
    setError('')


    const supabase = createClientComponentClient()   

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if(error){
      setError(error.message)
    }
    if(!error){
      router.push('/')
      router.refresh()
    }
  }
[]
  return (
    <main className="h-2/3">

      <LoginForm handleSubmit={handleSubmit} />

      {error && <div className="error">{error}</div>}
    </main>
  )
}