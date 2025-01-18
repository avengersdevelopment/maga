export interface IVideo {
  id: number;
  src: string;
  isAnswer: boolean;
}

export const videos: IVideo[] = [
  { id: 1, src: "/assets/overlay/front/1.mp4", isAnswer: true },
  { id: 2, src: "/assets/overlay/front/2.mp4", isAnswer: false },
  { id: 3, src: "/assets/overlay/front/3.mp4", isAnswer: true },
  { id: 3, src: "/assets/overlay/front/4.mp4", isAnswer: false },
];

export const generateVideoIndex = (
  currentIndex: number,
  isAnswer: boolean,
): number => {
  const filteredVideos = videos
    .filter((v) => v.id !== currentIndex)
    .filter((v) => v.isAnswer === isAnswer);

  const nextVideo =
    filteredVideos[Math.floor(Math.random() * filteredVideos.length)]?.id;

  return nextVideo;
};
