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

  const [isQuestionInteract, setIsQuestionInteract] = useState<boolean>(false);
  const [isAnswerInteract, setIsAnswerInteract] = useState<boolean>(false);

  const handleChangeVideo = () => {
    const isAnswer = !!latestQuestion?.answer;

    setCurrentVideo(generateVideoIndex(currentVideo, isAnswer));
  };

  const handleGetAnswer = async () => {
    await axios
      .post(
        "https://web3-astrogang.7b0fqh.easypanel.host/api/synthesize",
        {
          message: latestQuestion?.question?.text ?? "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
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

          if (!latestQuestion && words?.length <= 15) {
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
    if (latestQuestion && !latestQuestion?.question?.audio) {
      handleGetAnswer();
    }
  }, [latestQuestion]);

  useEffect(() => {
    if (latestQuestion?.question?.audio) {
      if (audioQuestionRef.current) {
        audioQuestionRef.current.src = latestQuestion?.question?.audio ?? "";
      }
      if (audioAnswerRef.current) {
        audioAnswerRef.current.src = latestQuestion?.answer?.audio ?? "";
      }

      setIsQuestionInteract(true);
    }
  }, [latestQuestion]);

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

  useEffect(() => {
    if (isQuestionInteract) {
      setIsQuestionInteract(false);
      setIsAnswerInteract(true);
    }
  }, [audioQuestionRef.current?.ended]);

  useEffect(() => {
    if (isAnswerInteract) {
      setIsAnswerInteract(false);
      setLatestQuestion(null);
    }
  }, [audioAnswerRef.current?.ended]);

  return (
    <section>
      <audio ref={audioQuestionRef} src={""} hidden />
      <audio ref={audioAnswerRef} src={""} hidden />
      <div className="relative">
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
        <div className="absolute bottom-12 left-12">
          <div className="flex flex-col items-start justify-start">
            <div className="bg-black/25 px-2">
              {isQuestionInteract && (
                <p className="max-w-[680px] text-[20px] font-semibold text-white">
                  <TypeAnimation
                    sequence={[
                      `${latestQuestion?.sender}: ${latestQuestion?.question?.text}` ||
                        "",
                    ]}
                    repeat={0}
                  />
                </p>
              )}
              {isAnswerInteract && (
                <p className="max-w-[680px] text-[20px] font-semibold text-white">
                  <TypeAnimation
                    sequence={[`ME: ${latestQuestion?.answer?.text}` || ""]}
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
