"use client"
import React from 'react'
import  SelectFollow  from "@/app/components/SelectFollow"

export default function GoodPost(data: any) {

  return (
    <>
    <div className="flex justify-center items-start flex-col w-[100%] rounded-md md:w-[70%] xl:w-[45%]">
      <div className=' text-black font-bold'>
        フォローユーザー
      </div>
      <SelectFollow userId={data.userId} userName={data.userName}/>
    </div>
    </>
  )
}
