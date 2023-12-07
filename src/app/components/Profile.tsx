import React, { use, useEffect, useState } from 'react'
import sample from '@/imgs/sample2.png'
import Image from 'next/image'
import LoadingPost  from "@/app/components/LoadingPost"
import toast, { Toaster } from "react-hot-toast";
import ProfilePost from "@/app/components/ProfilePost"
import CloseIcon from '@mui/icons-material/Close';

type ProfileData = {
  name: string;
  id: string;
  followCount: number;
  followerCount: number;
  introduction: string;
}

export default function Profile(data: any) {

  const [isEditModal, setIsEditModal] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [checkfollow, setCheckfollow] = useState(null);
  useEffect(() => {
    document.getElementById("edit")
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

  const openEdit = () => {
    setIsEditModal(!isEditModal);
  }
  return (
    <>
    <div className={isEditModal ? '' : 'hidden'} id="edit">
      <div className=' bg-black w-screen h-screen fixed top-0 left-0 bg-opacity-50 z-10 flex justify-center items-center flex-col'>
        <div className="bg-white w-[450px] h-[550px] rounded">
          <div className='flex items-center flex-col justify-center h-full'>
            <div className='w-[85%] flex items-center flex-col py-7'>
              <div className='flex justify-end w-full px-2'>
                <CloseIcon onClick={openEdit} className='text-gray-400 text-3xl cursor-pointer'/>               
              </div>
              <div className='font-bold text-xl text-gray-500'>
                プロフィール編集
              </div>
              <div className='w-[120px] h-[120px] border-gray-300 rounded-[80%] border mt-5'>
              </div>
              <form action="" className='flex items-left justify-center flex-col w-[85%]'>
                <label className="mt-1" htmlFor="username">ユーザー名</label>
                <input placeholder="ユーザー名(10文字以内)" type="text" id="username" className='border border-gray-300 w-full h-[40px] rounded px-2'></input>
                <label className="mt-3" htmlFor="introduction">自己紹介</label>
                <textarea placeholder="趣味や好きな事をかいて友達に知らせよう!" id="introduction" className='border border-gray-300 w-full h-[100px] max-h-[150px] rounded px-2'></textarea>
              </form>
              <button className='border border-gray-300 w-[100px] h-[40px] mt-5 rounded'>保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                    <button onClick={openEdit} className='border-gray-300 border-2 p-2 rounded'>
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
          <div className='border border-gray mt-3'></div>
          <ProfilePost userId={data.userId} userName={data.userName} profileUserId={profileData?.id}/>
    </>
  )
}
