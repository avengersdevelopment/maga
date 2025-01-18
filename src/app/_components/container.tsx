"use client";

import Header from "@/app/_components/header";
import { Section1 } from "@/app/_components/section-1";
import { Section2 } from "@/app/_components/section-2";
import Footer from "@/app/_components/footer";
import { Section3 } from "./section-3";
import { TitleTimeline } from "./title-timeline";
import { useState } from "react";

export interface IChat {
  id: string;
  sender: string;
  content: string;
}

interface ContainerProps {
  config: {
    x_url: string;
    x_dev_url: string;
    buy_url: string;
    docs: string;
  };
  chats: IChat[];
  totalChats: number;
}

export default function Container({
  config,
  chats,
  totalChats,
}: ContainerProps) {
  const [total, setTotal] = useState<number>(totalChats);

  return (
    <main className="relative h-full w-full">
      <Header total={total} />
      <Section1 />
      <Section2 total={total} chats={chats} setTotal={setTotal} />
      <TitleTimeline />
      <Section3 />
      <Footer />
    </main>
  );
}
