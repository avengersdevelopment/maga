"use client";

import { cn } from "@/utils/classname";
import { IVideo } from "@/utils/video";
import { useEffect, useRef } from "react";

interface VideoItemProps {
  item: IVideo;
  index: number;
  currentVideo: number;
  handleChangeVideo: () => void;
}

export default function VideoItem({
  item,
  index,
  currentVideo,
  handleChangeVideo,
}: VideoItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isCurrent = currentVideo === index + 1;

  useEffect(() => {
    if (isCurrent) {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      if (video.paused) {
        video.play();
      }

      const handleTimeUpdate = () => {
        const currentTime = Math.floor(video?.currentTime) + 1;

        if (currentTime - 1 === Math.floor(video?.duration)) {
          handleChangeVideo();
        }
      };

      video?.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video?.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isCurrent]);

  return (
    <div className={cn(isCurrent ? "block" : "hidden")} key={index}>
      <video
        ref={videoRef}
        width="1080"
        height="1920"
        controls={false}
        muted
        preload="none"
        key={item?.id}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    </div>
  );
}
