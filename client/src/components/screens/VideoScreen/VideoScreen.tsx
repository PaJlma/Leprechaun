import { FC, useEffect, useState } from "react";
import { VideoScreenProps } from "./VideoScreen.types";
import styles from "./VideoScreen.module.scss";
import { useParams } from "react-router-dom";
import { useGetByIdQuery } from "@/store/services/videos.api";
import VideoInformation from "./VideoInformation/VideoInformation";
import VideoPlayer from "@/components/ui/VideoPlayer/VideoPlayer";

const VideoScreen: FC<VideoScreenProps> = ({ ...props }) => {
  const [blobURL, setBlobURL] = useState<string>();
  const { id } = useParams();
  const { data } = useGetByIdQuery(id ?? "");
  const videoURL = `http://localhost:5000/videos/${id}/video.mp4`;

  useEffect(() => {
    fetch(videoURL)
      .then((response) => response.blob())
      .then((blob) => setBlobURL(URL.createObjectURL(blob)));
  }, [videoURL]);

  return (
    <main {...props} className={styles.body}>
      <div className={styles.content}>
        {data ? (
          <>
            <VideoPlayer src={blobURL} duration={data.video.duration} autoPlay />
            <VideoInformation info={data} />
          </>
        ) : (
          "Ошибка"
        )}
      </div>
      <aside className={styles["videos-sidebar"]}></aside>
    </main>
  );
};

export default VideoScreen;
