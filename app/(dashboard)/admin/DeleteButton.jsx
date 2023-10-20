"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { TiDelete } from 'react-icons/ti'

export default function DeleteButton({id, page}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    
    const response = await fetch(`http://localhost:3000/api/admin/${page}/${id}`, {
      method: 'DELETE'
    })

     const json = await response.json()

     if(json.error){
      setIsLoading(false)
     }
     if(!json.error){
      router.refresh()
     }

  }

  return (
    <button 
      className="btn-admin" 
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading && (
        <>
          <TiDelete />
          Suppression....
        </>
      )}
      {!isLoading && (
        <>
          <TiDelete />
          Supprimer
        </>
      )}
    </button>
  )
}