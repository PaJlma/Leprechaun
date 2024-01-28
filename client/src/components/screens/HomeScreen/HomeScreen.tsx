import { FC } from "react";
import { HomeScreenProps } from "./HomeScreen.types";
import styles from "./HomeScreen.module.scss";
import { useGetAllQuery } from "@/store/services/videos.api";
import VideoGrid from "./VideoGrid/VideoGrid";

const HomeScreen: FC<HomeScreenProps> = ({ ...props }) => {
  const { data, isError } = useGetAllQuery();

  return (
    <main {...props} className={styles.body}>
      {isError || !data ? (
        "Ошибка"
      ) : (
        <div className={styles["videos-wrapper"]}>
          <VideoGrid perRow={5} videos={data} />
        </div>
      )}
    </main>
  );
};

export default HomeScreen;
