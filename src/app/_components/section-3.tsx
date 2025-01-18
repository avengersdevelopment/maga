"use client";

import { PartOfStory } from "./part-of-story";
import { Timeline } from "./timeline";

export const Section3 = () => {
  return (
    <section className="flex h-full w-full justify-center bg-white py-8">
      <div className="container flex h-full w-full flex-col items-center">
        <Timeline />
        <PartOfStory />
      </div>
    </section>
  );
};
