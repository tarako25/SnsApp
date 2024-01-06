"use client"
import Header from "@/app/components/Header"
import Select  from '@/app/components/Select'
import MenuBar from "@/app/components/MenuBar"
import SideBar from "@/app/components/SideBar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
};

const IndexPage = () => {

  
  const [userId, setUserId] = useState<string | null | undefined>(null);
  const [userName, setUsername] = useState<string | null | undefined>(null);
  const [img, setImg] = useState<string | null | undefined>(null);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect("/login")
    },
  })
  useEffect(() => {
    const user: User | null | undefined = session ? session.user : null;
    setUserId(user ? user.id : null);
    setUsername(user ? user.name : null);
    setImg(user ? user.image : null);
  }, [session]);

  return (
    <>
    <div className="relative flex justify-center items-center w-full flex-col">
      <Header userId={userId} userName={userName} img={img}/>
      <div className="w-[95%] flex justify-center items-center flex-col sm:w-[70%] md:w-[75%] xl:w-[1200px]">
        <div className="flex mt-0 flex-col items-center justify-between w-full md:flex-row md:items-start sm:mt-5">
          <MenuBar userId={userId} userName={userName}/>
          <Select userId={userId} userName={userName} img={img}/>
          <SideBar userId={userId} userName={userName} />
        </div>
      </div>
    </div>
    </>
  )
}

export default IndexPage