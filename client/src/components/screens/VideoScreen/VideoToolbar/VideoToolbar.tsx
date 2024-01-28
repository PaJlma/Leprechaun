import { FC } from "react";
import { VideoToolbarProps } from "./VideoToolbar.types";
import styles from "./VideoToolbar.module.scss";
import ChannelBadge from "@/components/ui/ChannelBadge/ChannelBadge";
import SubscribeButton from "@/components/ui/SubscribeButton/SubscribeButton";

const VideoToolbar: FC<VideoToolbarProps> = ({ info, ...props }) => {
  return (
    <div {...props} className={styles.body}>
      <ChannelBadge author={info.author} />
      <SubscribeButton />
    </div>
  );
};

export default VideoToolbar;
