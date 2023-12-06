import React, { use, useEffect, useState } from 'react'
import sample from '@/imgs/sample2.png'
import Image from 'next/image'
import LoadingPost  from "@/app/components/LoadingPost"
import toast, { Toaster } from "react-hot-toast";
import ProfilePost from "@/app/components/ProfilePost"

type ProfileData = {
  name: string;
  id: string;
  followCount: number;
  followerCount: number;
  introduction: string;
}

export default function Profile(data: any) {
  
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [checkfollow, setCheckfollow] = useState(null);
  useEffect(() => {
    if(data.userId){
      const userIdUrl = location.pathname.slice(1);
      const userId = userIdUrl.split("/").pop();
      getProfileData(userId)
      setUserId(userId)
    }
  },[data])
const getProfileData = async(userId:any) => {
  const response = await fetch(`/api/getProfileData?userId=${userId}`)
  const data = await response.json();
  setProfileData(data.user)
  console.log(data.user)
  setUserName(data.user.name)
  setCheckfollow(data.follow)
}
if (profileData === null) {
  return <LoadingPost />; // ローディング画面を表示
} 
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
    getProfileData(userId)
    toast.success("フォローしました", { id: "1" });
  }

  const handleCancelFollow = async (checkfollow: any) => {
    const id = checkfollow?.id;
    await fetch(`/api/InputFollow?Id=${id}&followId=${userId}`, {
      method: 'DELETE'
    });
    getProfileData(userId)
    toast.success("フォローを解除しました", { id: "1" });
  }

  return (
    <>
    <Toaster />
      <div className='mt-3 text-white'>
      プロフィール
      </div>
        <div className='border-2  border-zinc-300 rounded mt-3 bg-white flex justify-start items-center flex-col'>
            <div className='flex w-[95%] mt-3 flex-col'>
              <Image src={sample} alt="" width={75} className='border-2 border-gray-300 w-[75px] h-[75px] rounded-full'/>
              <div className='flex justify-between items-start mt-3'>
                <div>
                  <div>
                    {profileData?.name}
                  </div>
                  <div>
                    @{profileData?.id}
                  </div>
                </div>
                <div className='flex flex-col'>
                  {/* ログイン中のidとurlのidが等しいとき */}
                  {data.userId === userId ? 
                    <button className='border-gray-300 border-2 p-2 rounded'>
                      プロフィールを編集する
                    </button>
                    : 
                    !checkfollow ? 
                    <button onClick={() => {handleFollow(userName,userId)}} className='border-gray-300 border-2 p-2 rounded'>
                      フォローする
                    </button>
                    :
                    <button onClick={() => {handleCancelFollow(checkfollow)}} className='border-gray-300 border-2 p-2 rounded'>
                      フォローを解除する
                    </button>
                  }
                </div>
              </div>
              <div className='mt-3 flex'>
                <div className='mr-2'>
                  フォロー {profileData?.followCount}
                </div>
                <div className='mr-2'>
                  フォロワー {profileData?.followerCount}
                </div>
              </div>
              <div className='mt-3'>
              {profileData?.introduction}
              </div>
            </div>
          </div>
          <ProfilePost userId={data.userId} userName={data.userName}/>
    </>
  )
}
