"use client"
import React, { useEffect, useState } from 'react'
import AllPost from "@/app/components/AllPost"
import FollowerPost from "@/app/components/FollowerPost"
import SearchIcon from '@mui/icons-material/Search';

export default function SelectSearch(data: any) {

  const [switchbtn, setSwitchbtn] = useState(true);
  const [content, setContent] = useState<string | null>()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get('content');
    setContent(content);
  },[])

  const handleAll = () => {
    setSwitchbtn(true)
  }
  const handleFollow = () => {
    setSwitchbtn(false)
  }
  return (
    <>
    <div className='w-[100%] rounded-md md:w-[70%] xl:w-[45%]'>
        <div  className="relative mb-3 flex justify-start items-center w-full">
            <SearchIcon className="absolute mx-3 text-gray-400" />
            <input type="text" className='border-color w-full rounded-3xl h-[45px] px-10' placeholder='ユーザーを検索' value={`${content}`}/>
        </div>
      {/* 投稿切り替えボタン */}
      <div className='w-full rounded flex justify-around h-[50px] '>
          <div onClick={handleAll} className='w-[50%] text-sm md:text-base flex justify-center items-center border rounded cursor-pointer font-bold text-md bg-color text-color border-color'>
              投稿
          </div>
          <div onClick={handleFollow} className='w-[50%] text-sm md:text-base flex justify-center items-center border rounded cursor-pointer font-bold text-md bg-color text-color border-color'>
              ユーザー
          </div>
      </div>
      {/* {switchbtn ? <AllPost userId={data.userId} userName={data.userName} img={data.img}/> : <FollowerPost userId={data.userId} userName={data.userName} img={data.img}/>} */}
    </div>
    </>
  )
}
