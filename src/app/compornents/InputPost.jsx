"use client"
import React from 'react'
import Imgae from 'next/image'
import sample from '@/imgs/sample2.png'
export default function InputPost() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("content");
    console.log(content)
  }
  return (
    <>
    <div>
    <div>
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Imgae src={sample} alt="" className='w-[55px]  h-[55px] rounded-full border-2 border-zinc-400'/>
          <form onSubmit={handleSubmit} className='flex justify-center w-full items-center my-1 flex-col text-left'>
            <textarea name="content" placeholder='今日の出来事を投稿しよう' className='w-[95%] h-[45px] p-2 text-sm md:text-base rounded-md border-2 flex items-start justify-start'>
            </textarea>
            <div className='w-[95%] flex my-2 justify-end'>
                <input type="submit" value="送信" className='border-2 px-4 py-1 rounded'/>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}