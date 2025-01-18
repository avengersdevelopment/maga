import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  total: number;
}
export const Header = ({ total }: HeaderProps) => {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-sm">
      <div className="container flex h-full w-full items-center justify-between py-2">
        <p className="text-xl font-bold text-white md:text-3xl">TRUMPLIVE</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={"/assets/homepage/coin-icon.png"}
              width={480}
              height={480}
              alt="Coin"
              className="h-[15px] w-auto hover:animate-shake md:h-[25px]"
            />
            <p className="text-xl font-bold text-white">{total}</p>
          </div>

          <Link href={""}>
            <Image
              src={"/assets/homepage/btn-buy.png"}
              width={480}
              height={480}
              alt="Buy"
              className="h-[25px] w-auto hover:animate-shake md:h-[35px]"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
