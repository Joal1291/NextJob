import { cookies } from "next/headers"
import { notFound } from "next/navigation"
// import { useState } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import Profil from "@/app/components/Profil"

async function getProfil(id){
  const supabase = createServerComponentClient({cookies})

  const { data: Profile, error } = await supabase.from('Profile').select().eq('Id', id)

  if(error){
    notFound()
  }
  return Profile[0]
}
// const handleSubmit = async (e, Name, LastName, Tel) => {
//   e.preventDefault()
// }


export default async function profilcandidat({params}) {

  const user = await getProfil(params.id)
  
  const supabase = createServerComponentClient({cookies})
  const {data} = supabase.auth.getSession()

  return (
    <main>
     <div className="profilcontainer">
        <h2>Profil</h2>
          <Profil user={user}/>
     </div>
    </main>
  )
}
