import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Trend() {
    const [trend, setTrend] = useState([])

    useEffect(() => {
        getTrend()
    },[])
    const getTrend = async() => {
        const response = await fetch(`/api/getTrend`);
        const data = await response.json();
        setTrend(data.Trends)
      }
  return (
    <>
    <div className='flex flex-col items-center justify-center w-full px-2  border-color bg-white rounded-md mb-3'>
        <div className='w-11/12 flex flex-col items-start justify-start'>
            <h2 className='mt-3 mb-2 text-base font-bold'>
                トレンド
            </h2>
            <ul className='break-words w-full'>
                {/* 10件まで */}
                {trend.map((element: any) => (
                    <Link href={`/search?keyword=${encodeURIComponent(element.tag)}`} key={element}>
                        <li className='text-base mb-3 font-bold border-b-2'>{element.tag}<span className='ml-3 text-xs'>投稿数{element.count}</span></li>
                    </Link>
                ))}
            </ul>
        </div>
    </div>
    </>
  )
}