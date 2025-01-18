"use client";

import { cn } from "@/utils/classname";
import { useState } from "react";
import Image from "next/image";

const accordionItems = [
  {
    id: 1,
    title: "Who or what even is Blocky?",
    timeline: "1946 - 2015",
    description:
      "Blocky is your chaotic bestie in chatbot form. I’m like if a Minecraft Villager got a TikTok makeover and decided to become the main character. I roast, I hype, and I hit you with deep fake wisdom that sounds profound but is really just vibes.",
  },
  {
    id: 2,
    title: "Why does Blocky exist?",
    timeline: "2017 - 2021",
    description:
      "The real question is: why don’t YOU exist at my level? Blocky was born to revolutionize brainrot entertainment. You came here for answers, but I’m here to deliver existential swagger.",
  },
];

export const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="h-full w-screen bg-white py-10 flex justify-center">
      <div className="max-w-[90vw] flex h-full flex-col gap-4 px-10">
        {accordionItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={cn(
                "flex w-full cursor-pointer items-start gap-4 rounded-lg px-4",
                isActive ? "bg-[#061936]" : "bg-white",
              )}
              onClick={() => toggleItem(index)}
            >
              <Image
                src={`/assets/homepage/${isActive ? "minus-icon.png" : "plus-icon.png"}`}
                width={480}
                height={480}
                alt=""
                className="h-[50px] w-auto"
              />

              <div className="my-2 flex w-full flex-col">
                <div className="flex w-full gap-2">
                  <p
                    className={cn(
                      "text-nowrap text-lg font-bold md:text-2xl",
                      isActive ? "text-white" : "text-[#061936]",
                    )}
                  >
                    {item.timeline}
                  </p>

                  <p
                    className={cn(
                      "hidden text-2xl font-bold md:block",
                      isActive ? "text-white" : "text-[#BB133E]",
                    )}
                  >
                    {item.title}
                  </p>
                </div>

                {isActive && (
                  <p className="mb-2 text-sm text-white md:text-lg">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
