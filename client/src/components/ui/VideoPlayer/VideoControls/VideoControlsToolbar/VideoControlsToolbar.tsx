import { FC, MouseEventHandler } from "react";
import { VideoControlsToolbarProps } from "./VideoControlsToolbar.types";
import styles from "./VideoControlsToolbar.module.scss";
import PlayButton from "@/components/ui/PlayButton/PlayButton";
import Duration from "../Duration/Duration";
import Volumer from "../Volumer/Volumer";
import FullscreenSVG from "@/assets/svgs/fullscreen.svg?react";
import FullscreenExitSVG from "@/assets/svgs/fullscreen-exit.svg?react";
import { videoInfoSlice } from "@/store/slices/videoInfo.slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/redux/redux";

const VideoControlsToolbar: FC<VideoControlsToolbarProps> = ({
  videoElement,
}) => {
  const {played, isPlaying, isFullscreen} = useAppSelector(state => state.videoInfo);
  const dispatch = useDispatch();
  
  const onPlayButtonClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isPlaying) {
      videoElement.pause();
      dispatch(videoInfoSlice.actions.setIsPlaying(false));
    } else {
      videoElement.play();
      dispatch(videoInfoSlice.actions.setIsPlaying(true));
    }
  };
  
  const onFullscreenClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    videoElement.requestFullscreen();
  };
  
  return (
    <div className={styles.body}>
      <div className={styles.group}>
        <div className={styles["play-button-container"]}>
          <PlayButton onClick={onPlayButtonClickHandler} isPlaying={isPlaying} />
        </div>
        <Volumer mediaElement={videoElement} />
        <Duration mediaElement={videoElement} played={played} />
      </div>
      <div className={styles.group}>
        <button onClick={onFullscreenClickHandler} className={styles["full-screen-button"]}>
          {isFullscreen ? <FullscreenExitSVG /> : <FullscreenSVG />}
        </button>
      </div>
    </div>
  );
};

export default VideoControlsToolbar;
