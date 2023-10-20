"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation"


export default function ApplyBtn({ jobId,user,applied}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [applicationStatus, setApplicationStatus] = useState(applied ? 'Applied' : 'Apply Now');

    const handleClick = async (e) => {
        e.preventDefault()
        setIsLoading(true)


        const apply = { CandidateId:user.id, JobId: jobId }

        const res = await fetch('http://localhost:3000/api/application', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apply)
        })

        const json = await res.json()

        if (json.error) {
            console.log(error.message)
            setIsLoading(false)

        }
        if (json.data) {
            router.refresh()
            setApplicationStatus('Applied');

        }
        setIsLoading(false)
        
    }

    // const handleApply=()=>{
    //     const res = await

    // }

    return (
        <>
            <button className="btn-primary" onClick={handleClick} disabled={applied || isLoading}>
                {isLoading ? 'waiting...' : applicationStatus}
            </button>
        </>
    )
    
}
