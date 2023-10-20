import Link from "next/link"

import Logo from "../../public/image/noir.png"
import Image from "next/image"

import LogoutButton from "./LogoutButton"
import ProfilButton from "./ProfilButton"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function NavBar({user}) {
  const supabase = createServerComponentClient({cookies})
  const {data} = await supabase.auth.getSession()


  let userStatus = data.session && data.session.user ? true : false
  let isadmin = false
  if(user){
    const profil = await supabase.from('Profile').select().eq('Id', data.session.user.id).single()
    isadmin = profil.data.IsAdmin
  }
  
  
 
  
  return (
    <>
    {(user && isadmin) && (
      <nav className="navbar">
      <Image 
          src={Logo}
          width={300}
          height={"auto"}
          alt="logo du site"
          priority
          placeholder="empty"
      />
      <span className="log">
        <Link href={"/"}>Acceuil</Link>
        <Link href={"/job"}>Jobs</Link>
        <Link href={"/admin"}>Admin</Link>
        <ProfilButton /> 
        <LogoutButton />
      </span>
    </nav>
    )}
    {(user && !isadmin) && (
      <nav className="navbar">
      <Image 
          src={Logo}
          width={300}
          height={"auto"}
          alt="logo du site"
          priority
          placeholder="empty"
      />
      <span className="log">
        <Link href={"/"}>Acceuil</Link>
        <Link href={"/job"}>Jobs</Link>
        <ProfilButton /> 
        <LogoutButton />
      </span>
    </nav>
    )}
    {(!user) && (
      <nav className="navbar">
      <Image 
          src={Logo}
          width={300}
          height={"auto"}
          alt="logo du site"
          priority
          placeholder="empty"
      />
      <span className="log">
        <Link href={"/job"}>Jobs</Link>
        <Link href="/login">Log In</Link>
        <Link href={"/signup"}>Sign Up</Link>
      </span>
    </nav>
    )} 
    </>
  )
}
