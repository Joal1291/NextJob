"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"


export default function ModifyProfile({profile}) {
    const router = useRouter()

    //-----Job Form
    const [FirstName, setFirstName] = useState(profile.FirstName)
    const [LastName, setLastName] = useState(profile.LastName)
    const [Tel, setTel] = useState(profile.Tel)
    
    const handleSubmitProfile = async (e) => {
        e.preventDefault()

        let formValue= {FirstName, LastName, Tel}
        
        const response = await fetch(`http://localhost:3000/api/admin/profile/${profile.Id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formValue)
        })

        const data = await response.json()

        if(data.error){
            console.log(error)
        }
        if(data.data){
            router.refresh()
            router.push('/admin')           
        }
    }

  return (
    <>
    <form onSubmit={handleSubmitProfile} className="create" >
        <h2>Modifier le profil</h2>
        <label>
            <span className="w-1/3">Prenom</span>
            <input
                type="text" 
                className="border-2" 
                onChange={(e) => setFirstName(e.target.value)} 
                value={FirstName}/>
        </label>
        <label >
            <span >Nom</span>
            <input
                type="text" 
                className="border-2" 
                onChange={(e) => setLastName(e.target.value)} 
                value={LastName}/>
        </label>
        <label>
            <span>Tel</span>
            <input 
                type="text" 
                className="border-2" 
                onChange={(e) => setTel(e.target.value)} 
                value={Tel}
            />
        </label>
        <button type="Submit">Valider</button>
    </form>
    </>
  )
}