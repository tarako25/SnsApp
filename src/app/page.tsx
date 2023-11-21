import Main from "@/app/compornents/Main"
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
    <Main email={session.user?.email}/>
    </>
  )
}

export default IndexPage