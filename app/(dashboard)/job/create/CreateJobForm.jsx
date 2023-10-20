"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default function CreateJobForm() {
    const router = useRouter()

    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Location, setLocation] = useState('')
    const [Salary, setSalary] = useState('')
    const [Type, setType] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const job = {Title, Description, Location, Salary, Type}

        const response = await fetch('http://localhost:3000/api/job', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(job)
        })

        const data = await response.json()

        if(data.error){
            console.log(error)
        }
        if(data.data){
            router.refresh()
            router.push('/job')            
        }
    }

  return (
    <form onSubmit={handleSubmit} className="create" >
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
  )
}
