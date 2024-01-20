import React from 'react'
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Link from 'next/link';

export default function Weather() {
  return (
    <>
    <div className='flex flex-col items-center justify-center w-full px-2 bg-white rounded-md border-color'>
        <div className='flex flex-col items-start justify-start w-11/12'>
        <h2 className='mt-3 mb-1 text-lg font-bold'>
            本日の天気
        </h2>
        {/* 設定で県名が登録されていない場合は設定するを表示 */}
        <div className='flex mb-2 w-full items-center'>
            <div className='text-lg'>東京</div>
            <div className='mx-5 flex items-center'>
                {/* 最高気温 */}
                <div className='text-xl font-bold text-red-400'>29°</div>
                <div className='mx-1'>/</div>
                {/* 最低気温 */}
                <div className='text-xl font-bold text-blue-400'>29°</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <CloudIcon className='text-gray-200 w-[35px] h-[35px]'/>
                <div>30%</div>
            </div>
            <div className='mx-5 text-xl text-gray-400'>ー</div>
            <div className='flex flex-col justify-center items-center'>
                <WbSunnyIcon className='text-red-400 w-[35px] h-[35px]'/>
                <div>50%</div>
            </div>
        </div>
        {/* <div className='flex my-3 border-b-2 pb-1'>
            <Link href="" className='font-bold'>設定</Link>
            <div>
                から都道府県を選択すると表示されます
            </div>
        </div> */}
        </div>
    </div>
    </>
  )
}