"use client"
import React from 'react'
import Link from 'next/link'

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";

export default function MenuBar(data: any) {

  const MenuElements = [
    {
        MenuName: "ホーム",
        link: "/",
        icon:<HomeIcon />,
        class:"default",
    },
    {
        MenuName: "プロフィール",
        link: `/profile/${data.userId}`,
        icon:<PersonIcon />,
        class:"default",
    },
    {
      MenuName: "フォロー",
      link: `/follow/${data.userId}`,
      icon:<PersonIcon />,
      class:"default",
  },
    {
        MenuName: "Goodした投稿",
        link: `/good/${data.userId}`,
        icon:<FavoriteIcon />,
        class:"default",
    },
    {
        MenuName: "メッセージ",
        link: "/directMessage",
        icon:<MailOutlineIcon />,
        class:"default",
        id:"true"
    },
    // {
    //     MenuName: "アカウント設定",
    //     link: "/setting",
    //     icon:<ManageAccountsIcon />,
    //     class:"default",
    // },
]

  return (
    <>
      <div className='w-[100%] md:w-[25%] xl:w-[20%] flex'>
        <div className='rounded w-[100%] flex justify-start flex-row md:flex-col'>
          <div className='w-[100%] flex-row flex justify-between md:flex-col pb-2 md:pb-0'>
            {MenuElements.map((items, index) =>
              <Link href={items.link} key={index} className={`px-2 cursor-pointer flex justify-center items-center h-[45px] rounded-md text-color border-color bg-color  md:h-[55px] md:mb-3 w-[20%] md:w-[100%] md:flex ${items.class === 'none' ? 'hidden' : ''}`}>
                <div className='mr-2'>{items.icon}</div>
                <div className='w-full text-left font-bold tracking-[3px] hidden md:block'>{items.MenuName}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
