export interface IScene {
  view: "front";
  index: number;
}

export interface IVideo {
  id: number;
  src: string;
  view: IScene["view"];
  isAnswer: boolean;
}

export const scenes: IScene["view"][] = ["front"];

export const videos: IVideo[] = [
  { id: 1, src: "/assets/overlay/front/1.mp4", view: "front", isAnswer: true },
  { id: 2, src: "/assets/overlay/front/2.mp4", view: "front", isAnswer: false },
  { id: 3, src: "/assets/overlay/front/3.mp4", view: "front", isAnswer: true },
  { id: 4, src: "/assets/overlay/front/4.mp4", view: "front", isAnswer: false },
];

export const generateVideoIndex = (
  currentIndex: number,
  isAnswer: boolean,
): number => {
  const currentVideo = videos.find((v) => v.id === currentIndex);
  let filteredVideos = videos
    .filter((v) => v.id !== currentIndex)
    .filter((v) => v.isAnswer === isAnswer);

  filteredVideos = filteredVideos.filter((v) => v.view === currentVideo?.view);

  const nextVideo =
    filteredVideos[Math.floor(Math.random() * filteredVideos.length)]?.id;

  return nextVideo;
};
