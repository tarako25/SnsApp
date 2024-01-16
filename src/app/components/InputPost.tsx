"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import sample from '@/imgs/sample2.png'
import toast, { Toaster } from "react-hot-toast";
import { z } from 'zod';
import pt  from "@/app/components/ParseTag"

const postDataSchema = z.object({
  content: z.string().min(1, "投稿内容を入力してください").max(150, "内容は150文字以内で入力してください"),
  userId: z.any(),
  userName: z.any(),
  To: z.any().optional(),
});

export default function InputPost(data: any) {

  const [error, setError] = useState<string | null>(null);
  const [parseContent, setParseContent] = useState<string[] | null>([]);
  const [content, setContent] = useState<string | null>(null);

  const handleChangeText = (e: any) => {
    const text = pt((e.target as HTMLElement).textContent);
    setParseContent(text);
    setContent((e.target as HTMLElement).textContent)
  }

  const handleInput = async(e: any) => {
    e.preventDefault()
    toast.loading("投稿中..", { id: "1" });
    const postData = {
      content, userId:data.userId, userName: data.userName, To: data.To
    }
    const result = postDataSchema.safeParse(postData);

    if (!result.success) {
      toast.error("投稿に失敗しました", { id: "1" });
      setError(result.error.errors[0].message);
      return;
    }
    const response = await fetch('/api/inputPost', {
      body: JSON.stringify(result.data),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      //log
    }
    if(data.To == undefined){
      data.getPost(data.page)
    } else {
      data.getPostDetail(data.To)
      data.getToPost(data.page, data.To)
    }
    setParseContent(null)
    setContent(null)
    setError(null)
    toast.success("投稿しました", { id: "1" });
  } 
  return (
    <>
    <Toaster />
      <div className=' rounded mt-3 bg-white flex justify-start items-center flex-col border-color'>
        <div className='flex w-[95%] mt-3'>
          <Image alt="" src={data.img || sample} width={55} height={55} className='w-[55px]  h-[55px] rounded-full border-color'/>
          <form onSubmit={handleInput} className='flex justify-center w-full items-center flex-col '>
            <div className='flex justify-center w-full items-center flex-col text-left mt-1'>
              <div contentEditable onInput={handleChangeText} className='break-all placeholder w-[95%] min-h-[45px] p-2 text-sm md:text-base rounded-md border-color flex items-start justify-start'>
              </div>
              <div className='flex justify-start items-center w-[95%] mt-3 flex-wrap break-all'>
              {parseContent && parseContent.map((item: any) => (
                <div className='border-color bg-color text-color px-3 py-1 mr-3 mb-3 rounded-md'>{item}</div>
              ))}
              </div>
            </div>
            <div className='w-[95%] felx justify-center items-center m-2'>
              <div className='flex justify-start'>
                {error ? 
                <div className='text-red-400'>{error}</div>
                :
                ""
                }
              </div>
              <div className='flex justify-end'>
                <button className='border-color px-4 py-1 rounded' type='submit'>
                    送信
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}