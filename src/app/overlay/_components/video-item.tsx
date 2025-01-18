"use client";

import { IVideo } from "@/utils/video";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="absolute left-0 top-0 z-20" key={index}>
      <AnimatePresence>
        {isCurrent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
