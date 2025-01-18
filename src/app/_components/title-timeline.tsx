"use client";

export const TitleTimeline = () => {
  return (
    <div className="relative h-[10vh] md:h-[30vh] w-full bg-white">
      <div className="container absolute bottom-0 left-0 right-0 top-0 md:top-12">
        <p className="pl-8 pt-10 text-2xl font-bold text-[#061936] md:text-6xl">
          A BILLIONAIRE. A MEDIA
          <br />
          ICON.{" "}
          <span className="text-[#BB133E]">
            A POLITICAL
            <br />
            MAVERICK!
          </span>
        </p>
      </div>

      <div className="container absolute bottom-0 left-0 right-0 top-8 md:top-10">
        <p className="pr-0 pt-0 text-end text-5xl font-bold text-[#061936]/10 md:text-9xl">
          TRUMP
        </p>
      </div>
    </div>
  );
};
