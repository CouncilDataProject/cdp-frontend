import React, { FC, useEffect } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";
import "./vjs-theme-cdp.css";

interface VideoJSProps {
  sources: {
    src: string;
    type?: string;
  }[];
}

export const VideoJS: FC<VideoJSProps> = ({ sources }: VideoJSProps) => {
  const videoRef = React.useRef(null);

  // This seperate functional component fixes the removal of the videoelement
  // from the DOM when calling the dispose() method on a player
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
          sources: sources,
          userActions: {
            hotkeys: true,
          },
        },
        () => console.log("player is ready")
      );
      player;
    }
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [sources]);

  return <VideoHtml />;
};
export default VideoJS;
