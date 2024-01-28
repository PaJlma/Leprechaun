import { FC } from "react";
import { PlayButtonProps } from "./PlayButton.types";
import styles from "./PlayButton.module.scss";
import PlaySVG from "@/assets/svgs/play.svg?react";
import PauseSVG from "@/assets/svgs/pause.svg?react";

const PlayButton: FC<PlayButtonProps> = ({ isPlaying, ...props }) => {
  return <button {...props} className={styles.body}>{isPlaying ? <PauseSVG /> : <PlaySVG />}</button>;
};

export default PlayButton;
