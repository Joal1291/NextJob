import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"

import Admin from "./admin"

export default async function AdminPage() {

  const supabase = createServerComponentClient({cookies})
  const {data: jobData} = await supabase.from('Job').select()
  const {data: applicationData} = await supabase.from('Application').select()
  const {data: profileData} = await supabase.from('Profile').select()
  const {data: user} = await supabase.auth.getSession()
  
  const userIsAdmin = await supabase.from('Profile').select().eq('Id', user.session.user.id)

  if(!userIsAdmin.data[0].IsAdmin){
    redirect('/')
  }

  console.log('user is admin', userIsAdmin.data[0].IsAdmin)
  return (
    <main>
      <Admin jobData={jobData} applicationData={applicationData} profileData={profileData} user={user.session.user}/>
    </main>
  )
}
