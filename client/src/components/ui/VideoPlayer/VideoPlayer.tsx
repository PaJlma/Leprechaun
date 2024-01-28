import { FC, useEffect, useRef, ReactEventHandler, useState, MouseEventHandler, KeyboardEventHandler } from "react";
import { VideoPlayerProps } from "./VideoPlayer.types";
import styles from "./VideoPlayer.module.scss";
import VideoControls from "./VideoControls/VideoControls";
import { useAppSelector } from "@/hooks/redux/redux";
import { useDispatch } from "react-redux";
import { videoInfoSlice } from "@/store/slices/videoInfo.slice";

const VideoPlayer: FC<VideoPlayerProps> = ({ duration, ...props }) => {
  const { played, isPlaying, isFullscreen } = useAppSelector((state) => state.videoInfo);
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(videoInfoSlice.actions.reset());

    if (videoRef.current?.volume) {
      const volume = localStorage.getItem("videoVolume") ?? "0.1";
      videoRef.current.volume = +volume;
    }

    setTimeout(() => {
      controlsRef.current?.classList.remove(styles.active);
    }, 5000);
  }, []);

  const onVideoClickHandler: MouseEventHandler<HTMLVideoElement> = (event) => {
    if (isPlaying) {
      dispatch(videoInfoSlice.actions.setIsPlaying(false));
      videoRef.current?.pause();
    } else {
      dispatch(videoInfoSlice.actions.setIsPlaying(true));
      videoRef.current?.play();
    }
  };

  const onEndEventHandler: ReactEventHandler<HTMLVideoElement> = (event) => {
    dispatch(videoInfoSlice.actions.setIsPlaying(false));
  };

  const onTimeUpdateEventHandler: ReactEventHandler<HTMLVideoElement> = (event) => {
    dispatch(videoInfoSlice.actions.setPlayed(event.currentTarget.currentTime));
  };

  const onVideoKeyDownHandler: KeyboardEventHandler<HTMLVideoElement> = (event) => {
    if (videoRef.current?.currentTime) {
      switch (event.key) {
        case "ArrowLeft":
          videoRef.current.currentTime -= 5;
          break;

        case "ArrowRight":
          videoRef.current.currentTime += 5;
          break;
      }
    }
  };

  return (
    <div className={styles.body}>
      <video
        {...props}
        ref={videoRef}
        onClick={onVideoClickHandler}
        onTimeUpdate={onTimeUpdateEventHandler}
        onEnded={onEndEventHandler}
        onKeyDown={onVideoKeyDownHandler}
        className={styles.video}
      />
      {videoRef.current && (
        <VideoControls
          videoElement={videoRef.current}
          played={played}
          isPlaying={isPlaying}
          isFullscreen={isFullscreen}
          ref={controlsRef}
          className={`${styles.active} ${styles.controls}`}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
