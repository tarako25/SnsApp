"use client"
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export default function page() {
    const { data: session } = useSession()
    if(session){
        redirect("./");
    } else {
        signIn();
    }
  return (
    <>
    </>
  )
}