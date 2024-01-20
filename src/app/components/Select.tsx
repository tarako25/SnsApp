"use client"
import React, { useState } from 'react'
import AllPost from "@/app/components/AllPost"
import FollowerPost from "@/app/components/FollowerPost"

export default function Select(data: any) {

  const [switchbtn, setSwitchbtn] = useState(true);
  const handleAll = () => {
    setSwitchbtn(true)
  }
  const handleFollow = () => {
    setSwitchbtn(false)
  }
  return (
    <>
    <div className='w-[100%] rounded-md md:w-[70%] xl:w-[45%]'>
      {/* 投稿切り替えボタン */}
      <div className='w-full rounded flex justify-around h-[50px] '>
          <div onClick={handleAll} className='w-[50%] flex justify-center items-center border rounded cursor-pointer font-bold bg-color text-color border-color'>
              すべての投稿
          </div>
          <div onClick={handleFollow} className='w-[50%] flex justify-center items-center border rounded cursor-pointer font-bold bg-color text-color border-color'>
              フォロワーの投稿
          </div>
      </div>
      {switchbtn ? <AllPost userId={data.userId} userName={data.userName} img={data.img}/> : <FollowerPost userId={data.userId} userName={data.userName} img={data.img}/>}
    </div>
    </>
  )
}
