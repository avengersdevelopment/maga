import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "LIVE STREAM", href: "#livestream" },
  { label: "HISTORY", href: "#history" },
];

export const Section1 = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src={"/assets/homepage/flag.png"}
        width={1000}
        height={1000}
        alt="Flag"
        className="h-full w-auto object-cover object-center"
        priority
      />

      <Image
        src={"/assets/homepage/trump-char.png"}
        width={1000}
        height={1000}
        alt="Char"
        className="absolute -bottom-24 left-0 z-40 h-[50vh] w-auto scale-[180%] md:left-[25vw] md:h-[75vh] md:scale-105"
        priority
      />

      <Image
        src={"/assets/homepage/trump-2025.png"}
        width={1000}
        height={1000}
        alt="2025"
        className="absolute bottom-0 right-0 w-full md:bottom-10 md:right-10 md:w-[25vw]"
        priority
      />

      <Image
        src={"/assets/homepage/hero-text.png"}
        width={1000}
        height={1000}
        alt="Hero"
        className="absolute bottom-0 left-[5%] right-0 top-[15%] h-auto w-[90vw]"
        priority
      />

      <Image
        src={"/assets/homepage/trump-2025.png"}
        width={1000}
        height={1000}
        alt="2025"
        className="absolute bottom-0 left-[5%] right-0 top-[30%] block h-auto w-[90vw] md:hidden"
        priority
      />

      <div className="absolute -bottom-16 left-[4vw] z-40 py-2 md:left-[10vw] md:py-8">
        <div className="rotate-[4deg] rounded-b-none rounded-t-[40px] bg-white p-6 pb-12 pt-4 md:p-8 md:pb-12 md:pt-6">
          <div className="flex rotate-[-4deg] flex-col gap-2 pb-8 pt-4">
            {navItems?.map((item, index) => {
              return (
                <Link href={item?.href} key={index}>
                  <button className="group flex w-[320px] items-center justify-between gap-4 rounded-md px-2 py-2.5 transition-all hover:bg-[#BB133E]">
                    <span className="text-base font-bold group-hover:text-white md:text-lg">
                      {item?.label}
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="size-5 stroke-black group-hover:stroke-white md:size-6"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
