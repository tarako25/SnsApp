"use client"
import React from 'react'
import Image from 'next/image'
import sample from '@/imgs/sample2.png'
import toast, { Toaster } from "react-hot-toast";

export default function InputPost(data: any) {
  const handleInput = async(e: any) => {
    e.preventDefault()
    toast.loading("投稿中..", { id: "1" });
    const formData = new FormData(e.target);
    const content = formData.get("content");
    if (content == "") {
      return;
    }
    const postData = {
      content, userId:data.userId, userName: data.userName, To: data.To
    }
    console.log(postData)
    const response = await fetch('api/inputPost', {
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    e.target.reset();
    if(data.To == undefined){
      data.getAllPost(data.page)
    } else {
      data.getPostDetail(data.To)
      data.getToPost(data.page, data.To)
    }
    toast.success("投稿しました", { id: "1" });
  } 
  return (
    <>
    <Toaster />
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
    </>
  )
}