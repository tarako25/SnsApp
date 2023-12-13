"use client"
import React, { useState, useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { pageItem } from "@/lib/PageItem"
import sample from '@/imgs/sample2.png'
import Link from 'next/link'
import Image from 'next/image'
import  LoadingPost  from "@/app/components/LoadingPost"
import toast, { Toaster } from "react-hot-toast";

export default function FollowUser(data: any) {

const [follower, setFollower] = useState([null])
const [userId, setUserId] = useState<string | undefined>(undefined);
const [checkfollow, setCheckfollow] = useState(null);

//Pganegation
const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(1);

useEffect(() => {
    const postIdUrl = location.pathname.slice(1);
    const userId = postIdUrl.split("/").pop();
    getFollower(page, userId);
    setUserId(userId)
},[page])

const getFollower = async(page: number, userId: any) => {
    const response = await fetch(`/api/getFollower?page=${page}&userId=${userId}`);
    const User = await response.json();
    setFollower(User.follower)
    setCheckfollow(User.follow)
    const count = Math.ceil(User.count / pageItem);
    setPageCount(count);
}

  if (follower[0] === null) {
    return <LoadingPost />; // ローディング画面を表示
  }

  //フォロー
  const handleFollow = async(followName: any, followId: any) => {
    const postData = {
      userId: data.userId, userName: data.userName, followId: followId, followName: followName
    }
    await fetch('/api/InputFollow', {
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    getFollower(page, userId)
    toast.success("フォローしました", { id: "1" });
  }
//フォロー解除
  const handleCancelFollow = async (id: any) => {
    await fetch(`/api/InputFollow?Id=${id}&followId=${userId}`, {
      method: 'DELETE'
    });
    getFollower(page, userId)
    toast.success("フォローを解除しました", { id: "1" });
  }

  return (
    <>
    <Toaster />
    {/* 1記事 */}
    {follower.map((item: any) => (
        <Link href={`/profile/${item.userId}`} key={item.id}>
        <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
          <div className='flex w-[95%] my-3'>
            <Image src={sample} alt="" className='w-[55px] h-[55px] rounded-full border-2 border-zinc-400'/>
            <div className='flex justify-center w-full items-center flex-col text-left'>
              <div className='flex justify-start items-center w-[95%]'>
                <div className='w-[95%] font-bold mb-1 text-md'>{item.username}</div>
                { !checkfollow ?
                <button onClick={() => {handleFollow(item.followname,item.followId)}} className='border-gray-300 border-2 px-2 py-1 rounded text-xs'>
                  フォローする
                </button>
                :
                <button onClick={() => {handleCancelFollow(item.id)}} className='border-gray-300 border-2 px-2 py-1 rounded text-xs'>
                  フォローを解除する
                </button>
              }
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  <div className='w-full mt-3 flex justify-center'>
    <Pagination
      count={pageCount}
      color="primary"
      page={page}
      onChange={(e, page) => setPage(page)}
    />
  </div>
    </>
  )
}