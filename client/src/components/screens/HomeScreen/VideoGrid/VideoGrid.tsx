import { FC, ReactElement } from "react";
import { VideoGridProps } from "./VideoGrid.types";
import styles from "./VideoGrid.module.scss";
import VideoRow from "./VideoRow/VideoRow";
import VideoBox from "@/components/ui/VideoBox/VideoBox";

const VideoGrid: FC<VideoGridProps> = ({ videos, perRow }) => {
  const rows: ReactElement[] = [];
  let rowCounter = 0;
  let videosInRow: ReactElement[] = [];
  let videoEdge = perRow;

  for (let i = 0; i < videos.length; i++) {
    videosInRow.push(<VideoBox key={videos[i].video._id} info={videos[i]} />);

    if (i === videoEdge - 1) {
      const row: ReactElement = <VideoRow key={rowCounter}>{videosInRow}</VideoRow>;
      rowCounter++;
      rows.push(row);
      videosInRow = [];
      videoEdge += perRow;
    }

    if (videos.length % perRow !== 0 && i === videos.length - 1) {
      const row: ReactElement = <VideoRow key={rowCounter}>{videosInRow}</VideoRow>;
      rows.push(row);
    }
  }

  return <div className={styles.body}>{rows}</div>;
};

export default VideoGrid;
