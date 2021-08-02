import React, { FC } from "react";

import VideoJS from "./VideoJS";

export interface EventVideoProps {
  /**The source uri of the video */
  uri: string;
}

const EventVideo: FC<EventVideoProps> = ({ uri }) => {
  return <VideoJS sources={[{ src: uri }]} />;
};

export default EventVideo;
