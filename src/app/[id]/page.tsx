"use client"
import Header from "@/app/components/Header"
import PostDetail  from '@/app/components/PostDetail'
import MenuBar from "@/app/components/MenuBar"
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
  const [userId, setUserId] = useState(null);
  const [userName, setUsername] = useState(null);

  useEffect(() => {
    if(session){
      const email = session.user?.email
      getUserData(email)
    }
  },[session])
  const getUserData = async(email: any) => {
    const response = await fetch(`api/getUserData?email=${email}`);
    const userData = await response.json();
    setUserId(userData.user.id)
    setUsername(userData.user.name)
  }
  return (
    <>
    <div className="relative flex justify-center items-center w-full">
      <div className="w-[100%] flex justify-center items-center flex-col sm:w-[70%] md:w-[80%] xl:w-[800px]">
        <Header />
        <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-start">
          <MenuBar userId={userId} userName={userName}/>
          <PostDetail userId={userId} userName={userName}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default IndexPage