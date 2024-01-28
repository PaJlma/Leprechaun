import { FC } from "react";
import { VideoBoxProps } from "./VideoBox.types";
import styles from "./VideoBox.module.scss";
import { Link } from "react-router-dom";
import { videoDurationToString } from "@/scripts/videoDurationToString";
import { getTimeAgo } from "@/scripts/getTimeAgo";

const VideoBox: FC<VideoBoxProps> = ({ info, ...props }) => {
  const timeAgo = getTimeAgo(info.video.createdAt);

  return (
    <Link className={styles.body} {...props} to={`video/${info.video._id}`}>
      <div className={styles["preview-container"]}>
        <img
          src={`http://localhost:5000/videos/${info.video._id}/preview.jpg`}
          alt="preview"
          className={styles.preview}
        />
        <p className={styles["video-duration"]}>{videoDurationToString(info.video.duration)}</p>
      </div>
      <div className={styles.content}>
        <object>
          <Link className={styles["link-wrapper"]} to={`channel/${info.author.login}`}>
            <img
              src={`http://localhost:5000/users/${info.author._id}/avatar.jpg`}
              alt="avatar"
              className={styles.avatar}
            />
          </Link>
        </object>
        <div className={styles.info}>
          <h6 className={styles.title}>{info.video.title}</h6>
          <object>
            <Link to={`channel/${info.author.login}`}>
              <p className={styles["channel-name"]}>{info.author.nick ?? info.author.login}</p>
            </Link>
          </object>
          <div className={styles.footer}>
            <p className={styles.footer__text}>0 просмотров</p>
            <div className={styles.circle} />
            <p className={styles.footer__text}>{timeAgo}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoBox;
