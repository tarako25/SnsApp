"use client"
import Header from "@/app/compornents/Header"
import Select  from '@/app/compornents/Select'
import MenuBar from "@/app/compornents/MenuBar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

const IndexPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect("/login")
    },
  })
  const [userId, setUserId] = useState<string | null | undefined>(null);
  const [userName, setUsername] = useState<string | null | undefined>(null);
  useEffect(()=>{
      if(session){
        setUserId(session.user ? session.user.id : null)
       setUsername(session.user ? session.user.name : null)
      }
  },[session])

  console.log()
  return (
    <>
    {<div className="relative flex justify-center items-center w-full">
      <div className="w-[100%] flex justify-center items-center flex-col sm:w-[70%] md:w-[80%] xl:w-[800px]">
        <Header />
        <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-start">
          <MenuBar userId={userId} userName={userName}/>
          <Select userId={userId} userName={userName}/>
        </div>
      </div>
    </div>}
    </>
  )
}

export default IndexPage