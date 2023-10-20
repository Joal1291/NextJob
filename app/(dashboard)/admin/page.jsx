import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import Admin from "./admin"

export default async function AdminPage() {

  const supabase = createServerComponentClient({cookies})
  const {data: jobData} = await supabase.from('Job').select()
  const {data: applicationData} = await supabase.from('Application').select()
  const {data: profileData, error} = await supabase.from('Profile').select()
  
  

  return (
    <main>
      <Admin jobData={jobData} applicationData={applicationData} profileData={profileData}/>
    </main>
  )
}
