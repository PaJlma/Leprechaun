import PageLayoutWithSlidingSidebar from "@/components/layouts/PageLayoutWithSlidingSidebar/PageLayoutWithSlidingSidebar";
import VideoScreen from "@/components/screens/VideoScreen/VideoScreen";
import { FC } from "react";
import { VideoPageProps } from "./VideoPage.types";

const VideoPage: FC<VideoPageProps> = (props) => {
  return (
    <PageLayoutWithSlidingSidebar>
      <VideoScreen />
    </PageLayoutWithSlidingSidebar>
  );
};

export default VideoPage;
