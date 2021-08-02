import React, { FC, useEffect } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  options: VideoJsPlayerOptions;
}

export const VideoJS: FC<VideoJSProps> = ({ options }: VideoJSProps) => {
  const videoRef = React.useRef(null);

  // This seperate functional component fixes the removal of the videoelement
  // from the DOM when calling the dispose() method on a player
  const VideoHtml = () => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    let player: VideoJsPlayer;
    if (videoElement) {
      player = videojs(videoElement, options, () => {
        console.log("player is ready");
      });
    }
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [options]);

  return <VideoHtml />;
};
export default VideoJS;
