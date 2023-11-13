"use client"
import React from 'react'
import Link from 'next/link'
import { MenuElements } from "@/lib/Elements"

export default function MenuBar() {
  return (
    <>
      <div className='w-[100%] md:w-[30%] flex'>
        <div className='rounded w-[100%] flex justify-start flex-row md:flex-col'>
          <div className='w-[100%] flex-row flex justify-between md:flex-col pb-2 md:pb-0'>
            {MenuElements.map((items, index) =>
              <Link href={items.link} key={index} className={`cursor-pointer flex justify-center items-center h-[45px] rounded-md border-4 md:h-[65px] md:mb-3 w-[20%] md:w-[100%]  border-neutral-400 normal hover:bg-neutral-400 md:flex ${items.class === 'none' ? 'hidden' : ''}`}>
                <div className='text-white mx-3'>{items.icon}</div>
                <div className='w-full text-left font-bold text-sm tracking-[3px] hidden text-white md:block xl:text-lg'>{items.MenuName}</div>
              </Link>
            )}
          </div>
        </div>
        <div className='border-2 borderline mx-4 hidden md:block'></div>
      </div>
    </>
  )
}
