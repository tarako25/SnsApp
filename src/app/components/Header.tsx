"use client"
import Image from 'next/image'
import Logo from '@/imgs/logo.png'
import sample from '@/imgs/sample2.png'
import Link from 'next/link'

export default function Header(data: any) {

  return (
    <>
      <div className='p-3 w-full flex justify-center items-center bg-white'>
      <div className="w-[95%] flex justify-center items-center flex-col sm:w-[70%] md:w-[75%] xl:w-[1200px]">
        <div className='flex justify-center items-center w-full'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/">
              <Image src={Logo} className='w-[120px] h-[50px] md:w-[150px] md:h-[70px]' alt="Logo"/>
            </Link>
              {data.img || data.userName ?
              <div className='flex justify-center items-center'>
                <Image src={data.img} width={50} height={50} alt="" className='w-[50px] h-[50px] rounded-full' />
                <div className='ml-3 font-bold bg-color text-color py-1 px-1 rounded'><Link href={`/profile/${data.userId}`}>{data.userName}</Link></div>
              </div>
              :
              <div className='flex justify-center items-center'>
                <div className='w-[50px] h-[50px] rounded-full bg-gray-100' />
                <div className='ml-3 font-bold w-[70px] h-[20px] rounded bg-gray-100'></div>
              </div>
              }
          </div>
        </div>
        </div>
      </div>
    </>
  )
}