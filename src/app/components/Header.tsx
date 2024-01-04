"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Logo from '@/imgs/logo.png'
import sample from '@/imgs/sample2.png'
import Link from 'next/link'

export default function Header(data: any) {

  let user;
  const [userData, setUserData] = useState(sessionStorage.getItem('user'))
  console.log(userData)
  const getUserData = async(id: any) => {
    const cachedUser = sessionStorage.getItem('user');
    if (cachedUser) {
      user = JSON.parse(cachedUser);
    } else {
      const response = await fetch(`api/getUserData?Id=${id}`);
      const Data = await response.json();
      user = Data.user;
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    setUserData(user);
  }

  useEffect(() => {
    if(data.userId){
      getUserData(data.userId)
    }
  },[data.userName,data.img])
  return (
    <>
      <div className='p-3 w-full flex justify-center items-center bg-white'>
      <div className="w-[95%] flex justify-center items-center flex-col sm:w-[70%] md:w-[75%] xl:w-[1200px]">
        <div className='flex justify-center items-center w-full'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/">
              <Image src={Logo} className='w-[120px] h-[50px] md:w-[150px] md:h-[70px]' alt="Logo"/>
            </Link>
              {userData ?
              <div className='flex justify-center items-center'>
                <Image src={userData.image} width={50} height={50} alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='ml-3 font-bold bg-color text-color py-1 px-2 rounded'><Link href={`/profile/${data.userId}`}>{userData.name}</Link></div>
              </div>
              :
              <div className='flex justify-center items-center'>
                <Image src={sample} alt="" width={50} height={50} className='w-[50px] h-[50px] rounded-full' />
                <div className='ml-3 font-bold w-[50px]'></div>
              </div>
              }
          </div>
        </div>
        </div>
      </div>
    </>
  )
}