"use client"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default async function ProfilButton(){
    const router = useRouter()
    
    const handleClick = async () => {
        const supabase = createClientComponentClient()
        const data = supabase.auth.getSession()
        data.then(res => {
            let datas = res.data
            router.push(`profil/${datas.session.user.id}`)
        })   
    }

    return(
        <button onClick={handleClick}>
            Profil
        </button>
    )
    
    
}
