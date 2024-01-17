"use client";
import sample from '@/imgs/sample2.png'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import  LoadingPost  from "@/app/components/LoadingPost"
export default function DirectMessage(userData: any) {

    const { mutate } = useSWRConfig();
    const [targetId, setTargetid] = useState<string | null>()
    const [userdata, setUserdata] = useState<{
        id: string;
        name: string;
        image: string;
        delete_flg: number;
      }>({
        id: "",
        name: "",
        image: "",
        delete_flg: 0,
      });
      const [targetdata, setTargetdata] = useState<{
        id: string;
        name: string;
        image: string;
        delete_flg: number;
      }>({
        id: "",
        name: "",
        image: "",
        delete_flg: 0,
      });

      //メッセージ取得
    const { data, error } = useSWR(
        `/api/getDirectMessage?targetId=${targetId}`,
        async () => {
          const response = await fetch(`/api/getDirectMessage?targetId=${targetId}`);
          const message = await response.json();
          return message;
        },
        { refreshInterval: 1000 }
      );

    useEffect(() => {
        const IdUrl = location.pathname.slice(1);
        const targetId = IdUrl.split("/").pop();
        getUserData(targetId)
        setTargetid(targetId)
        const scroll = document.getElementById("scroll");
        if (scroll) {
        const scrollHeight = scroll?.scrollHeight;
        scroll.style.scrollBehavior = "smooth";
        scroll.scrollTop = scrollHeight;
        }
    },[data])
    
    //ユーザー情報を取得
    const getUserData = async (targetId: any) => {
    const response = await fetch(`/api/getDirectMessageUser?targetId=${targetId}`);
    const data = await response.json();
    setUserdata(data.user);
    setTargetdata(data.targetuser);
  };
  if (error) {
    return <div>ユーザーの取得に失敗しました：{error.message}</div>;
  }

  if (data == undefined || data.err) {
    return <LoadingPost />;
  }

  //メッセージを送信
  const SendMessage = async (e: any) => {
    e.preventDefault();
    const contentEditableElement = e.target.querySelector('[contenteditable]');
    const message = contentEditableElement.innerText
    if (typeof message === 'string' && (message === "" || message.length > 1000)) {
      return;
    }
    const response = await fetch(`/api/getDirectMessage?targetId=${targetId}&targetName=${targetdata.name}`, {
      body: JSON.stringify(message),
      method: "POST",
    });
    contentEditableElement.innerText = ""
    if (!response.ok) {
      //log
    }
    mutate(`/api/getDirectMessage?targetId=${targetId}`);
  };
  return (
    <>
    <div className="mb-5 border-color rounded">
        <div className="h-[60px] w-full rounded-t bg-color-none">
          <div className="items-ceneter flex h-full justify-center">
            <div className="flex items-center font-bold text-white">
              {targetdata.name}
            </div>
          </div>
        </div>
        <div
          className="h-[700px] w-full overflow-y-auto bg-white pb-4"
          id="scroll"
        >
          <div className="flex justify-center ">
            <ul className="w-11/12 text-left">
              {/* メッセージ */}
              {data.data
                .slice()
                .reverse()
                .map((item: any) =>
                  item.userId == userData.userId ? (
                    <li key={item.id} className="mt-6 flex items-center w-full">
                      <div className="mr-3 min-w-[50px] min-h-[50px] overflow-hidden rounded-full border-color">
                        <Image
                          alt="アイコン"
                          src={item.user.image}
                          width={50}
                          height={50}
                          className="min-w-[50px] min-h-[50px]"
                        />
                      </div>
                      <div className="rounded-xl bg-green-300 px-3 py-1 text-base mr-2 max-w-[80%] break-words">
                        {item.content}
                      </div>
                      <div className='text-sm'>
                        {new Date(item.createdAt).toLocaleString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </li>
                  ) : (
                    <li
                      key={item.id}
                      className="mt-6 flex items-center justify-end"
                    >
                      <div className='text-xm'>
                        {new Date(item.createdAt).toLocaleString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="rounded-xl bg-gray-300 px-3 py-1 text-base ml-2 max-w-[80%] break-words">
                        {item.content}
                      </div>
                      <div className="ml-3 min-w-[50px] min-h-[50px] overflow-hidden rounded-full border-color">
                        <Image
                          alt="アイコン"
                          src={item.user.image}
                          width={50}
                          height={50}
                          className="min-w-[50px] min-h-[50px]"
                        />
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
        <form onSubmit={SendMessage} className="flex justify-between  items-end p-3 bg-color-none rounded-b">
            <div contentEditable  className='break-all bg-white placeholder w-4/5 min-h-[45px] p-2 text-sm md:text-base rounded-md border-color flex items-start justify-start'>
            </div>
          <button className="w-1/6 h-[45px] rounded border-color bg-color text-color font-bold">送信</button>
        </form>
      </div>
    </>
  )
}