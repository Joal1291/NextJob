import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import NavBar from "../components/NavBar"

const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }) {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()
  

  let userStatus = data.session && data.session.user  ? true : false

  return (
    <>
      <NavBar user={userStatus}/>
      {children}
    </>
  )
}