import { FaLocationDot, FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import Link from 'next/link'

// component
import ApplyBtn from "./ApplyBtn";

async function getJobs() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('jobcard')
    .select()

  if (error) {
    console.log(error.message)
  }

  return data
}

async function getApplications() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('Application')
    .select()

  if (error) {
    console.log(error.message)
  }

  return data
}

export default async function JobList() {
  const jobs = await getJobs()
  const applications = await getApplications()

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <>
      <p>Recent posts</p>

      <div className="jobList">

        {jobs.map((job) => (
          
          <div className="job" key={job.Id}>
            <img src="https://avatars.githubusercontent.com/u/105803677?v=4" alt="" className="job-logo" />
            <div className="job-content">
              <div className="job-content--left">
                <div className="organization-name">{job.OrganizationName}</div>
                <div className="job-title">{job.Title}</div>
              </div>
              <div className="job-content--right">
                <div className="job-location"><FaLocationDot /> {job.Location}</div>
                <div className="job-date">{job.DatePosted}</div>
              </div>
            </div>
            <div className="job-btn-group">
              <Link href={`/job/${job.Id}`}>
                <button className="btn-secondary">View Job</button>
              </Link>

              {data.session && <ApplyBtn jobId={job.Id} user={data.session} applied={applications.some((element) => element.JobId === job.Id && element.CandidateId === data.session.user.id)}/>}
              

            </div>
          </div>
        ))}

        <div className="pagination">
          <span><FaAngleLeft /></span> <span>1</span> <span>2</span> <span><FaAngleRight /></span>
        </div>

      </div>



      {jobs.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>

  )
}
