"use client";

import { cn } from "@/utils/classname";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  total: number;
}
export const Header = ({ total }: HeaderProps) => {
  const [isScroll, setIsScroll] = useState<boolean>();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > (window.screen.height - 100);

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
      <div className="my-8 flex h-full w-full max-w-[90vw] items-center justify-between py-2">
        <p className="text-xl font-bold text-white md:text-3xl">TRUMPLIVE</p>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image
              src={"/assets/homepage/coin-icon.png"}
              width={480}
              height={480}
              alt="Coin"
              className="h-[15px] w-auto hover:animate-shake md:h-[55px]"
            />
            <p className="text-xl font-bold text-white md:text-[28px]">
              {total}
            </p>
          </div>

          <Link href={""}>
            <Image
              src={"/assets/homepage/btn-buy.png"}
              width={480}
              height={480}
              alt="Buy"
              className="h-[25px] w-auto hover:animate-shake md:h-[55px]"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
