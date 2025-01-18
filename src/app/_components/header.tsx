"use client";

import { cn } from "@/utils/classname";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  total: number;
  linkBuy: string;
}
export const Header = ({ total, linkBuy }: HeaderProps) => {
  const [isScroll, setIsScroll] = useState<boolean>();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > window.screen.height - 100;

      setIsScroll(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex w-full justify-center backdrop-blur-sm transition-all",
        isScroll ? "bg-[#061936]" : "bg-transparent",
      )}
    >
      <div className="my-2 flex h-full w-full max-w-[90vw] items-center justify-between py-2">
        <p className="font-futuraBold text-xl text-white md:text-4xl">
          TRUMPLIVE
        </p>

        <div className="flex items-center gap-8">
          {/* <div className="flex items-center gap-2">
            <Image
              src={"/assets/homepage/coin-icon.png"}
              width={480}
              height={480}
              alt="Coin"
              className="h-[20px] w-auto hover:animate-shake md:h-[45px]"
            />
            <p className="text-xl font-bold text-white md:text-[24px]">
              {total}
            </p>
          </div> */}

          <Link href={linkBuy}>
            <Image
              src={"/assets/homepage/btn-buy.png"}
              width={480}
              height={480}
              alt="Buy"
              className="h-[25px] w-auto hover:animate-shake md:h-[45px]"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
