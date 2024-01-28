import { FC, MouseEventHandler, useState } from "react";
import { DurationMode, DurationProps } from "./Duration.types";
import styles from "./Duration.module.scss";
import { videoDurationToString } from "@/scripts/videoDurationToString";
import { secondsToDuration } from "@/scripts/secondsToDuration";

const Duration: FC<DurationProps> = ({ mediaElement, played }) => {
  const [mode, setMode] = useState<DurationMode>((localStorage.getItem("durationMode") as DurationMode) ?? "normal");
  const stringedVideoDuration = videoDurationToString(secondsToDuration(Math.trunc(mediaElement.duration)));

  const onDurationClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    const newMode: DurationMode = mode === "normal" ? "reversed" : "normal";
    setMode(newMode);
    localStorage.setItem("durationMode", newMode);
  };

  return (
    <div onClick={onDurationClickHandler} className={styles.body}>
      {mode === "normal" ? (
        <p className={styles.duration}>
          {`${videoDurationToString(
            secondsToDuration(Math.trunc(mediaElement.currentTime)),
          )} / ${stringedVideoDuration}`}
        </p>
      ) : (
        <p className={styles.duration}>{`-${videoDurationToString(
          secondsToDuration(Math.trunc(-(played - mediaElement.duration))),
        )} / ${stringedVideoDuration}`}</p>
      )}
    </div>
  );
};

export default Duration;
