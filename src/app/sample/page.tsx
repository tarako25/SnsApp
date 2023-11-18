"use client"
import React from 'react'
import Header from "@/app/compornents/Header"
import MenuBar from "@/app/compornents/MenuBar"
import SignIn from "@/app/compornents/SignIn"
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react"
import Select  from '@/app/compornents/Select'
export default function page() {
    const { data: session } = useSession()
      if (session === null) {
      redirect("/");
      }
  return (
    <>
    <div className="relative flex justify-center items-center">
      <div className="w-[100%] flex justify-center items-center flex-col md:w-[80%] xl:w-[1025px]">
        <Header />
        <div>開発用検証ページ</div>
        <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-start">
          <MenuBar />
          <Select />
        </div>
      </div>
      {session === null ? 
      <div className="absolute bg-black w-full bg-opacity-40 top-0">
        <SignIn />
      </div>
      :
      ""
      }
    </div>
    </>
  )
}
