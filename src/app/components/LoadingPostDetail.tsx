import React from 'react'
import LoadingPost from "@/app/components/LoadingPost"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from 'next/link';

export default function LoadingPostDetail() {
  return (
    <>
    <div className='normal border-4 w-[100%] rounded-md border-neutral-400 md:w-[70%]'>
      <div className='w-full pb-3 rounded-sm normal flex justify-center'>
        <div className='w-[95%]'>
        <Link href="/">
          <div className='mt-3 text-white'>
            <ArrowLeftIcon /> 投稿
          </div>
        </Link>
          <LoadingPost />
        </div>
      </div>
    </div>
    </>
  )
}