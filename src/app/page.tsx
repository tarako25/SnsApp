"use client"
import Header from "@/app/compornents/Header"
import Main from "@/app/compornents/Main"
import MenuBar from "@/app/compornents/MenuBar"
const IndexPage = () => {

  return (
    <>
    <div className="w-[100%] flex justify-center items-center flex-col xl:w-[1025px]">
      <Header />
      <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-start">
        <MenuBar />
        <Main />
      </div>
    </div>
    </>
  )
}

export default IndexPage