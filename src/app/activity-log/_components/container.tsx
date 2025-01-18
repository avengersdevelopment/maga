"use client";

import Link from "next/link";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import axios from "axios";
import { useEffect, useState } from "react";

interface ContainerProps {
  config: {
    x_url: string;
    x_dev_url: string;
    buy_url: string;
    docs: string;
    x_user_id: string;
    x_drive_id: string;
  };
}

export default function Container({ config }: ContainerProps) {
  const [tweets, setTweets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetTweet = async () => {
    setIsLoading(true);

    await axios
      .get(`/api/tweet?userId=${config?.x_user_id}`)
      .then(async (res) => {
        setTweets(res?.data?.data ?? []);
        setIsLoading(false);
        return;
      })
      .catch((err) => {
        handleGetTweetDrive();
      });
  };

  const handleGetTweetDrive = async () => {
    await axios
      .get(`/api/tweet-drive?fileId=${config?.x_drive_id}`)
      .then(async (res) => {
        setTweets(res?.data ?? []);
        setIsLoading(false);
        return;
      });
  };

  useEffect(() => {
    handleGetTweet();
  }, []);

  return (
    <main className="h-full w-full bg-red-500">
      <Header />

      {/* Content */}
      <div className="container pt-20">
        <div className="mb-10 flex w-full justify-start text-xl">
          Back to Home
        </div>

        <p className="mb-16 text-center text-5xl">COIN Activity</p>

        <div className="mb-32 flex flex-col gap-4">
          {tweets?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex w-full justify-between rounded-xl border px-4 py-2"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-lg">{item?.text}</p>
                </div>

                <Link
                  href={`${config?.x_dev_url}/status/${item?.id}`}
                  className="flex w-[200px] items-center gap-4 rounded-xl border px-4"
                >
                  <p>Interact with X</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
