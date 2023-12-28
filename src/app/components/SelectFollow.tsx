"use client"
import React, { useState } from 'react'
import  FollowUser  from "@/app/components/FollowUser"
import  FollowerUser  from "@/app/components/FollowerUser"

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
        <div onClick={handleAll} className='w-[50%] text-sm md:text-base flex justify-center items-center rounded cursor-pointer font-bold text-md border-color bg-color text-color'>
            フォロー
        </div>
        <div onClick={handleFollow} className='w-[50%] text-sm md:text-base flex justify-center items-center rounded cursor-pointer font-bold text-md border-color bg-color text-color'>
            フォロワー
        </div>
    </div>
    <div className='w-full'>
      {switchbtn ? <FollowUser userId={data.userId} userName={data.userName} id={data.id}/> : <FollowerUser userId={data.userId} userName={data.userName} id={data.id}/>}
    </div>
    </>
  )
}
