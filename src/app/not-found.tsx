"use client"
import Header from "@/app/components/Header"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
};

export default function Page404() {

  
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
        <div className='flex justify-center items-center flex-col w-full h-full pt-10'>
            <h1 className='font-bold text-4xl mb-3'>404</h1>
            <p className='text-2xl'>ページが見つかりません</p>
        </div>
    </div>
    </>
  )
}
