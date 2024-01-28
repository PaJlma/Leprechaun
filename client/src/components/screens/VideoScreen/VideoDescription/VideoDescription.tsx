import { FC } from "react";
import { VideoDescriptionProps } from "./VideoDescription.types";
import styles from "./VideoDescription.module.scss";

const VideoDescription: FC<VideoDescriptionProps> = ({ description, ...props }) => {
  return (
    <div {...props} className={styles.body}>
      <h6 className={styles.title}>Описание</h6>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default VideoDescription;
