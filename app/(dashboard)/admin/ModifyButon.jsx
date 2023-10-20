"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { BsPencil } from '@react-icons/all-files/bs/BsPencil'

export default function ModifyButton({ id }) {
  return (
    <button className="btn-admin">
          <BsPencil />
          Modifer
    </button>
  )
}