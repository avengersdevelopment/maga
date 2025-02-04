import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  linkX: string;
}
export const Footer = ({ linkX }: FooterProps) => {
  return (
    <footer className="relative h-[25vh] w-full bg-[#061936] md:h-[50vh]">
      <Image
        src={"/assets/homepage/footer-flag.png"}
        width={1000}
        height={1000}
        alt=""
        className="z-40 h-full w-full object-cover object-center"
      />

      <Image
        src={"/assets/homepage/footer-trump.png"}
        width={1000}
        height={1000}
        alt=""
        className="absolute bottom-0 right-[15%] z-50 hidden h-full w-auto md:block"
      />

      <div className="absolute bottom-0 left-0 top-0 w-full md:w-1/2">
        <div className="container flex h-full flex-col items-start justify-center gap-4 md:gap-8">
          <a href={linkX} target="_blank">
            <Image
              src={"/assets/homepage/btn-x.png"}
              width={500}
              height={500}
              alt=""
              className="h-[15px] w-auto hover:animate-shake md:h-[30px]"
            />
          </a>

          <p
            className="md:text-md font-futuraBold text-sm text-white md:text-2xl"
            style={{
              fontSize: "calc(24px + 2vh)",
              lineHeight: 1,
            }}
          >
            © 2025 Trump MemeCoin. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
