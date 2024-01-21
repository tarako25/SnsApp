"use client"
import React from 'react'
import { redirect } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react"
import Image from 'next/image'
import Logo from '@/imgs/logo.png'

export default function page() {
  return (
    <>
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full sm:w-[400px] bg-white rounded-2xl'>
        <div className='pt-[0px] sm:py-[50px] flex justify-start items-center flex-col bg-white w-full h-full rounded-2xl'>
          <Image src={Logo} alt="" className='w-[150px] h-[65px]'/>
          {/* <div className='flex justify-center items-start flex-col'>
            <label htmlFor="" className='font-bold text-black mb-1'>メールアドレス</label>
            <input type="text" placeholder="email" className='pl-2 rounded mb-3 w-[350px] h-[40px] border-2'/>
            <label htmlFor="" className='font-bold text-black mb-1'>パスワード</label>
            <input type="text" placeholder="password" className='pl-2 rounded mb-4 w-[350px] h-[40px] border-2'/>
            <button className='w-[350px] h-[40px] rounded font-bold bg-zinc-700 text-white'>
              ログイン
            </button>
          </div> */}

          <div className='w-[300px] border border-dashed mb-4 border-zinc-400'></div>
          <button onClick={() => signIn("google")} className='bg-zinc-700 rounded-md text-white mb-2 font-bold w-[300px] h-[40px] border-2'>
            Googleでログイン
          </button>
          <button onClick={() => signIn("github")} className='bg-zinc-700 rounded-md text-white mb-2 font-bold w-[300px] h-[40px] border-2'>
              Githubでログイン
          </button>
          {/* <button className=' w-[350px] h-[40px] font-bold rounded bg-zinc-700 text-white'>
              アカウント登録はこちら
          </button> */}
        </div>
      </div>
    </div>
    </>
  )
}
