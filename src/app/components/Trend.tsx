import Link from 'next/link'
import React from 'react'

export default function Trend() {
  return (
    <>
    <div className='flex flex-col items-start justify-start w-full px-2'>
        <h2 className='mt-3 mb-2 text-lg'>
            トレンド
        </h2>
        <ul className='break-words w-full'>
            {/* 10件まで */}
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>1. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>2. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>3. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>4. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>5. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>6. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>7. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>8. #Lorem, ipsum.</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>9. #aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
            </Link>
            <Link href="">
                <li className='text-lg mb-3 font-bold border-b-2'>10. #Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, id!</li>
            </Link>
        </ul>
    </div>
    </>
  )
}