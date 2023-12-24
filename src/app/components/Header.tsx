"use client"
import Image from 'next/image'
import React from 'react'
import Logo from '@/imgs/logo.png'
import sample from '@/imgs/sample2.png'
import Link from 'next/link'

export default function Header(data: any) {

  return (
    <>
      <div className='p-3 w-full flex justify-center items-center bg-white'>
      <div className="w-[95%] flex justify-center items-center flex-col sm:w-[70%] md:w-[75%] xl:w-[1200px]">
        <div className='flex justify-center items-center w-full'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/">
              <Image src={Logo} className='w-[120px] h-[50px] md:w-[150px] md:h-[70px]' alt="Logo"/>
            </Link>
              {data.userName ?
              <div className='flex justify-center items-center'>
                <Image src={sample} alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='ml-3 font-bold'><Link href={`/profile/${data.userId}`}>{data.userName}</Link></div>
              </div>
              :
              <div className='flex justify-center items-center'>
                <Image src={sample} alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='ml-3 font-bold w-[50px]'></div>
              </div>
              }
          </div>
        </div>
        </div>
      </div>
    </>
  )
}