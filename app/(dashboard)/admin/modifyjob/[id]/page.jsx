import ModifyJob from "./ModifyJob"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function page({params}) {
  const id = params.id

  const supabase = createServerComponentClient({cookies})
  const {data: jobData} = await supabase.from('Job').select().eq('Id', id)

  return (
    <main>
        <ModifyJob user={jobData[0]}/>
    </main>
  )
}
