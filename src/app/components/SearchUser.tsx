"use client"
import React, { useState, useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { pageItem } from "@/lib/PageItem"
import Link from 'next/link'
import Image from 'next/image'
import  LoadingPost  from "@/app/components/LoadingPost"
import toast, { Toaster } from "react-hot-toast";

export default function SearchUser(data: any) {

const [user, setUser] = useState([null])
const [checkfollow, setCheckfollow] = useState<Array<{ userId: any, followId: any }>>([]);

//Pganegation
const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(1);

useEffect(() => {
    if(data.keyword){
        getSearchUser(page)
    }
  },[page,data.keyword])

const getSearchUser = async(page: number) => {
    const response = await fetch(`/api/getSearchUser?page=${page}`,{
        body: JSON.stringify(data.keyword),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });
    const User = await response.json();
    setUser(User.searchUser)
    setCheckfollow(User.follow)
    const count = Math.ceil(User.count / pageItem);
    if(count < 0){
      setPageCount(count);
    } else {
      setPageCount(1)
    }
}

  if (user[0] === null) {
    return <LoadingPost />; // ローディング画面を表示
  }

  //フォロー
  const handleFollow = async(followName: any, followId: any, e: any) => {
    e.preventDefault()
    const postData = {
      userId: data.userId, userName: data.userName, followId: followId, followName: followName
    }
    console.log(postData)
    await fetch('/api/InputFollow', {
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    getSearchUser(page)
    toast.success("フォローしました", { id: "1" });
  }
//フォロー解除
  const handleCancelFollow = async (userId: any, followId: any, e: any) => {
    e.preventDefault()
    await fetch(`/api/InputFollow?userId=${userId}&followId=${followId}`, {
      method: 'DELETE'
    });
    getSearchUser(page)
    toast.success("フォローを解除しました", { id: "1" });
  }

  return (
    <>
    <Toaster />
    {/* 1記事 */}
    {
    user.length != 0 ?
    user.map((item: any) => (
      <Link href={`/profile/${item.id}`} key={item.id}>
        <div className='border-color rounded mt-3 bg-white flex justify-start items-center flex-col'>
          <div className='flex w-[95%] my-3'>
            <Image src={item.image} width={55} height={55} alt="" className='w-[55px] h-[55px] rounded-full border-color'/>
            <div className='flex justify-center w-full items-center flex-col text-left'>
              <div className='flex justify-start items-center w-[95%]'>
                <div className='w-[95%] font-bold mb-1 text-md'>{item.name}</div>
                {item.id !== data.userId ?
                    (checkfollow?.some(follow => follow.followId === item.id) ?
                        <button onClick={(e) => {handleCancelFollow(data.userId, item.id, e)}} className='border-color bg-color text-color px-2 py-1 rounded text-xs'>
                        フォローを解除する
                        </button>
                        :
                        <div>
                        <button onClick={(e) => {handleFollow(item.name,item.id, e)}} className='border-color bg-color text-color px-2 py-1 rounded text-xs'>
                        フォローする
                        </button>
                        </div>
                    )
                :
                ""
                }
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))
  :
  <div className='flex justify-center items-center mt-3'>
    <div><span className='font-bold'>{data.keyword}</span>に関するユーザーが見つかりません</div>
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