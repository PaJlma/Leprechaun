import { FC } from "react";
import { MainSidebarGroupProps } from "./MainSidebarGroup.types";
import SidebarGroup from "../../SidebarGroup/SidebarGroup";
import Tablet from "@/components/ui/Tablet/Tablet";
import HomeSVG from "@/assets/svgs/house.svg?react";
import LikesSVG from "@/assets/svgs/like.svg?react";
import HistorySVG from "@/assets/svgs/history.svg?react";

const MainSidebarGroup: FC<MainSidebarGroupProps> = (props) => {
  return (
    <SidebarGroup>
      <Tablet icon={<HomeSVG />} to="/">
        Главная
      </Tablet>
      <Tablet icon={<LikesSVG />} to="/likes">
        Понравившиеся
      </Tablet>
      <Tablet icon={<HistorySVG />} to="/history">
        История
      </Tablet>
    </SidebarGroup>
  );
};

export default MainSidebarGroup;
