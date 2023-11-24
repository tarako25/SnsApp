"use client"
import Link from 'next/link'
import Imgae from 'next/image'
import React from 'react'
import sample from '@/imgs/sample2.png'
import { useEffect, useState } from "react"
import InputPost from "@/app/compornents/InputPost"

export default function AllPost(data: any) {

  const [post, setPost] = useState([])
  useEffect(() => {
    getAllPost()
  },[])
  const getAllPost = async() => {
    const response = await fetch(`api/getAllPost`);
    const Post = await response.json();
    setPost(Post.data)
  }
  return (
    <>
    <InputPost userId={data.userId} userName={data.userName} getAllPost={getAllPost}/>
    {/* 1記事 */}
    {post.map((item: any) => (
      <Link href={item.id}>
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Imgae src={sample} alt="" className='w-[55px]  h-[55px] rounded-full border-2 border-zinc-400'/>
          <div className='flex justify-center w-full items-center flex-col text-left'>
            <div className='w-[95%] font-bold mb-1 text-md'>{item.username}</div>
            <div className='w-[95%] text-sm md:text-base'>
            {item.content}
            </div>
            <div className='w-[95%] flex my-2'>
              <div className='mr-5'>
                ♡2
              </div>
              <div className='mr-5'>
                ♡3
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    ))}
    </>
  )
}
