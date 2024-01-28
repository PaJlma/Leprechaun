import { FC } from "react";
import { VideoInformationProps } from "./VideoInformation.types";
import styles from "./VideoInformation.module.scss";
import VideoToolbar from "../VideoToolbar/VideoToolbar";
import VideoDescription from "../VideoDescription/VideoDescription";

const VideoInformation: FC<VideoInformationProps> = ({ info, ...props }) => {
  return (
    <div {...props} className={styles.body}>
      <h6 className={styles.title}>{info.video.title}</h6>
      <VideoToolbar info={info} />
      {info.video.description && <VideoDescription description={info.video.description} />}
    </div>
  );
};

export default VideoInformation;
