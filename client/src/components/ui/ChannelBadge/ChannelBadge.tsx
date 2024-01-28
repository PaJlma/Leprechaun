import { FC } from "react";
import { Link } from "react-router-dom";
import { ChannelBadgeProps } from "./ChannelBadge.types";
import styles from "./ChannelBadge.module.scss";

const ChannelBadge: FC<ChannelBadgeProps> = ({ author, ...props }) => {
  return (
    <div {...props} className={styles.body}>
      <Link to={`/channel/${author.login}`}>
        <img src={`http://localhost:5000/users/${author._id}/avatar.jpg`} alt="avatar" className={styles.avatar} />
      </Link>
      <div className={styles.info}>
        <Link to={`/channel/${author.login}`}>
          <h6 className={styles["channel-name"]}>{author?.nick ?? author.login}</h6>
        </Link>
        <p className={styles["subscribers-count"]}>0 подписчиков</p>
      </div>
    </div>
  );
};

export default ChannelBadge;
