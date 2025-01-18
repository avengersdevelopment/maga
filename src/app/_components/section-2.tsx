"use client";

import { useUserStore } from "@/store/user-store";
import { cn } from "@/utils/classname";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IChat } from "./container";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

interface Section2Props {
  chats: IChat[];
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

export const Section2 = ({ chats, setTotal, total }: Section2Props) => {
  const supabase = createClient();
  const router = useRouter();

  const listRef = useRef<HTMLDivElement>(null);

  const [commentsList, setCommentsList] = useState<IChat[]>(
    [...chats].reverse(),
  );
  const [isCommentDisabled, setIsCommentDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [newComment, setNewComment] = useState("");

  const {
    user,
    setUser,
    emerald,
    setEmerald,
    lastCommentDate,
    setLastCommentDate,
  } = useUserStore();

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newComment.trim()) {
      if (!user) {
        router.replace("/welcome");
        return;
      } else {
        await supabase.from("chats").insert({
          sender: user,
          content: newComment,
        });
        setEmerald(emerald + 10);
        setNewComment("");
        setLastCommentDate(new Date());
        setIsCommentDisabled(true);
      }
    }
  };

  useEffect(() => {
    supabase
      .channel("chats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
        },
        (payload: any) => {
          const newComment: IChat = {
            id: payload.new.id,
            sender: payload.new.sender,
            content: payload.new.content,
          };

          setCommentsList((prev) => [...prev, newComment]);
          setTimeout(() => {
            setTotal((prev) => prev + 1);
          }, 3000);
        },
      )
      .subscribe();

    return () => {
      supabase.channel("chats").unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [commentsList]);

  useEffect(() => {
    if (lastCommentDate) {
      const interval = setInterval(() => {
        const timeDiff =
          new Date().getTime() - new Date(lastCommentDate).getTime();
        const seconds = Math.floor(timeDiff / 1000);
        setIsCommentDisabled(seconds < 30);
        setCountdown(30 - seconds);
      }, 250);

      return () => clearInterval(interval);
    }
  }, [lastCommentDate]);

  return (
    <section className="flex h-screen w-full justify-center bg-white py-8">
      <div className="flex h-full w-full max-w-[90vw] flex-col justify-center gap-4">
        <div className="flex w-full items-end justify-between">
          <div className="flex w-3/4 flex-col">
            <p className="text-nowrap text-xl font-bold text-[#061936] md:text-6xl">
              WITNESS AND INTERACT WITH
            </p>
            <p className="text-xl font-bold text-[#061936] md:text-6xl">
              <span className="text-[#BB133E]">THE ICONIC</span> DONALD TRUMP,
              LIVE.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-md bg-[#061936] px-2 py-1 md:gap-2">
            <Image
              src={"/assets/homepage/coin-icon.png"}
              width={480}
              height={480}
              alt="Coin"
              className="h-[15px] w-auto hover:animate-shake md:h-[25px]"
            />
            <p className="text-xl font-bold text-white">{total}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={"/assets/homepage/i-icon.png"}
                    width={480}
                    height={480}
                    alt="Coin"
                    className="ml-1 h-[15px] w-auto md:ml-4"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="mb-2 flex gap-2 rounded-lg bg-[#D9D9D9] p-2">
                    <Image
                      src={"/assets/homepage/i-black-icon.png"}
                      width={480}
                      height={480}
                      alt="Coin"
                      className="h-[15px] w-auto"
                    />
                    <p className="">Get Trump MemeCoin by Commenting Below!</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex h-full w-full flex-col gap-2 md:flex-row">
          <div className="basis-1/2 border md:basis-2/3">
            {/* <iframe
              className="h-full w-full"
              allowFullScreen
              src="https://player.kick.com/trump-live"
            /> */}
          </div>

          <div className="basis-1/2 rounded-md border bg-[#061936] md:basis-1/3">
            <div className="flex h-full w-full flex-col gap-2">
              <p className="p-2 font-bold text-white">Comments</p>

              <div className="h-[1px] w-full border-b border-white" />

              {/* List Chat */}
              <div ref={listRef} className="flex h-full w-full flex-col px-2">
                {commentsList.map((comment) => {
                  const isBot = comment.sender.includes("Bot");
                  return (
                    <div key={comment.id} className="flex gap-2">
                      <p
                        className={cn(
                          "text-[2vh] text-white",
                          isBot && "text-[#B9F1FF]",
                        )}
                      >
                        {comment.sender}:{" "}
                        <span className="text-white">{comment.content}</span>
                      </p>
                    </div>
                  );
                })}
              </div>

              <input
                type="text"
                value={newComment}
                placeholder={
                  isCommentDisabled
                    ? `Disabled for ${countdown < 0 ? 30 : countdown} seconds...`
                    : "Enter any comment here..."
                }
                className={cn(
                  "mx-4 mb-3 mt-1 rounded-md border border-white bg-transparent px-2 py-1 text-[2vh] text-white placeholder:text-white/50 focus:outline-none",
                )}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 80) {
                    setNewComment(value);
                  }
                }}
                onKeyDown={handleSubmit}
                disabled={isCommentDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
