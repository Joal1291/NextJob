"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { BsPencil } from '@react-icons/all-files/bs/BsPencil'
import Link from "next/link"

import DeleteButton from "./DeleteButton"
import CreateForm from "./CreateForm"
// import ModifyForm from "./ModifyForm"

export default function Admin({profileData, applicationData, jobData, user}) {
    const router = useRouter()

    const [parDefault, setParDefault] = useState(true)
    const [profile, setProfile] = useState(false)
    const [job, setJob] = useState(false)
    const [application, setApplication] = useState(false)
    const [modifyProfile, setModifyProfile] = useState(false)
    const [modifyJob, setModifyJob] = useState(false)
    const [createJob, setCreateJob] = useState(false)
    const [createProfile, setCreateProfile] = useState(false)

    const handleClick = (value) => {
        if(value == 'profile'){
            setProfile(true)
            setJob(false)
            setApplication(false)
            setParDefault(false)
            setCreateJob(false)
            setCreateProfile(false)
            setModifyJob(false)
            setModifyProfile(false)
        }else if(value == 'job'){
            setProfile(false)
            setJob(true)
            setApplication(false)
            setParDefault(false)
            setCreateJob(false)
            setCreateProfile(false)
            setModifyJob(false)
            setModifyProfile(false)
        }else if(value == 'application'){
            setProfile(false)
            setJob(false)
            setApplication(true)
            setParDefault(false)
            setCreateJob(false)
            setCreateProfile(false)
        }else if(value == 'createProfile'){
            setProfile(false)
            setJob(false)
            setApplication(false)
            setParDefault(false)
            setCreateJob(false)
            setCreateProfile(true)
            setModifyJob(false)
            setModifyProfile(false)
        }else if(value == 'createJob'){
            setProfile(false)
            setJob(false)
            setApplication(false)
            setParDefault(false)
            setCreateJob(true)
            setCreateProfile(false)
            setModifyJob(false)
            setModifyProfile(false)
        }else if(value == 'modifyJob'){
            setProfile(false)
            setJob(true)
            setApplication(false)
            setParDefault(false)
            setCreateJob(false)
            setCreateProfile(false)
            setModifyJob(true)
            setModifyProfile(false)
        }else if(value == 'moidifyProfile'){
            setProfile(true)
            setJob(false)
            setApplication(false)
            setParDefault(false)
            setCreateJob(false)
            setCreateProfile(false)
            setModifyJob(false)
            setModifyProfile(true)
        }
    }
    
    

  return (
    <div className="admin">
        <div className="adminnav">
            <button onClick={(e) => handleClick('profile')}>Profile Table</button>
            <button onClick={(e) => handleClick('application')}>Application Table</button>
            <button onClick={(e) => handleClick('job')}>Job Table</button>
        </div>
        <div className="admincontainer">
            {parDefault && (
                <div>Choisir votre table</div>
            )}
            {profile && (
                <>
                {(profileData.length > 0) && (
                    <>
                    <button className="btn-admin-post" onClick={(e) => handleClick('createProfile')}>
                        <BsPencil />
                        Créer
                    </button>
                    {profileData.map((profil) => (
                        <>
                            <div key={profil.Id} className="admincard">
                                <div className="admincardtitle">
                                    <h3>{profil.FirstName} {profil.LastName}</h3>
                                    <p>
                                        {profil.Employer &&(
                                        <span>Cette utilisateur et un candidat</span>
                                        )}
                                        {!profil.Employer && (
                                            <span>Cette utilisateur est une entreprise</span>
                                        )}
                                    </p>
                                </div>
                                <div className="admincardnumber">
                                    Contact: {profil.Tel}
                                </div>
                                <div className="buttoncard">
                                    <DeleteButton id={profil.Id} page={'profile'}/>
                                    <Link href={`/admin/modifyprofile/${profil.Id}`}>
                                        <button className="btn-admin" onClick={(e) => handleClick('modifyProfile')}>
                                            <BsPencil />
                                            Modifier
                                        </button>
                                    </Link>
                                    
                                </div>
                            </div>
                            {modifyProfile &&(
                                <ModifyForm  page={'profile'} profile={profil}/>
                            )}
                        </>
                        
                    ))}
                    </>
                )}
                {(profileData.length == 0) && (
                    <div>
                        Cette Table est vide!
                    </div>
                )}
                </>
            )}
            {job && (
                <>
                {(jobData.length > 0) && (
                <>
                    <button className="btn-admin-post" onClick={(e) => handleClick('createJob')}>
                        <BsPencil />
                        Créer
                    </button>
                    {jobData.map((job) => (
                        <>
                            <div key={job.Id} className="admincard">
                                <div className="admincardtitle">
                                    <h3>{job.Title} en {job.Type}</h3>
                                    <p>
                                        {job.Description.slice(0, 100)}...
                                    </p>
                                </div>
                                <div className="admincardnumber">
                                    <p>Location: {job.Location}</p> 
                                    <p>Salaire: {job.Salary}</p>
                                </div>
                                <div className="buttoncard">
                                    <DeleteButton id={job.Id} page={'job'}/>
                                    <Link href={`/admin/modifyjob/${job.Id}`}>
                                        <button className="btn-admin" onClick={(e) => handleClick('modifyJob')}>
                                            <BsPencil />
                                            Modifier
                                        </button>
                                    </Link>
                                    
                                </div>
                            </div>
                        </>
                    ))}
                </>
                )}
                {(jobData.length == 0) && (
                    <div>Cette table est vide!</div>
                )}
                </>
            )}
            {application && (
                <>
                {(applicationData.length > 0) && (
                    <>
                    {/* <button className="btn-admin-post">
                        <BsPencil />
                        Créer
                    </button> */}
                    {applicationData.map((appli) => (
                            <div key={appli.Id} className="admincard">
                                <div className="admincardtitle">
                                    <p>
                                        Identifiant Candidat: <br />{appli.CandidateId}
                                    </p>
                                </div>
                                <div className="admincardnumber">
                                    <p>Identifiant Job: {appli.JobId}</p> 
                                </div>
                                <div className="buttoncard">
                                    <DeleteButton id={appli.Id} page={'application'}/>
                                    {/* <button className="btn-admin-post" onClick={(e) => handleClick('createJob')}>
                                        <BsPencil />
                                        Créer
                                    </button> */}
                                </div>
                            </div>
                    ))}
                    </>
                )}
                {(applicationData.length == 0) && (
                    <div>Cette table est vide!</div>
                )}
                
                </>
            )}
            {createProfile && (
                <CreateForm page={'profile'}/>
            )}
            {createJob && (
                <CreateForm page={'job'} user={user}/>
            )}
        </div>
    </div>
  )
}
