import Image from "next/image";

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
        className="absolute -bottom-10 left-0 z-40 h-[50vh] w-auto md:left-[25vw] md:h-[75vh]"
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
        className="h-auto w-[90vw] absolute left-[5%] right-0 top-[15%] bottom-0"
        priority
      />
    </section>
  );
};
