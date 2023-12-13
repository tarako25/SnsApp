"use client"
import React from 'react'
import  SelectFollow  from "@/app/components/SelectFollow"

export default function GoodPost(data: any) {

  return (
    <>
    <div className='mt-3 text-white'>
      フォローしたユーザー
    </div>
    <SelectFollow userId={data.userId} userName={data.userName}/>
    </>
  )
}
