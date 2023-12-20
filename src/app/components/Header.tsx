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
      <div className="w-[95%] flex justify-center items-center flex-col sm:w-[70%] md:w-[80%] xl:w-[800px]">
        <div className='flex justify-center items-center w-full'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/">
              <Image src={Logo} className='w-[125px] h-[45px] md:w-[175px] md:h-[60px]' alt="Logo"/>
            </Link>
              {data.userName ?
              <div className='flex justify-center items-center'>
                <Image src={sample} alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='ml-3 font-bold'>{data.userName}</div>
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