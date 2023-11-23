"use client"
import Link from 'next/link'
import Imgae from 'next/image'
import React from 'react'
import sample from '@/imgs/sample2.png'

export default function FollowerPost(data: any) {
  return (
    <>
    {/* 1記事 */}
    <Link href="/">
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Imgae src={sample} alt="" className='w-[55px]  h-[55px] rounded-full border-2 border-zinc-400'/>
          <div className='flex justify-center w-full items-center flex-col text-left'>
            <div className='w-[95%] font-bold mb-1 text-md'>Samplename</div>
            <div className='w-[95%] text-sm md:text-base'>
              ReTwieetマジでs頼む
            </div>
            <div className='w-[95%] flex my-2'>
              <div className='mr-5'>
                ♡1
              </div>
              <div className='mr-5'>
                ♡1
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    {/* 1記事 */}
    </>
  )
}
