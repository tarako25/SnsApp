"use client"
import Image from 'next/image'
import React from 'react'
import Logo from '@/imgs/logo.png'
import Link from 'next/link'
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react"

export default function Header() {

  const { data: session } = useSession()

  const handleLogout = () => {
    signOut();
  }
  return (
    <>
      <div className='mt-4 mb-5 w-full md:mt-7 md:mb-10 '>
        <div className='flex justify-center items-center w-full'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/">
              <Image src={Logo} className='w-[125px] h-[45px] md:w-[175px] md:h-[60px]' alt="Logo"/>
            </Link>
            {session === null ?
            ""
            :
            <button onClick={handleLogout} className='h-[40px] md:[60px] flex justify-center items-center px-2 rounded-md border-4 border-neutral-400 normal hover:bg-neutral-400 cursor-pointer'>
            <div className='text-centerfont-bold text-xs tracking-[1px] px-2 text-white md:text-base'>ログアウト</div>
            </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}