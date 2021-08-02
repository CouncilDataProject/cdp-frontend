import React, { FC } from "react";

import VideoJS from "./VideoJS";

export interface EventVideoProps {
  /**The source uri of the video */
  uri: string;
}

const EventVideo: FC<EventVideoProps> = ({ uri }) => {
  return (
    <VideoJS
      options={{
        autoplay: false,
        controls: true,
        preload: "metadata",
        aspectRatio: "16:9",
        fluid: true,
        playbackRates: [0.75, 1, 1.5, 2],
        responsive: true,
        sources: [
          {
            src: uri,
          },
        ],
        userActions: {
          hotkeys: true,
        },
      }}
    />
  );
};

export default EventVideo;
