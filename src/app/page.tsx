import Header from "@/app/compornents/Header"
import Select  from '@/app/compornents/Select'
import MenuBar from "@/app/compornents/MenuBar"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/AuthOption"
import { redirect } from "next/navigation";

const IndexPage = async() => {
  const session = await getServerSession(authOptions)
  if(!session) {
    redirect("/login")
  }
  return (
    <>
    <div className="relative flex justify-center items-center">
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