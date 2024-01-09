import React from 'react'
import { useSession, signOut, signIn } from "next-auth/react"
import SearchIcon from '@mui/icons-material/Search';
import Trend  from "@/app/components/Trend"
import Weather  from "@/app/components/Weather"

export default function SideBar(data: any) {
  return (
    <>
    <div className='hidden bg-white border border-color  items-center flex-col rounded xl:w-[30%] xl:flex'>
        <div className='flex items-center flex-col w-11/12'>
          <div className="relative mt-3 flex justify-start items-center w-full">
            <SearchIcon className="absolute mx-3 text-gray-400" />
            <input type="text" className='border-color w-full rounded-2xl h-[35px] px-10' placeholder='ユーザーを検索'/>
          </div>
          <button onClick={() => signOut()} className='bg-white mt-3 font-bold w-full h-[40px] border-2'>ログアウト(仮)</button>
          <Trend />
          <Weather />
          </div>
    </div>
    </>
  )
}