import { FC, MouseEventHandler, useState } from "react";
import { ProgressLineProps } from "./ProgressLine.types";
import styles from "./ProgressLine.module.scss";
import { getSeekCoefficient } from "@/scripts/getSeekCoefficient";
import { videoDurationToString } from "@/scripts/videoDurationToString";
import { secondsToDuration } from "@/scripts/secondsToDuration";
import { useDispatch } from "react-redux";
import { videoInfoSlice } from "@/store/slices/videoInfo.slice";

const ProgressLine: FC<ProgressLineProps> = ({ mediaElement, played, hasSeekMark }) => {
  const dispatch = useDispatch();
  const [seekTo, setSeekTo] = useState<number>(0);

  const onProgressLineClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    mediaElement.currentTime = mediaElement.duration * getSeekCoefficient(event.pageX, event.currentTarget);
  };

  const onProgressLineMouseDownHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    const progressLine = event.currentTarget;
    document.onmousemove = (event) => {
      mediaElement.pause();
      dispatch(videoInfoSlice.actions.setIsPlaying(false));
      if (event.pageX < progressLine.getBoundingClientRect().left) {
        mediaElement.currentTime = 0;
        setSeekTo(0);
        return;
      } else if (event.pageX > progressLine.getBoundingClientRect().right) {
        mediaElement.currentTime = mediaElement.duration;
        setSeekTo(1);
        return;
      }

      mediaElement.currentTime = mediaElement.duration * getSeekCoefficient(event.pageX, progressLine);
      setSeekTo(getSeekCoefficient(event.pageX, progressLine));
    };

    document.onmouseup = (event) => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (event.pageX > progressLine.getBoundingClientRect().right) {
        return;
      }
      dispatch(videoInfoSlice.actions.setIsPlaying(true));
      mediaElement.play();
    };
  };

  const onProgressLineMoveHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    setSeekTo(getSeekCoefficient(event.pageX, event.currentTarget));
  };

  return (
    <div
      onClick={onProgressLineClickHandler}
      onMouseMove={onProgressLineMoveHandler}
      onMouseDown={onProgressLineMouseDownHandler}
      className={styles.body}
    >
      <div className={styles["progress-line"]}>
        <div className={styles.progress} style={{ width: `${(played / mediaElement.duration) * 100}%` }} />
        <div className={styles["seek-line"]} style={{ width: `${seekTo * 100}%` }} />
        {hasSeekMark && (
          <div className={styles["seek-mark"]} style={{ left: `${seekTo * 100}%` }}>
            {videoDurationToString(secondsToDuration(Math.trunc(mediaElement.duration * seekTo)))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressLine;
