import React, { FC, RefObject, useEffect, useImperativeHandle, useRef } from "react";

import videojs, { VideoJsPlayer } from "video.js";

import { strings } from "../../../assets/LocalizedStrings";

import { initVideoJsLanguages } from "./utils";

import "video.js/dist/video-js.css";
import "./vjs-theme-cdp.css";

initVideoJsLanguages();

enum KeyBoardKey {
  SPACE = 32,
  ARROW_LEFT = 37,
  ARROW_RIGHT = 39,
  F = 70,
  K = 75,
  M = 77,
}

const SKIP_SECONDS = 10;

/**Public API with seekTo and pause methods */
export interface EventVideoRef {
  seekTo(seconds: number): void;
  pause(): void;
}

export interface EventVideoProps {
  /**The source uri of the video */
  uri: string;
  /**Event video Transcript reference */
  componentRef: RefObject<EventVideoRef>;
  /**The initial seconds to seek to. */
  initialSeconds?: number;
}

const EventVideo: FC<EventVideoProps> = ({
  uri,
  componentRef,
  initialSeconds,
}: EventVideoProps) => {
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
    /**Implement componentRef.seekTo by using videoJsPlayerRef.pause method */
    pause: () => videoJsPlayerRef.current?.pause(),
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
          preload: initialSeconds ? "auto" : "metadata",
          aspectRatio: "16:9",
          fluid: true,
          language: strings.getLanguage(),
          playbackRates: [2, 1.5, 1, 0.75, 0.5],
          responsive: true,
          sources: [{ src: uri }],
          userActions: {
            hotkeys: (event) => {
              if (event.which === KeyBoardKey.K || event.which === KeyBoardKey.SPACE) {
                if (videoJsPlayerRef.current?.paused()) {
                  videoJsPlayerRef.current?.play();
                } else {
                  videoJsPlayerRef.current?.pause();
                }
              } else if (event.which === KeyBoardKey.M) {
                videoJsPlayerRef.current?.muted(!videoJsPlayerRef.current?.muted());
              } else if (event.which === KeyBoardKey.F) {
                if (videoJsPlayerRef.current?.isFullscreen()) {
                  videoJsPlayerRef.current?.exitFullscreen();
                } else {
                  videoJsPlayerRef.current?.requestFullscreen();
                }
              } else if (event.which === KeyBoardKey.ARROW_LEFT) {
                videoJsPlayerRef.current?.currentTime(
                  videoJsPlayerRef.current?.currentTime() - SKIP_SECONDS
                );
              } else if (event.which === KeyBoardKey.ARROW_RIGHT) {
                videoJsPlayerRef.current?.currentTime(
                  videoJsPlayerRef.current?.currentTime() + SKIP_SECONDS
                );
              }
            },
          },
        },
        function () {
          if (initialSeconds && initialSeconds > 0) {
            this.currentTime(initialSeconds);
          }
          videoJsPlayerRef.current = this;
        }
      );
    }
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [uri, initialSeconds]);

  return <VideoHtml />;
};

export default EventVideo;
