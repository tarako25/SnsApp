"use client"
import React from 'react'
import Link from 'next/link'
import { MenuElements } from "@/lib/Elements"

export default function MenuBar() {
  return (
    <>
      <div className=' rounded w-[15%] flex justify-start md:w-[25%]'>
        <div className='w-[100%]'>
          {MenuElements.map((items, index) =>
            <Link href={items.link} key={index} className='cursor-pointer flex justify-center items-center h-[65px] rounded-md border-4 mb-3 border-neutral-400 normal hover:bg-neutral-400'>
              <div className='text-white mx-3'>{items.icon}</div>
              <div className='w-full text-left font-bold text-sm tracking-[3px] hidden text-white md:block xl:text-lg'>{items.MenuName}</div>
            </Link>
          )}
        </div>
      </div>
      <div className='border borderline'></div>
    </>
  )
}
