"use client"
import Header from "@/app/compornents/Header"
import Select  from '@/app/compornents/Select'
import MenuBar from "@/app/compornents/MenuBar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const IndexPage = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect("/login")
    },
  })
 
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

export default IndexPage