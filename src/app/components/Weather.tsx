import React from 'react'
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export default function Weather() {
  return (
    <>
    <div className='flex flex-col items-start justify-start w-full px-2'>
        <h2 className='mt-3 mb-2 text-lg'>
            本日の天気
        </h2>
        <div className='flex mb-2 w-full items-center'>
            <div className='text-lg font-bold mr-10'>東京</div>
            <div><CloudIcon className='text-gray-200 w-[40px] h-[40px]'/></div>
            <div className='mx-4'><TrendingFlatIcon className='text-gray-500'/></div>
            <div><WbSunnyIcon className='text-red-300 w-[40px] h-[40px]'/></div>
        </div>
    </div>
    </>
  )
}