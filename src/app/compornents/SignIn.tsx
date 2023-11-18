"use client"
import React from 'react'
import { redirect } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react"

export default function page() {
  return (
    <>
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[450px] h-[550px]'>
        <div className='flex justify-center items-center flex-col bg-neutral-500 w-full h-full rounded-xl'>
          <div className='text-white text-4xl font-bold mb-10 tracking-[2px]'>Login</div>
          <div className='flex justify-center items-start flex-col'>
            <label htmlFor="" className='text-white mb-1 text-sm'>メールアドレス</label>
            <input type="text" placeholder="email" className='pl-2 rounded mb-3 w-[350px] h-[40px] border-2'/>
            <label htmlFor="" className='text-white mb-1 text-sm'>パスワード</label>
            <input type="text" placeholder="password" className='pl-2 rounded mb-4 w-[350px] h-[40px] border-2'/>
            <button className='w-[350px] h-[40px] rounded bg-zinc-700 text-white'>
              ログイン
            </button>
          </div>
          <div className='w-[350px] border my-4'></div>
          <button className='mb-2 w-[350px] h-[40px] font-bold rounded bg-white text-black'>
              アカウント登録はこちら
            </button>
          <button onClick={() => signIn("google")} className='bg-white mb-2 font-bold rounded w-[350px] h-[40px] border-2'>
            Googleでログイン
          </button>
          <button onClick={() => signIn("github")} className='bg-white mb-2 font-bold rounded w-[350px] h-[40px] border-2'>
              Githubでログイン
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
