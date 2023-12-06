"use client"
import { useEffect, useState } from "react"
import sample from '@/imgs/sample2.png'
import Image from 'next/image'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Link from 'next/link';
import ToPost from "@/app/components/ToPost"
import LoadingPostDetail from "@/app/components/LoadingPostDetail"
import ChatIcon from "@mui/icons-material/Chat";

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
}

export default function PostDetail(data: any) {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const postIdUrl = location.pathname.slice(1);
    const postId = postIdUrl.split("/")[0];
    getPostDetail(postId)
  },[])

  const getPostDetail = async(postId: any) => {
    const response = await fetch(`api/getPostDetail?postId=${postId}`);
    const Post = await response.json();
    setPost(Post.data)
  }

  if(post == null){
    return (
    <>
    <LoadingPostDetail />
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
    <div className='normal border-4 w-[100%] rounded-md border-neutral-400 md:w-[70%]'>
      <div className='w-full pb-3 rounded-sm normal flex justify-center'>
        <div className='w-[95%]'>
          <Link href="/">
            <div className='mt-3 text-white'>
              <ArrowLeftIcon /> 投稿
            </div>
          </Link>
          <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
              {/* 記事詳細 */}
              <div className='flex w-[95%] mt-3'>
                    <Image src={sample} alt="" className='w-[55px] h-[55px] rounded-full border-2 border-zinc-400'/>
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
              </div>
          </div>
          <ToPost userId={data.userId} userName={data.userName} getPostDetail={getPostDetail}/>
        </div>
      </div>
    </div>
  </>
  )
}
