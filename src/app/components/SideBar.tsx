import React from 'react'
import { useSession, signOut, signIn } from "next-auth/react"
import SearchIcon from '@mui/icons-material/Search';
import Trend  from "@/app/components/Trend"
import Weather  from "@/app/components/Weather"
import { useRouter } from "next/navigation";

export default function SideBar(data: any) {
  const router = useRouter();
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
    <div className='hidden  items-center flex-col rounded xl:w-[30%] xl:flex'>
        <div className='flex items-center flex-col w-full'>
          <form onSubmit={TransitionPage} className={`relative mb-3 flex justify-start items-center w-full ${data.filter}`}>
            <SearchIcon className="absolute mx-3 text-gray-400" />
            <input type="text" className='border-color w-full rounded-2xl h-[35px] px-10' name="keyword" placeholder='投稿やユーザーを検索'/>
          </form>
          <Trend />
          <Weather />
          <button onClick={() => signOut()} className='bg-white my-3 font-bold w-full h-[40px] border-2'>ログアウト(仮)</button>
          </div>
    </div>
    </>
  )
}