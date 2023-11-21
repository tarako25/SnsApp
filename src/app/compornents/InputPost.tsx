"use client"
import React from 'react'
import Image from 'next/image'
import sample from '@/imgs/sample2.png'
export default function InputPost() {
  const handleInput = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const content = formData.get("content");
    
  } 
  return (
    <>
    <div>
    <div>
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Image alt="" src={sample} className='w-[55px]  h-[55px] rounded-full border-2 border-zinc-400'/>
          <form onSubmit={handleInput} className='flex justify-center w-full items-center my-1 flex-col text-left'>
            <textarea name="content" placeholder='今日の出来事を投稿しよう' className='w-[95%] h-[45px] p-2 text-sm md:text-base rounded-md border-2 flex items-start justify-start'>
            </textarea>
            <div className='w-[95%] flex my-2 justify-end'>
                <button className='border-2 px-4 py-1 rounded' type='submit'>
                    送信
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}