"use client"
import React, { useState } from 'react'
import AllPost from "@/app/compornents/AllPost"
import FollowerPost from "@/app/compornents/FollowerPost"

export default function Select(data: any) {

  const [switchbtn, setSwitchbtn] = useState(true);
  const handleChange = () => {
    //押すたびに反転
    setSwitchbtn((boolean) => !boolean)
  }
  return (
    <>
    <div className='normal border-4 w-[100%] rounded-md border-neutral-400 md:w-[70%]'>
        <div className='w-full pb-3 rounded-sm normal flex justify-center'>
          <div className='w-[95%]'>
            {/* 投稿切り替えボタン */}
            <div className='w-full mt-3 rounded flex justify-around h-[50px]'>
                <div onClick={handleChange} className='w-[50%] text-sm md:text-base fontc flex justify-center items-center border-2 rounded cursor-pointer font-bold text-md bg-white border-zinc-200'>
                    すべての投稿
                </div>
                <div onClick={handleChange} className='w-[50%] text-sm md:text-base fontc flex justify-center items-center border-2 rounded cursor-pointer font-bold text-md bg-white border-zinc-200'>
                    フォロワーの投稿
                </div>
            </div>
            {switchbtn ? <AllPost userId={data.userId} userName={data.userName} /> : <FollowerPost userId={data.userId} userName={data.userName} />}
          </div>
        </div>
    </div>
    </>
  )
}
