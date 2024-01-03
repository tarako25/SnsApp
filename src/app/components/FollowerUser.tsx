"use client"
import React, { useState, useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { pageItem } from "@/lib/PageItem"
import sample from '@/imgs/sample2.png'
import Link from 'next/link'
import Image from 'next/image'
import  LoadingPost  from "@/app/components/LoadingPost"
import toast, { Toaster } from "react-hot-toast";
import Page404 from "@/app/components/404"

export default function FollowUser(data: any) {

const [follower, setFollower] = useState([null])
const [checkfollow, setCheckfollow] = useState<Array<{ userId: any, followId: any }>>([]);
const [checked, setChecked] = useState("");
const userId = data.id

//Pganegation
const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(1);

useEffect(() => {
    FetchId(data.id)
    getFollower(page, userId);
},[page])

if(checked === null){
  return (
    <Page404 />
  )
}

const FetchId = async(id: any) => {
  const response = await fetch(`/api/getId?Id=${id}`);
  const data = await response.json();
  setChecked(data.checkId)
}

const getFollower = async(page: number, userId: any) => {
    const response = await fetch(`/api/getFollower?page=${page}&userId=${userId}`);
    const User = await response.json();
    setFollower(User.follower)
    setCheckfollow(User.follow)
    const count = Math.ceil(User.count / pageItem);
    if(count < 0){
      setPageCount(count);
    } else {
      setPageCount(1)
    }
}

  if (follower[0] === null) {
    return <LoadingPost />; // ローディング画面を表示
  }

  //フォロー
  const handleFollow = async(followName: any, followId: any, e: any) => {
    e.preventDefault()
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
  const handleCancelFollow = async (userId: any, followId: any, e: any) => {
    e.preventDefault()
    await fetch(`/api/InputFollow?userId=${userId}&followId=${followId}`, {
      method: 'DELETE'
    });
    getFollower(page, userId)
    toast.success("フォローを解除しました", { id: "1" });
  }

  return (
    <>
    <Toaster />
    {/* 1記事 */}
    {
    follower.length != 0 ?
    follower.map((item: any) => (
        <Link href={`/profile/${item.userId}`} key={item.id}>
        <div className='border-color rounded mt-3 bg-white flex justify-start items-center flex-col'>
          <div className='flex w-[95%] my-3'>
            <Image src={item.user.image} width={55} height={55} alt="" className='w-[55px] h-[55px] rounded-full border-color'/>
            <div className='flex justify-center w-full items-center flex-col text-left'>
              <div className='flex justify-start items-center w-[95%]'>
                <div className='w-[95%] font-bold mb-1 text-md'>{item.username}</div>
                { checkfollow?.some(follow => follow.followId === item.userId) ?
                <button onClick={(e) => {handleCancelFollow(userId, item.userId, e)}} className='border-color bg-color text-color px-2 py-1 rounded text-xs'>
                  フォローを解除する
                </button>
                :
                <div>
                  <button onClick={(e) => {handleFollow(item.username,item.userId, e)}} className='border-color bg-color text-color px-2 py-1 rounded text-xs'>
                  フォローする
                </button>
                </div>
              }
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))
  :
  <div className='flex justify-center items-center mt-3'>
    <div>フォローされたユーザーがいません</div>
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