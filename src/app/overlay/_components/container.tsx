"use client";

import { generateUUID } from "@/utils/string";
import { createClient } from "@/utils/supabase/client";
import { generateVideoIndex, videos } from "@/utils/video";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import VideoItem from "./video-item";

export interface IQuestion {
  id?: string;
  sender?: string;
  question?: {
    text?: string;
    audio?: string;
  };
  answer?: {
    text?: string;
    audio?: string;
  };
}

export default function Container() {
  const supabase = createClient();

  const audioQuestionRef = useRef<HTMLAudioElement>(null);
  const audioAnswerRef = useRef<HTMLAudioElement>(null);

  const [currentVideo, setCurrentVideo] = useState<number>(2);
  const [latestQuestion, setLatestQuestion] = useState<IQuestion | null>(null);
  const [latestAnswer, setLatestAnswer] = useState<IQuestion | null>(null);

  const [isQuestionInteract, setIsQuestionInteract] = useState<boolean>(false);
  const [isAnswerInteract, setIsAnswerInteract] = useState<boolean>(false);

  const handleChangeVideo = () => {
    const isAnswer = !!latestQuestion?.answer?.audio;

    if (isAnswer) {
      setLatestAnswer(latestQuestion);
      setLatestQuestion(null);
    }

    setCurrentVideo(generateVideoIndex(currentVideo, isAnswer));
  };

  const handleGetAnswer = async () => {
    await axios
      .post("/api/tts", {
        message: latestQuestion?.question?.text ?? "",
      })
      .then((res) => {
        const _question = {
          ...latestQuestion,
          question: {
            text: latestQuestion?.question?.text,
            audio: res?.data?.data?.question?.originalAudioUrl,
          },
          answer: {
            text: res?.data?.data?.message,
            audio: res?.data?.data?.answer?.originalAudioUrl,
          },
        };

        setLatestQuestion(_question);
      });
  };

  console.log("currentVideo", currentVideo);
  console.log("latestQuestion", latestQuestion);
  console.log("latestAnswer", latestAnswer);

  useEffect(() => {
    supabase
      .channel("chats")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
        },
        (payload: any) => {
          const content = payload?.new?.content;
          const words = content?.split(" ");
          const blockWords = ["nigga", "nigger", "bundled", "scam", "rug"];

          if (
            !latestQuestion &&
            words?.length <= 10 &&
            !blockWords.includes(content?.toLowerCase())
          ) {
            setLatestQuestion({
              id: generateUUID(),
              sender: payload?.new?.sender,
              question: {
                text: content,
                audio: "",
              },
              answer: {
                text: "",
                audio: "",
              },
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.channel("chats").unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (latestQuestion && !latestQuestion?.answer?.audio) {
      handleGetAnswer();
    }
  }, [latestQuestion]);

  useEffect(() => {
    if (!!latestAnswer?.answer?.audio) {
      if (audioQuestionRef.current) {
        audioQuestionRef.current.src = latestAnswer?.question?.audio ?? "";
      }
      if (audioAnswerRef.current) {
        audioAnswerRef.current.src = latestAnswer?.answer?.audio ?? "";
      }

      setIsQuestionInteract(true);
    }
  }, [latestAnswer]);

  useEffect(() => {
    if (latestAnswer) {
      const interval = setInterval(() => {
        if (audioQuestionRef.current?.ended) {
          setIsQuestionInteract(false);
          setIsAnswerInteract(true);
        }

        if (audioAnswerRef.current?.ended) {
          setIsAnswerInteract(false);
          setLatestAnswer(null);
          handleChangeVideo();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [latestAnswer]);

  useEffect(() => {
    if (isQuestionInteract && audioQuestionRef.current) {
      audioQuestionRef.current.play();
    }
  }, [isQuestionInteract]);

  useEffect(() => {
    if (isAnswerInteract && audioAnswerRef.current) {
      audioAnswerRef.current.play();
    }
  }, [isAnswerInteract]);

  return (
    <section>
      <audio ref={audioQuestionRef} src={""} hidden />
      <audio ref={audioAnswerRef} src={""} hidden />
      <div className="relative h-[450px] w-[800px]">
        {videos?.map((item, index) => {
          return (
            <VideoItem
              item={item}
              handleChangeVideo={handleChangeVideo}
              currentVideo={currentVideo}
              key={index}
              index={index}
            />
          );
        })}
        <div className="absolute bottom-12 left-12 z-40">
          <div className="flex flex-col items-start justify-start">
            <div className="bg-black/25 px-2">
              {isQuestionInteract && (
                <p className="max-w-[680px] text-[20px] font-semibold text-white">
                  <TypeAnimation
                    sequence={[
                      `${latestAnswer?.sender}: ${latestAnswer?.question?.text}` ||
                        "",
                    ]}
                    repeat={0}
                  />
                </p>
              )}
              {isAnswerInteract && (
                <p className="max-w-[680px] text-[20px] font-semibold text-white">
                  <TypeAnimation
                    sequence={[`ME: ${latestAnswer?.answer?.text}` || ""]}
                    repeat={0}
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
