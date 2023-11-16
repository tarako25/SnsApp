"use client"
import React from 'react'
import Image from 'next/image'
import sample from '@/imgs/sample2.png'
export default function InputPost() {
  return (
    <>
    <div>
    <div>
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Image alt="" src={sample} className='w-[55px]  h-[55px] rounded-full border-2 border-zinc-400'/>
          <div className='flex justify-center w-full items-center my-1 flex-col text-left'>
            <textarea placeholder='今日の出来事を投稿しよう' className='w-[95%] h-[45px] p-2 text-sm md:text-base rounded-md border-2 flex items-start justify-start'>
            </textarea>
            <div className='w-[95%] flex my-2 justify-end'>
                <button className='border-2 px-4 py-1 rounded'>
                    送信
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}