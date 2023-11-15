import React from 'react'
import Main from "@/app/compornents/Main"

export default function Select() {
  return (
    <>
    <div className='normal border-4 w-[100%] rounded-md border-neutral-00 md:w-[70%]'>
        <div className='w-full pb-3 rounded-sm bg-zinc-500 flex justify-center'>
          <div className='w-[95%]'>
            {/* 投稿切り替えボタン */}
            <div className='w-full mt-3 rounded flex justify-around h-[50px]'>
                <div className='w-[50%] text-sm md:text-base fontc flex justify-center items-center border-2 rounded cursor-pointer font-bold text-md bg-white border-zinc-200'>
                    投稿
                </div>
                <div className='w-[50%] text-sm md:text-base fontc flex justify-center items-center border-2 rounded cursor-pointer font-bold text-md bg-white border-zinc-200'>
                    フォロワーの投稿
                </div>
            </div>
            <Main />
          </div>
        </div>
    </div>
    </>
  )
}
