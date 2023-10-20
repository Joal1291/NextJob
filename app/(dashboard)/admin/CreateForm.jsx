"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function CreateForm({page , user}) {
    const router = useRouter()
    console.log(user)

    //-----Job Form
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Location, setLocation] = useState('')
    const [Salary, setSalary] = useState('')
    const [Type, setType] = useState('')
    const [EmployerId, setEmployerId] = useState(user.id)
    let OrganizationId = 1
    //-----Profile Form
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Tel, setTel] = useState('')
    //---Confirm
    const [confirm, setConfirm] = useState(false)
  
    const handleSubmitProfile = async (e) => {
        e.preventDefault()

        let formValue= {FirstName, LastName, Tel}
        
        const response = await fetch(`http://localhost:3000/api/admin/${page}`, {
            method: "POST",
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
            setConfirm(true)
            router.refresh()
            router.push('/admin')           
        }
    }
    const handleSubmitJob = async (e) => {
        e.preventDefault()

        let formValue = {Title, Description, Location, Salary, Type, EmployerId, OrganizationId}
        const response = await fetch(`http://localhost:3000/api/admin/${page}`, {
            method: "POST",
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
            setConfirm(true)
            router.refresh()
            router.push('/admin')           
        }
    }

  return (
    <>
    {(page == 'job' && !confirm) && (
        <form onSubmit={handleSubmitJob} className="create" >
        <h2>Créer un nouvelle annonce</h2>
        <label>
            <span className="w-1/3">Titre</span>
            <input
                type="text" 
                className="border-2" 
                onChange={(e) => setTitle(e.target.value)} 
                value={Title}/>
        </label>
        <label >
            <span >Description</span>
            <textarea 
                name="" 
                id="" 
                cols="30" 
                rows="10" 
                className="border-2 w-2/3" 
                onChange={(e) => setDescription(e.target.value)} 
                value={Description}
                placeholder="Faire une description du poste a pourvoir"
                ></textarea>
        </label>
        <label>
            <span>Location</span>
            <input 
                type="text" 
                className="border-2" 
                onChange={(e) => setLocation(e.target.value)} 
                value={Location}
            />
        </label>
        <label>
            <span>Salaire</span>
            <input 
                type="text" 
                className="border-2" 
                onChange={(e) => setSalary(e.target.value)} 
                value={Salary}
            />
        </label>
        <label>
            <span>Type de contrat</span>
            <select name="contrat" id="contrat" onChange={(e) => setType(e.target.value)}>
                <option value="">-----------</option>
                <option value="cdd">CDD</option>
                <option value="cdi">CDI</option>
                <option value="temps-partiel">Temps-partiel</option>
                <option value="alternance">Alternance</option>
            </select>
        </label>
        <button type="Submit">Valider</button>
    </form>
    )}
    {(page == 'profile' && !confirm) && (
        <form onSubmit={handleSubmitProfile} className="create" >
        <h2>Créer un nouveaux profil</h2>
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
    )}
    {(page == 'profile' && confirm || page == 'job' && confirm) && (
        <div>Information enregistrer.</div>
    )}
    </>
  )
}