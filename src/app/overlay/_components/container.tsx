"use client";

import { generateUUID } from "@/utils/string";
import { createClient } from "@/utils/supabase/client";
import { generateVideoIndex, videos } from "@/utils/video";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import VideoItem from "./video-item";

const contentExcludes = [
  "opinion on your moms coin?",
  "what do you think of ethereum",
];

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
  const [firstAnswer, setFirstAnswer] = useState<IQuestion | null>(null);
  const [latestAnswer, setLatestAnswer] = useState<IQuestion | null>(null);

  const [isQuestionInteract, setIsQuestionInteract] = useState<boolean>(false);
  const [isAnswerInteract, setIsAnswerInteract] = useState<boolean>(false);

  console.log("data", {
    currentVideo,
    latestQuestion,
    firstAnswer,
    latestAnswer,
  });

  const handleChangeVideo = () => {
    const isAnswer = !!firstAnswer?.answer?.audio;

    if (isAnswer) {
      setLatestAnswer(firstAnswer);
      setFirstAnswer(null);
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

        setFirstAnswer(_question);
        setLatestQuestion(null);
      })
      .catch((err) => {
        handleGetAnswerError();
      });
  };

  const handleGetAnswerError = async () => {
    await axios
      .get("/api/iferror")
      .then(async (res) => {
        await supabase.from("chats").insert({
          sender: res?.data?.data?.username,
          content: res?.data?.data?.question?.message,
        });

        const _question = {
          ...latestQuestion,
          sender: res?.data?.data?.username,
          question: {
            text: res?.data?.data?.question?.message,
            audio: res?.data?.data?.question?.originalAudioUrl,
          },
          answer: {
            text: res?.data?.data?.answer?.message,
            audio: res?.data?.data?.answer?.originalAudioUrl,
          },
        };

        setTimeout(() => {
          setFirstAnswer(_question);
          setLatestQuestion(null);
        }, 2000);
      })
      .catch((err) => {
        handleGetAnswerError();
      });
  };

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
          const exclude = contentExcludes?.find((item) => item === content);

          if (!latestQuestion && !exclude) {
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
    if (latestQuestion && !latestQuestion?.answer?.audio && !firstAnswer) {
      handleGetAnswer();
    }
  }, [latestQuestion, firstAnswer]);

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
          setTimeout(() => {
            setIsAnswerInteract(false);
            setLatestAnswer(null);
          }, 1000);
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
        <div className="absolute left-0 top-0 z-10">
          <Image
            src="/assets/overlay/front/bg-video.png"
            height={1920}
            width={1080}
            alt="bg"
            className="h-auto w-[800px]"
          />
        </div>
        <div className="absolute bottom-12 left-12 z-40">
          <div className="flex flex-col items-start justify-start">
            <div className="bg-black/25 px-2">
              {isQuestionInteract && (
                <p className="max-w-[680px] font-sans text-[20px] font-semibold text-white">
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
                <p className="max-w-[680px] font-sans text-[20px] font-semibold text-white">
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
