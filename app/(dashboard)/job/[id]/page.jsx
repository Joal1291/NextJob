import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { notFound } from "next/navigation"
import { cookies } from 'next/headers'
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";

// markdown
import React from 'react';
import MarkdownRenderer from '../../../components/MarkdownRenderer';


// components
import UrlClipboard from "../../../components/UrlClipboard"
import ApplyBtn from "../ApplyBtn";

export const dynamicParams = true // default val = true

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies })

  const { data: job } = await supabase.from('Job')
    .select()
    .eq('Id', params.id)
    .single()

  return {
    title: `NextJob | ${job?.Title || 'Job not found'}`
  }
}

async function getJob(id) {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.from('Job')
    .select()
    .eq('Id', id)
    .single()

  if (!data) {
    notFound()
  }

  return data
}


async function getProfile(id) {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.from('Profile')
    .select()
    .eq('Id', id)
    .single()

  if (!data) {
    notFound()
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

export default async function JobDetails({ params }) {

  // const id = params.id
  const job = await getJob(params.id)
  const profile = await getProfile(job.EmployerId)

  const applications = await getApplications()

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <main>

      <div className="job-details">

        <div className="job-details--left">
          <Link href={`/job`}>
            <button className="btn-secondary"><AiOutlineLeft /> All Jobs</button>
          </Link>
          <h3>Job Details</h3>
          <h2>{job.Title}</h2>
          <UrlClipboard />
          <MarkdownRenderer markdownContent={job.Description} />
        </div>
        <div className="job-details--right">
          <div className="job-details--employer">
            <img src="https://avatars.githubusercontent.com/u/105803677?v=4" alt="" className="" />
            <h2>{profile.UserName}</h2>
          </div>
          <div className="job-details--info">
            <div>
              <small>JobType</small>
              <p>{job.Type}</p>
            </div>
            <div>
              <small>Location</small>
              <p>{job.Location}</p>
            </div>
            <div>
              <small>Date posted</small>
              <p>{job.DatePosted}</p>
            </div>
          </div>


        </div>
      </div>
    </main>
  )
}