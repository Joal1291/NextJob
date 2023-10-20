"use client"

import { useState } from 'react'

export default function AuthForm({ handleSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)} className='logandsign'>
      <h2 className="text-center text-3xl">Login</h2>
      <label className='labells'>
        <span className='spanls'>Email:</span>
        <input
        className='inputls'
          type="email"
          autoComplete='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required 
        />
      </label>
      <label className='labells'>
        <span className='spanls'>Password:</span>
        <input
            className='inputls'
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required 
        />
      </label>
      <button className="btn-primary">Valider</button>
    </form>
  )
}

