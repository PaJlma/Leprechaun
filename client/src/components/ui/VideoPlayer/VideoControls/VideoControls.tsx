import { forwardRef } from "react";
import { VideoControlsProps } from "./VideoControls.types";
import styles from "./VideoControls.module.scss";
import ProgressLine from "./ProgressLine/ProgressLine";
import VideoControlsToolbar from "./VideoControlsToolbar/VideoControlsToolbar";

const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps>(
  (
    {
      videoElement,
      played,
      isPlaying,
      isFullscreen,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={`${styles.body} ${className}`} {...props}>
        <div className={styles.footer}>
          <ProgressLine mediaElement={videoElement} played={played} hasSeekMark />
          <VideoControlsToolbar
            videoElement={videoElement}
            played={played}
            isPlaying={isPlaying}
            isFullscreen={isFullscreen}
          />
        </div>
      </div>
    );
  },
);

export default VideoControls;
