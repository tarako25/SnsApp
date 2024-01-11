"use client"
import React, { useEffect, useState } from 'react'
import SearchPost from "@/app/components/SearchPost"
import SearchUser from "@/app/components/SearchUser"
import FollowerPost from "@/app/components/FollowerPost"
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SelectSearch(data: any) {

  const router = useRouter();
  const sParams = useSearchParams();

  const search = sParams.get("keyword");

  const [switchbtn, setSwitchbtn] = useState(true);
  const [keyword, setKeyword] = useState<string | null>(search)
  const [inputkeyword, setInputkeyword] = useState<string | null>(search)


  useEffect(() => {
    setKeyword(search);
  }, [search]);

  const handleAll = () => {
    setSwitchbtn(true)
  }
  const handleFollow = () => {
    setSwitchbtn(false)
  }

  const TransitionPage = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("keyword");
    if (typeof keyword === 'string') {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    } 
  }

  return (
    <>
    <div className='w-[100%] rounded-md md:w-[70%] xl:w-[45%]'>
        <div  className="relative mb-3 flex justify-start items-center w-full">
        <form onSubmit={TransitionPage} className="relative mb-3 flex justify-start items-center w-full">
            <SearchIcon className="absolute mx-3 text-gray-400" />
            <input type="text" name="keyword" className='border-color w-full rounded-3xl h-[45px] px-10' placeholder={switchbtn ? "記事を検索" : "ユーザーを検索"} value={`${inputkeyword}`} onChange={(e) => {
              setInputkeyword(e.target.value)
            }} />
          </form>
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
      {switchbtn ? <SearchPost userId={data.userId} userName={data.userName} keyword={keyword}/> : <SearchUser userId={data.userId} userName={data.userName} keyword={keyword}/>}
    </div>
    </>
  )
}
