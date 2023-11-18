import React from 'react'
import SignIn from "@/app/compornents/SignIn"
import Header from "@/app/compornents/Header"

function page() {
  return (
    <>
    <div className="relative flex justify-center items-center w-full">
      <div className="w-[100%] flex justify-center items-center flex-col md:w-[80%] xl:w-[1025px]">
        <div className="absolute bg-black w-full bg-opacity-40 top-0">
        <SignIn />
      </div>
      </div>
    </div>
    </>
  )
}

export default page