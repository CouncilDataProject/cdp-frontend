import React, { FC, RefObject, useEffect, useImperativeHandle, useRef } from "react";

import videojs, { VideoJsPlayer } from "video.js";

import "video.js/dist/video-js.css";
import "./vjs-theme-cdp.css";

/**Public API with seekTo method */
export interface EventVideoRef {
  seekTo(seconds: number): void;
}

export interface EventVideoProps {
  /**The source uri of the video */
  uri: string;
  /**Event video Transcript reference */
  componentRef: RefObject<EventVideoRef>;
}

const EventVideo: FC<EventVideoProps> = ({ uri, componentRef }: EventVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoJsPlayerRef = useRef<VideoJsPlayer>();

  useImperativeHandle(componentRef, () => ({
    /**Implement componentRef.seekTo by using videoJsPlayerRef.currentTime and play method */
    seekTo: (seconds: number) => {
      videoJsPlayerRef.current?.currentTime(seconds);
      if (videoJsPlayerRef.current?.paused()) {
        videoJsPlayerRef.current?.play();
      }
    },
  }));
  const VideoHtml = () => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered vjs-theme-cdp" />
    </div>
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    let player: VideoJsPlayer;
    if (videoElement) {
      player = videojs(
        videoElement,
        {
          autoplay: false,
          controls: true,
          controlBar: {
            currentTimeDisplay: true,
            timeDivider: true,
            durationDisplay: true,
            customControlSpacer: true,
            remainingTimeDisplay: false,
          },
          preload: "metadata",
          aspectRatio: "16:9",
          fluid: true,
          playbackRates: [0.75, 1, 1.5, 2],
          responsive: true,
          sources: [{ src: uri }],
          userActions: {
            hotkeys: true,
          },
        },
        function () {
          videoJsPlayerRef.current = this;
        }
      );
    }
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [uri]);

  return <VideoHtml />;
};

export default EventVideo;
