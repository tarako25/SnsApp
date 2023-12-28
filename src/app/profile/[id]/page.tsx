"use client"
import Header from "@/app/components/Header"
import Profile  from '@/app/components/Profile'
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

const IndexPage = ({ params }: { params: { id: string } }) => {

  
  const [userId, setUserId] = useState<string | null | undefined>(null);
  const [userName, setUsername] = useState<string | null | undefined>(null);

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
  }, [session]);

  return (
    <>
    <div className="relative flex justify-center items-center w-full flex-col">
      <Header userId={userId} userName={userName}/>
      <div className="w-[95%] flex justify-center items-center flex-col sm:w-[70%] md:w-[75%] xl:w-[1200px]">
        <div className="flex mt-0 flex-col items-center justify-between w-full md:flex-row md:items-start sm:mt-5">
          <MenuBar userId={userId} userName={userName}/>
          <div className="flex justify-center items-start flex-col w-[100%] rounded-md md:w-[70%] xl:w-[45%]">
            <div className=' text-black font-bold'>
              プロフィール
            </div>
            <div className="w-full">
              <Profile userId={userId} userName={userName} id={params.id}/>
            </div>
          </div>
          <SideBar userId={userId} userName={userName} />
        </div>
      </div>
    </div>
    </>
  )
}

export default IndexPage