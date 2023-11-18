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
      <div className='w-[450px] h-[500px] sm:h-[550px]'>
        <div className='flex justify-center items-center flex-col bg-white sm:bg-neutral-200 w-full h-full rounded-xl'>
          <Image src={Logo} alt="" className='w-[175px] h-[60px] mb-7 sm:w-[215px] sm:h-[75px]'/>
          <div className='flex justify-center items-start flex-col'>
            <label htmlFor="" className='font-bold text-black mb-1 text-sm'>メールアドレス</label>
            <input type="text" placeholder="email" className='pl-2 rounded mb-3 w-[350px] h-[40px] border-2'/>
            <label htmlFor="" className='font-bold text-black mb-1 text-sm'>パスワード</label>
            <input type="text" placeholder="password" className='pl-2 rounded mb-4 w-[350px] h-[40px] border-2'/>
            <button className='w-[350px] h-[40px] rounded bg-zinc-700 text-white'>
              ログイン
            </button>
          </div>
          <div className='w-[350px] border my-4 border-zinc-400'></div>
          <button onClick={() => signIn("google")} className='bg-white mb-2 font-bold rounded w-[350px] h-[40px] border-2'>
            Googleでログイン
          </button>
          <button onClick={() => signIn("github")} className='bg-white mb-2 font-bold rounded w-[350px] h-[40px] border-2'>
              Githubでログイン
          </button>
          <button className='mb-2 w-[350px] h-[40px] font-bold rounded bg-zinc-700 text-white'>
              アカウント登録はこちら
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
