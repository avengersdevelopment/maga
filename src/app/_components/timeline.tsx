"use client";

import { cn } from "@/utils/classname";
import { useState } from "react";
import Image from "next/image";

const accordionItems = [
  {
    id: 1,
    title: "EARLY LIFE AND BUSINESS VENTURES",
    timeline: "1946 - 2015",
    description: `Born in Queens, New York, in 1946, Donald Trump took over his father's real estate business in 1971, renaming it The Trump Organization. He gained prominence with developments like Trump Tower in 1983 and expanded his brand through high-profile ventures and reality TV success with "The Apprentice" (2004 - 2015).`,
  },
  {
    id: 2,
    title: "FIRST PRESIDENTIAL TERM",
    timeline: "2017 - 2021",
    description:
      "Trump became the 45th President of the United States in 2017, pushing through major policies like the Tax Cuts and Jobs Act and engaging in groundbreaking diplomacy, including meeting North Korean leader Kim Jong-un. His term was marked by both bold achievements and controversies, ending in 2021.",
  },
  {
    id: 3,
    title: "POST-PRESIDENCY AND LEGAL CHALLENGES",
    timeline: "2021 - 2024",
    description:
      "After leaving office, Trump faced legal issues, including indictments for election interference and handling classified documents. Despite challenges, he remained a dominant figure in U.S. politics and launched a 2024 presidential campaign.",
  },
  {
    id: 4,
    title: "PRESIDENTIAL CAMPAIGN AND ELECTION",
    timeline: "2024",
    description:
      "In November 2024, Trump won the presidential election against Kamala Harris with 312 electoral votes, marking his comeback. His victory was certified on January 6, 2025, solidifying his return to the presidency.",
  },
  {
    id: 5,
    title: "SECOND PRESIDENTIAL TERM",
    timeline: "2025 - Present",
    description:
      "Set to be inaugurated on January 20, 2025, Trump becomes the 47th President of the United States, making history as the second president to serve non-consecutive terms after Grover Cleveland. His second term is poised to continue shaping American politics and global dynamics.",
  },
  {
    id: 6,
    title: "CRYPTO VENTURE AND $TRUMP COIN SUCCESS",
    timeline: "2025",
    description:
      "In 2025, Donald Trump entered the cryptocurrency world by launching $TRUMP, his own digital coin. The token achieved an astounding $3 billion market cap within 7 minutes of its launch, reflecting his continued ability to dominate markets and attract massive attention. This milestone cemented his influence in both politics and finance, blending his legacy with the digital economy.",
  },
];

export const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      id="history"
      className="mb-10 flex h-full w-screen justify-center bg-white py-16"
    >
      <div className="flex h-full w-[90vw] flex-col gap-8 px-10">
        {accordionItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={cn(
                "flex w-full cursor-pointer items-start gap-4 rounded-lg p-4",
                isActive
                  ? "bg-[#061936]"
                  : "border-spacing-x-8 border-b border-dashed border-[#BDBDBD] bg-white",
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

              <div className="my-2 flex w-full flex-col gap-4">
                <div className="flex w-full gap-2">
                  <p
                    className={cn(
                      "font-futuraBold text-nowrap text-lg md:text-2xl",
                      isActive ? "text-white" : "text-[#061936]",
                    )}
                    style={{
                      fontSize: 32,
                    }}
                  >
                    {item.timeline}
                  </p>

                  <p
                    className={cn(
                      "font-futuraBold hidden text-2xl capitalize md:block",
                      isActive ? "text-white" : "text-[#BB133E]",
                    )}
                    style={{
                      fontSize: 32,
                    }}
                  >
                    {item.title}
                  </p>
                </div>

                <p
                  className={cn(
                    "font-futuraBold text-2xl capitalize md:hidden",
                    isActive ? "text-white" : "text-[#BB133E]",
                  )}
                  style={{
                    fontSize: 16,
                  }}
                >
                  {item.title}
                </p>

                {isActive && (
                  <p className="mb-2 text-sm font-normal text-white md:text-2xl">
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
