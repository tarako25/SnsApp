import React from 'react'
import { useSession, signOut, signIn } from "next-auth/react"

export default function SideBar(data: any) {
  return (
    <>
    <div className='hidden bg-white border border-color rounded xl:w-[30%] xl:block'>
        <div className='flex items-center flex-col'>
        <button onClick={() => signOut()} className='bg-white mb-2 font-bold rounded w-[350px] h-[40px] border-2'></button>
        </div>
    </div>
    </>
  )
}