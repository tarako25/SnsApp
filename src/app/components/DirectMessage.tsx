"use client";
import sample from '@/imgs/sample2.png'
import Image from 'next/image'
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

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
  console.log(data)
  if (error) {
    return <div>ユーザーの取得に失敗しました：{error.message}</div>;
  }

  if (data == undefined || data.err) {
    return <div>ユーザーの読み込み中...</div>;
  }

  //メッセージを送信
  const SendMessage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("message"))
    if(formData.get("message") == ""){
        return
    }
    const response = await fetch(`/api/getDirectMessage?targetId=${targetId}&targetName=${targetdata.name}`, {
      body: formData,
      method: "POST",
    });
    e.target.reset();
    if (!response.ok) {
      console.log("ロード中にエラーが発生しました");
    }
    mutate(`/api/getDirectMessage?targetId=${targetId}`);
  };

  return (
    <>
    <div className="my-5">
        <div className="text h-[60px] w-full rounded-t bg-gray-200">
          <div className="items-ceneter flex h-full justify-center">
            <div className="flex items-center font-bold">
              {targetdata.name}
            </div>
          </div>
        </div>
        <div
          className="mb-2 h-[700px] w-full overflow-y-auto bg-white pb-4"
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
                    <li key={item.id} className="mt-6 flex items-center">
                      <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border border-gray-300">
                        <Image
                          alt="アイコン"
                          src={sample}
                          width={50}
                          height={50}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="rounded-xl bg-green-300 px-3 py-1 text-xl mr-2">
                        {item.content}
                      </div>
                      <div className='text-xm'>
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
                      <div className="rounded-xl bg-gray-300 px-3 py-1 text-xl ml-2">
                        {item.content}
                      </div>
                      <div className="ml-4 h-14 w-14 overflow-hidden rounded-full border border-gray-300">
                        <Image
                          alt="アイコン"
                          src={sample}
                          width={50}
                          height={50}
                          className="h-full w-full"
                        />
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
        <form onSubmit={SendMessage} className="flex justify-between">
          <input
            name="message"
            type="text"
            className="h-10 w-4/5 rounded pl-3"
          />
          <button className="w-1/6 rounded border text-white">送信</button>
        </form>
      </div>
    </>
  )
}