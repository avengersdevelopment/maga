"use client";

import { useUserStore } from "@/store/user-store";
import { cn } from "@/utils/classname";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Container = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const [tempName, setTempName] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/#livestream");
    }
  }, [user]);

  return (
    <main className="relative h-screen w-screen">
      <Image
        src={"/assets/homepage/flag.png"}
        width={1000}
        height={1000}
        alt="Flag"
        className="h-full w-auto object-cover object-center"
        priority
      />

      <div className="absolute bottom-0 left-0 right-0 top-0">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <p className="text-xl font-bold italic text-white md:text-6xl">
            Join the Movement
          </p>
          <p className="text-md px-8 text-center text-white md:w-[650px] md:text-2xl">
            Let&apos;s personalize your tremendous experience! Enter your name
            to get started, and get noticed by Trump.
          </p>

          <input
            type="text"
            placeholder={"Enter your name here..."}
            className={cn(
              "mx-4 mb-3 mt-14 w-1/2 rounded-md border border-white bg-transparent px-4 py-4 text-[2vh] text-white placeholder:text-white/50 focus:outline-none placeholder:text-md md:w-[650px]",
            )}
            onChange={(e) => {
              if (e.target.value) {
                setTempName(e.target.value);
              }
            }}
          />

          <Image
            src={"/assets/homepage/btn-submit-name.png"}
            width={1000}
            height={1000}
            alt=""
            className="h-[25px] w-auto cursor-pointer hover:animate-shake md:h-[50px]"
            onClick={() => {
              setUser(tempName);
            }}
          />
        </div>
      </div>
    </main>
  );
};
