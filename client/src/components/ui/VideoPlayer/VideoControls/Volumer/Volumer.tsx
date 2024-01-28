import { FC, MouseEventHandler, useEffect, useState } from "react";
import { VolumerProps } from "./Volumer.types";
import styles from "./Volumer.module.scss";
import { getSeekCoefficient } from "@/scripts/getSeekCoefficient";
import LowVolumeSVG from "@/assets/svgs/volume-low.svg?react";
import HighVolumeSVG from "@/assets/svgs/volume-high.svg?react";
import OffVolumeSVG from "@/assets/svgs/volume-off.svg?react";

const Volumer: FC<VolumerProps> = ({ mediaElement }) => {
  const [volume, setVolume] = useState<number>(0);
  const [seekVolumeTo, setSeekVolumeTo] = useState<number>(0);
  const [showSeek, setShowSeek] = useState<boolean>(false);

  useEffect(() => {
    const rememberedVolume = localStorage.getItem("videoVolume") ?? "0.1";
    mediaElement.volume = +rememberedVolume;
    setVolume(+rememberedVolume);
  }, [mediaElement]);

  const onVolumeButtonClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    const rememberedVolume = +(localStorage.getItem("videoVolume") ?? "0.1");

    if (mediaElement.volume === 0) {
      if (rememberedVolume === 0) {
        localStorage.setItem("videoVolume", "0.1");
        mediaElement.volume = 0.1;
        setVolume(mediaElement.volume);
        return;
      }

      mediaElement.volume = rememberedVolume;
      setVolume(mediaElement.volume);
      return;
    }

    mediaElement.volume = 0;
    setVolume(mediaElement.volume);
  };

  const onVolumeLineClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    mediaElement.volume = +getSeekCoefficient(event.pageX, event.currentTarget);
    localStorage.setItem("videoVolume", mediaElement.volume.toString());
    setVolume(mediaElement.volume);
  };

  const onVolumeLineMoveHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    setSeekVolumeTo(getSeekCoefficient(event.pageX, event.currentTarget));
  };

  const onVolumeLineEnterHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    setShowSeek(true);
  };

  const onVolumeLineLeaveHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    setShowSeek(false);
  };

  return (
    <div className={styles.body}>
      <button onClick={onVolumeButtonClickHandler} className={styles["volume-button"]}>
        {volume === 0 ? <OffVolumeSVG /> : volume <= 0.5 ? <LowVolumeSVG /> : <HighVolumeSVG />}
      </button>
      <div
        onClick={onVolumeLineClickHandler}
        onMouseEnter={onVolumeLineEnterHandler}
        onMouseLeave={onVolumeLineLeaveHandler}
        onMouseMove={onVolumeLineMoveHandler}
        className={styles["volume-line"]}
      >
        <div className={styles.volume} style={{ width: `${volume * 100}%` }} />
        <div className={styles["seek-line"]} style={{ width: `${seekVolumeTo * 100}%` }} />
      </div>
      {showSeek ? (
        <p className={styles.percents}>{`${Math.trunc(seekVolumeTo * 100)}%`}</p>
      ) : (
        <p className={styles.percents}>{`${Math.trunc(volume * 100)}%`}</p>
      )}
    </div>
  );
};

export default Volumer;
