"use client"

import { useState } from "react"


export default function SignUpForm({handleSubmit}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')

    // function getType(){

    // }

  return (
    <form className="logandsign" onSubmit={(e) => handleSubmit(e, email, password, type)}>
         <h2 className="text-center text-3xl">Sign up</h2>
        <label className="labells">
            <span className="spanls">Email</span>
            <input
                id="email"
                autoComplete="email"
                className="inputls"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </label>
        <label className="labells">
            <span className="spanls" >Password</span>
            <input
                id="password"
                className="inputls"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
        </label>
        <label className="labells">
            <span className="spanls">Qu'étent vous ?</span>
            <select name="type" id="type" className="inputls" onChange={(e) => setType(e.target.value)}>
                <option value="">---Choisir---</option>
                <option value="candidat">Un candidat</option>
                <option value="entreprise">Une entreprise</option>
            </select>
        </label>
        <button type="submit">Valider</button>
    </form>

    
    
  )
}
