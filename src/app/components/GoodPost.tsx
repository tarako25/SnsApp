"use client"
import React, { useState, useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { pageItem } from "@/lib/PageItem"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import sample from '@/imgs/sample2.png'
import Link from 'next/link'
import Image from 'next/image'
import  LoadingPost  from "@/app/components/LoadingPost"
import ChatIcon from "@mui/icons-material/Chat";
import Page404 from "@/app/components/404"
import ph  from "@/app/components/ParseHashtags"

export default function GoodPost(data: any) {

  const [post, setPost] = useState([null])
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [checked, setChecked] = useState("");

  //Pganegation
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    FetchId(data.id)
    getGoodPost(page, data.id);
    setUserId(data.id)
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

  const getGoodPost = async(page: number, userId: any) => {
    const response = await fetch(`/api/getGoodPost?page=${page}&userId=${userId}`);
    const Post = await response.json();
    setPost(Post.data)
    const count = Math.ceil(Post.count / pageItem);
    if(count > 0){
      setPageCount(count);
    } else {
      setPageCount(1)
    }
  }

  if (post[0] === null) {
    return <LoadingPost />; // ローディング画面を表示
  }

  //Good押したときの処理
  const handleGood = async(e: any, postId: any) => {
    e.preventDefault();
    const PostData = {
      postId,
      userId:data.userId,
    };
    const response = await fetch("/api/InputGood",{
      body: JSON.stringify(PostData),
      method: "POST",
    });
    if (!response.ok) {
      //log
    }
    getGoodPost(page, userId)
  }

  //Goodキャンセルしたときの処理
  const handleCancelGood = async(e: any, postId: any) => {
    e.preventDefault();
    const PostData = {
      postId,
      userId:data.userId,
    };
    const response = await fetch("/api/InputGood",{
      body: JSON.stringify(PostData),
      method: "PUT",
    });
    if (!response.ok) {
      //log
    }
    getGoodPost(page, userId)
  }

  return (
    <>
     {/* 1記事 */}
    {
    post.length != 0 ?
    post.map((item: any) => (
      <Link href={`/${item.id}`} key={item.id}>
      <div className='border-color rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Image src={item.user.image} width={55} height={55} alt="" className='w-[55px] h-[55px] rounded-full border-color'/>
          <div className='flex justify-center w-[90%] items-center flex-col text-left break-words'>
            <div className='flex justify-start items-center w-[95%]'>
              <div className='w-[95%] font-bold mb-1 text-md'>{item.username}</div>
              <div className='w-[95%] text-md flex justify-end'>{new Date(item.createdAt).toLocaleString()}</div>
            </div>
            <div className='w-[95%] text-sm md:text-base'>
            {ph(item.content)}
            </div>
            <div className='w-[95%] flex my-2'>
              <div className='mr-5'>
                {/*既にGoodが押されているかのチェック */}
                {item.good.some(
                  (goodItem: any) => goodItem.userId === data.userId
                ) ? (
                  <button onClick={(e) => handleCancelGood(e, item.id)}>
                    <FavoriteIcon className='text-[20px]'/>
                    {item.goodCount}
                  </button>
                ) : (
                  <button onClick={(e) => handleGood(e, item.id)}>
                    <FavoriteBorderIcon className='text-[20px]'/>
                    {item.goodCount}
                  </button>
                )}
              </div>
              <div className='mr-5'>
                <ChatIcon className='mr-1'/>
                {item.postCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
    ))
    :
    <div className='flex justify-center items-center mt-3'>
      <div>Goodした投稿がありません</div>
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
