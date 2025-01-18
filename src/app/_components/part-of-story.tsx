"use client";

import Image from "next/image";

export const PartOfStory = () => {
  return (
    <div className="h-full w-full border-y border-[#061936] py-10">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Image
          src={"/assets/homepage/story-left.png"}
          width={1000}
          height={1000}
          alt=""
          className="h-auto w-full md:w-1/2"
        />

        <Image
          src={"/assets/homepage/story-right.png"}
          width={1000}
          height={1000}
          alt=""
          className="h-auto w-full md:w-1/2"
        />
      </div>
    </div>
  );
};
