"use client";

import { useEffect, useRef } from "react";

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  }, [audioRef]);

  return (
    <>
      <audio ref={audioRef} loop autoPlay>
        <source src="/assets/overlay/audio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}
