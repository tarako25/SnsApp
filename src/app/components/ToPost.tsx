"use client"
import React, { useState, useEffect } from 'react'
import Pagination from "@mui/material/Pagination";
import { pageItem } from "@/lib/PageItem"
import InputPost from "@/app/components/InputPost"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import sample from '@/imgs/sample2.png'
import Link from 'next/link'
import Image from 'next/image'
import ChatIcon from "@mui/icons-material/Chat";

export default function ToPost(data: any) {

  const [post, setPost] = useState([])
  const [postid, setPostId] = useState("")
  //Pganegation
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const postIdUrl = location.pathname.slice(1);
    const postId = postIdUrl.split("/")[0];
    getToPost(page, postId);
    setPostId(postId)
  },[page])

  const getToPost = async(page: number, postId: any) => {
    const response = await fetch(`api/getToPost?page=${page}&postId=${postId}`);
    const Post = await response.json();
    setPost(Post.data)
    const count = Math.ceil(Post.count / pageItem);
    setPageCount(count);
  }

  //Good押したときの処理
  const handleGood = async(e: any, postId: any) => {
    e.preventDefault();
    const PostData = {
      postId,
      userId:data.userId,
    };
    const response = await fetch("api/InputGood",{
      body: JSON.stringify(PostData),
      method: "POST",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    getToPost(page, postid)
  }

  //Goodキャンセルしたときの処理
  const handleCancelGood = async(e: any, postId: any) => {
    e.preventDefault();
    const PostData = {
      postId,
      userId:data.userId,
    };
    const response = await fetch("api/InputGood",{
      body: JSON.stringify(PostData),
      method: "PUT",
    });
    if (!response.ok) {
      console.error("HTTPエラー:", response.statusText);
    }
    getToPost(page, postid)
  }

  return (
    <>
    <InputPost userId={data.userId} userName={data.userName} To={postid} page={page} getToPost={getToPost} getPostDetail={data.getPostDetail}/>
     {/* 1記事 */}
    {post.map((item: any) => (
      <Link href={item.id} key={item.id}>
      <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
        <div className='flex w-[95%] mt-3'>
          <Image src={sample} alt="" className='w-[55px] h-[55px] rounded-full border-2 border-zinc-400'/>
          <div className='flex justify-center w-full items-center flex-col text-left'>
            <div className='flex justify-start items-center w-[95%]'>
              <div className='w-[95%] font-bold mb-1 text-md'>{item.username}</div>
              <div className='w-[95%] text-md flex justify-end'>{new Date(item.createdAt).toLocaleString()}</div>
            </div>
            <div className='w-[95%] text-sm md:text-base'>
            {item.content}
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
