import ModifyProfile from "./ModifyProfile"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function page({params}) {
  const id = params.id

  const supabase = createServerComponentClient({cookies})
  const {data: profileData} = await supabase.from('Profile').select().eq('Id', id)
  console.log(profileData)

//   const {data: admin} = await supabase.getSession()
//   console.log('--------------', admin.session.user.Id)

  return (
    <main>
        <ModifyProfile profile={profileData[0]}/>
    </main>
  )
}
