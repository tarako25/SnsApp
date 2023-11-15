"use client"
import Header from "@/app/compornents/Header"
import Select  from '@/app/compornents/Select'
import MenuBar from "@/app/compornents/MenuBar"
const IndexPage = () => {

  return (
    <>
    <div className="w-[100%] flex justify-center items-center flex-col md:w-[80%] xl:w-[1025px]">
      <Header />
      <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-start">
        <MenuBar />
        <Select />
      </div>
    </div>
    </>
  )
}

export default IndexPage