"use client"
import React from 'react'
import InputPost from "@/app/compornents/InputPost"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import sample from '@/imgs/sample2.png'
import Link from 'next/link'
import Image from 'next/image'
export default function ToPost() {
  return (
    <>
    <InputPost />
     {/* 1記事 */}
      <Link href="">
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Image src={sample} alt="" className='w-[55px] h-[55px] rounded-full border-2 border-zinc-400'/>
          <div className='flex justify-center w-full items-center flex-col text-left'>
            <div className='flex justify-start items-center w-[95%]'>
              <div className='w-[95%] font-bold mb-1 text-md'>sample</div>
              <div className='w-[95%] text-md flex justify-end'>2001/10/23</div>
            </div>
            <div className='w-[95%] text-sm md:text-base'>
            0
            </div>
            <div className='w-[95%] flex my-2'>
              <div className='mr-5'>
                {/*既にGoodが押されているかのチェック */}
                <button >
                    <FavoriteIcon className='text-[20px]'/>
                    0
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    {/* <div className='w-full mt-3 flex justify-center'>
    <Pagination
      count={pageCount}
      color="primary"
      page={page}
      onChange={(e, page) => setPage(page)}
    />
    </div> */}
    </>
  )
}
