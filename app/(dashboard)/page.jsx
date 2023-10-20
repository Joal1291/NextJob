import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import ProfilButton from "../components/ProfilButton"

export default async function Home() {

  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()

  let userStatus = data.session && data.session.user ? true : false

  return (
    <>
    {!userStatus && (
      <main className="homepage">
      <div className="bg1"></div>
      <div className="bg2"></div>
      <div className="bg3"></div>
      
      <p className="presentation">
      NEXT JOB, Trouvez votre emploi de rêve ou le candidat idéal en un clin d'œil. Notre plateforme simplifie le recrutement pour les entreprises et offre aux chercheurs d'emploi une multitude d'opportunités. Rejoignez-nous dès aujourd'hui pour un avenir professionnel plus brillant que jamais. <br/> The Next One... Is The One.
      </p>
    </main>
    )}
    {userStatus && (
      <main className="homepage">
      <div className="bg1"></div>
      <div className="bg2"></div>
      <div className="bg3"></div>
      <p className="presentation">
        <span className="homebutton"><Link href={"/job"}>Trouvons votre prochaine emploi</Link></span>
        <span className="homebutton"> <ProfilButton /> </span>
      </p>
    </main>
    )} 
    </> 
  )
}