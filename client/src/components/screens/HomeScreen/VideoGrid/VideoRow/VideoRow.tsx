import { FC } from "react";
import { VideoRowProps } from "./VideoRow.types";
import styles from "./VideoRow.module.scss";

const VideoRow: FC<VideoRowProps> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

export default VideoRow;
