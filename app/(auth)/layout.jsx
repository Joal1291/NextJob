
import Link from "next/link"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import NavBar from "../components/NavBar"
import { divide } from "lodash"

export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies })

  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
