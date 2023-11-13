import Image from 'next/image'
import React from 'react'
import Logo from '@/imgs/logo.png'
import Link from 'next/link'
export default function Header() {
  return (
    <>
      <div className='mt-4 mb-5 w-full md:mt-7 md:mb-10 '>
        <div className='flex justify-center items-center w-full'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/">
              <Image src={Logo} className='w-[125px] h-[45px] md:w-[175px] md:h-[60px]' alt="Logo"/>
            </Link>
            <div className='h-[40px] md:[60px] flex justify-center items-center px-2 rounded-md border-4 border-neutral-400 normal hover:bg-neutral-400 cursor-pointer'>
              <div className='text-centerfont-bold text-xs tracking-[1px] text-white md:text-base'>アカウント切り替え</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}