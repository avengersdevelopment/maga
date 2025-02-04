"use client";

export const TitleTimeline = () => {
  return (
    <div className="flex h-[150px] w-full justify-center bg-white md:h-[450px]">
      <div className="relative h-full w-[90vw]">
        <div className="absolute bottom-0 left-0 right-0 top-0 md:top-0">
          <p
            className="text-nowrap pt-10 text-4xl font-futuraBold text-[#061936] md:text-[112px]"
            style={{ lineHeight: 1 }}
          >
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

        <div className="absolute bottom-0 left-0 right-0 top-4 md:top-0">
          <p
            className="text-nowrap pr-0 pt-0 text-end text-7xl font-bold text-[#061936]/10 md:text-[250px]"
            style={{ lineHeight: 1 }}
          >
            TRUMP
          </p>
        </div>
      </div>
    </div>
  );
};
