"use client"
import React from 'react'
import SignIn from "@/app/components/SignIn"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

function Loginpage() {
    const { data: session } = useSession()
    if(session) {
        redirect("/")
    }
  return (
    <>
    <div className="relative flex justify-center items-center w-full">
      <div className="w-[100%] flex justify-center items-center flex-col md:w-[80%] xl:w-[1025px]">
        <SignIn />
        <div>NEXTAUTH_URL: {process.env.NEXTAUTH_URL}</div>
        <div>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET}</div>
        <div>GITHUB_CLIENT_ID: {process.env.GITHUB_CLIENT_ID}</div>
        <div>GITHUB_CLIENT_SECRET: {process.env.GITHUB_CLIENT_SECRET}</div>
        <div>GOOGLE_CLIENT_ID: {process.env.GOOGLE_CLIENT_ID}</div>
        <div>GOOGLE_CLIENT_SECRET: {process.env.GOOGLE_CLIENT_SECRET}</div>
        <div>DATABASE_URL: {process.env.DATABASE_URL}</div>
      </div>
    </div>
    </>
  )
}

export default Loginpage