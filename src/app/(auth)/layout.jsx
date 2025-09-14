'use client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Layout({ children }) {
  const searchParams = useSearchParams();
  const t = searchParams.get('t');
  const router = useRouter()
  // useEffect(()=>{
  //   if(!t) return router.push('/')

  // },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout