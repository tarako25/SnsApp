"use client"
import React, { useState, useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { pageItem } from "@/lib/PageItem"
import sample from '@/imgs/sample2.png'
import Link from 'next/link'
import Image from 'next/image'
import  LoadingPost  from "@/app/components/LoadingPost"
export default function DirectMessageList(data: any) {

//Pganegation
const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(1);

const [user, setUser] = useState([null])

useEffect(() => {
    getDirectMessageUserList(page)
},[])
const getDirectMessageUserList = async(page: number) => {
    const response = await fetch(`/api/getDirectMessageUserList?page=${page}`);
    const data = await response.json();
    const count = Math.ceil(data.count / pageItem);
    if(count < 0){
      setPageCount(count);
    } else {
      setPageCount(1)
    }
    setUser(data.uniqueUsers)
}
if (user[0] === null) {
  return <LoadingPost />; // ローディング画面を表示
}
  return (
    <>
    {
    user.length != 0 ?
    user.map((item: any) => (
      item.targetname == data.userName ?
      <Link href={`directMessage/${item.id}`} key={item.id}>
        <div className='border-color rounded mt-3 bg-white flex justify-start items-center flex-col'>
          <div className='flex w-[95%] my-3'>
            <Image src={item.user.image} width={55} height={55} alt="" className='w-[55px] h-[55px] rounded-full border-color'/>
            <div className='flex justify-center w-[90%] items-center flex-col text-left break-words'>
              <div className='flex items-left w-[95%] flex-col'>
                <div className='font-bold mb-1 text-md'>{item.username}</div>
                <div className='flex'>
                  <div>メッセージ：</div>
                  <div className="text-gray-400 text-sm">{item.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      :
      <Link href={`directMessage/${item.id}`} key={item.id}>
        <div className='border-color rounded mt-3 bg-white flex justify-start items-center flex-col'>
          <div className='flex w-[95%] my-3'>
            <Image src={item.targetuser.image} width={55} height={55} alt="" className='w-[55px] h-[55px] rounded-full border-color'/>
            <div className='flex justify-center w-full items-center flex-col text-left'>
              <div className='flex items-left w-[95%] flex-col'>
                <div className='font-bold mb-1 text-md'>{item.targetname}</div>
                <div className='flex'>
                  <div className='text-sm'>メッセージ：</div>
                  <div className="text-gray-400 text-sm">{item.content}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))
  :
  <div className='flex justify-center items-center mt-3'>
    <div>メッセージがありません</div>
  </div>
  }
  <div className='w-full mt-3 flex justify-center'>
    <Pagination
      count={pageCount}
      page={page}
      onChange={(e, page) => setPage(page)}
    />
  </div>
    </>
  )
}
