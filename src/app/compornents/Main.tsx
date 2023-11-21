"use client"
import Header from "@/app/compornents/Header"
import Select  from '@/app/compornents/Select'
import MenuBar from "@/app/compornents/MenuBar"
import React, { useEffect } from 'react'

export default async function Main(email: any){
  useEffect(() => {
    geUserData()
  },[])
  const geUserData = async() => {
    const response = await fetch(`api/getUserData`);
    const data = await response.json()
    console.log(data)
  }
  return (
    <>
    <div className="relative flex justify-center items-center w-full">
      <div className="w-[100%] flex justify-center items-center flex-col md:w-[80%] xl:w-[1025px]">
        <Header />
        <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-start">
          <MenuBar />
          <Select/>
        </div>
      </div>
    </div>
    </>
  )
}