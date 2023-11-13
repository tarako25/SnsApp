"use client"
import Header from "@/app/compornents/Header"
import Main from "@/app/compornents/Main"
import MenuBar from "@/app/compornents/MenuBar"
const IndexPage = () => {

  return (
    <>
    <div className="w-[80%] flex justify-center items-center flex-col xl:w-[1025px]">
      <Header />
      <div className="flex justify-between w-full ">
        <MenuBar />
        <Main />
      </div>
    </div>
    </>
  )
}

export default IndexPage