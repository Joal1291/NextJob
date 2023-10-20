"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'



export default function Profil({user}) {
    const router = useRouter()

    const [personal, setPersonal] = useState(true)
    const [password, setPassword] = useState(false)
    const [jobList, setJobList] = useState(false)
    const [change , setChange] = useState(false)
    const [modifyPassword, setModifyPassword] = useState(false)
    const [modifyInfo, setModifyInfo] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [FirstName, setFirstName] = useState(user.FirstName)
    const [LastName, setLastName] = useState(user.LastName)
    const [Tel, setTel] = useState(user.Tel)


    const handleClick = (value) => {
        if(value == 'personal'){
            setPersonal(true)
            setPassword(false)
            setJobList(false)
            setChange(false)
            setModifyPassword(false)
            setModifyInfo(false)
            setConfirm(false)
        }else if(value == 'password'){
            setPersonal(false)
            setPassword(true)
            setJobList(false)
            setChange(false)
            setModifyPassword(false)
            setModifyInfo(false)
            setConfirm(false)
        }else if(value == 'joblist'){
            setPersonal(false)
            setPassword(false)
            setJobList(true)
            setChange(false)
            setModifyPassword(false)
            setModifyInfo(false)
            setConfirm(false)
        }
    }
    const handleChange = (value, value2) => {
        if(value == 'modify' && value2 == 'password'){
            setChange(true)
            setModifyPassword(true)
            setPassword(false)
        }else if(value == 'modify' && value2 == 'personal'){
            setChange(true)
            setModifyInfo(true)
            setPersonal(false) 
        }
    }
    const handleSubmit = async (id, FirstName, LastName, Tel) =>{
        const profil = {FirstName, LastName, Tel}
        console.log(profil)

        const response = await fetch(`http://localhost:3000/api/profil/${id}/modify`, {
            method: "PUT",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(profil)
        })

        const data = await response.json()

        if(data.error){
            console.log('non')
        }
        if(data.data){
            console.log('ok')
            setModifyInfo(false)
            setConfirm(true)
            router.refresh()
        }
    }

  return (
    <div>
      <ul>
        <li onClick={() => handleClick('personal')}className="border-r-2 border-black">Information personnel</li>
        <li onClick={() => handleClick('password')} className="border-r-2 border-black">Mot de passe</li>
        <li onClick={() => handleClick('joblist')} >Annonce</li>
      </ul>
      {personal && (
        <div className="infoprofil">
        <label>
          <span >Prénom</span>
          <p>{user.FirstName}</p>
        </label>
        <label>
          <span>Nom</span>
          <p>{user.LastName}</p>
        </label>
        <label>
          <span>Télephone</span>
          <p>{user.Tel}</p>
        </label>
        <button onClick={() => handleChange('modify', 'personal')}>Modifier les informations</button>
      </div> 
      )}
      {password && (
        <div className='passwordprofil'>
            <button className='passwordbutton' onClick={() => {handleChange('modify', 'password')}}>Modifier le mot de passe</button>
        </div>
      )}
      {jobList && (
        <div>
            job list
        </div>
      )}
      {(change && modifyInfo) && (
        <form className='infoprofil' onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(user.Id, FirstName, LastName, Tel)}}>
            <label>
                <span>Prénom</span>
                <input 
                    type="text"
                    placeholder={user.FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={FirstName}
                />
            </label>
            <label>
                <span>Nom</span>
                <input 
                    type="text"
                    placeholder={user.LastName}
                    onChange={(e) => setLastName(e.target.value)}
                    value={LastName}
                />
            </label>
            <label>
                <span>Téléphone</span>
                <input 
                    type="text"
                    placeholder={user.Tel}
                    onChange={(e) => setTel(e.target.value)}
                    value={Tel}
                />
            </label>
            <button type='submit'>Valider les changements</button>
        </form>
      )}
      {(change && confirm) && (
        <div className='passwordprofil'>
            <p>Vos information ont bien était modifier!</p>
        </div>
      )}
      {(change && modifyPassword) && (
        <div>
            modify password
        </div>
      )}
      
      
    </div> 
  )
}
