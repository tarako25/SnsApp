"use client"
import { useEffect, useState } from "react"
import sample from '@/imgs/sample2.png'
import Image from 'next/image'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from 'next/link';
import ToPost from "@/app/components/ToPost"
import LoadingPost from "@/app/components/LoadingPost"
import ChatIcon from "@mui/icons-material/Chat";
import Page404 from "@/app/components/404"

interface PostType {
  id: string;
  To: string | null;
  userId: string;
  username: string;
  image: string | null;
  content: string;
  createdAt: string;
  goodCount: number;
  postCount: number;
  good: []
  user: {
    image: string;
  }
}

export default function PostDetail(data: any) {
  const [post, setPost] = useState<PostType | null>(null);
  const [checked, setChecked] = useState("");

  useEffect(() => {
    FetchId(data.id)
    getPostDetail(data.id)
  },[])

  if(checked === null){
    return (
      <Page404 />
    )
  }

  const FetchId = async(id: any) => {
    const response = await fetch(`api/getPostId?Id=${id}`);
    const data = await response.json();
    setChecked(data.checkId)
  }

  const getPostDetail = async(postId: any) => {
    const response = await fetch(`api/getPostDetail?postId=${postId}`);
    const Post = await response.json();
    setPost(Post.data)
  }

  if(post == null){
    return (
    <>
    <LoadingPost />
    </>
    )
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
    getPostDetail(postId)
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
    getPostDetail(postId)
  }

  return (
    <>
      <Link href="/">
        <div className='mt-3 text-black font-bold'>
          <ArrowLeftIcon /> 投稿
        </div>
      </Link>
      <div className='border-color rounded mt-3 bg-white flex justify-start items-center flex-col'>
          {/* 記事詳細 */}
          <Link href={`/profile/${post.userId}`} className='flex w-[95%] mt-3'>
                <Image src={post?.user.image} width={55} height={55} alt="" className='w-[55px] h-[55px] rounded-full border-color'/>
                <div className='flex justify-center w-full items-center flex-col text-left'>
                    <div className='flex justify-start items-center w-[95%]'>
                    <div className='w-[95%] font-bold mt-2 mb-5 text-[18px]'>{post?.username}</div>
                    <div className='w-[95%] text-md flex justify-end'> {post?.createdAt && new Date(post?.createdAt).toLocaleString()}</div>
                    </div>
                    <div className='w-[95%] text-base'>
                    {post?.content}
                    </div>
                    <div className='w-[95%] flex my-3'>
                        <div className='mr-5'>
                            {/*既にGoodが押されているかのチェック */}
                            {post?.good.some(
                            (goodItem: any) => goodItem.userId === data.userId
                            ) ? (
                            <button onClick={(e) => handleCancelGood(e, post.id)}>
                                <FavoriteIcon className='text-[20px]'/>
                                {post.goodCount}
                            </button>
                            ) : (
                            <button onClick={(e) => handleGood(e, post?.id)}>
                                <FavoriteBorderIcon className='text-[20px]'/>
                                {post?.goodCount}
                            </button>
                            )}
                          </div>
                          <div className='mr-5'>
                            <ChatIcon className='mr-1'/>
                            {post?.postCount}
                          </div>
                        </div>
                  </div>
          </Link>
      </div>
      <ToPost userId={data.userId} userName={data.userName} getPostDetail={getPostDetail} id={data.id} img={data.img}/>
  </>
  )
}
