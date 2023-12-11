"use client"
import React, { useState } from 'react'

export default function SelectFollow(data: any) {
    
 const [switchbtn, setSwitchbtn] = useState(true);
  const handleAll = () => {
    setSwitchbtn(true)
  }
  const handleFollow = () => {
    setSwitchbtn(false)
  }
  return (
    <>
    <div className='w-full mt-3 rounded flex justify-around h-[50px]'>
        <div onClick={handleAll} className='w-[50%] text-sm md:text-base fontc flex justify-center items-center border-2 rounded cursor-pointer font-bold text-md bg-white border-zinc-200'>
            フォロー
        </div>
        <div onClick={handleFollow} className='w-[50%] text-sm md:text-base fontc flex justify-center items-center border-2 rounded cursor-pointer font-bold text-md bg-white border-zinc-200'>
            フォロワー
        </div>
    </div>
    {/* {switchbtn ? <AllPost userId={data.userId} userName={data.userName}/> : <FollowerPost userId={data.userId} userName={data.userName} />} */}
    </>
  )
}
