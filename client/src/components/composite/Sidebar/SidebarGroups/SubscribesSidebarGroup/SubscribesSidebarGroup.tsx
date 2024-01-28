import { FC } from "react";
import { SubscribesSidebarGroupProps } from "./SubscribesSidebarGroup.types";
import SidebarGroup from "../../SidebarGroup/SidebarGroup";

const SubscribesSidebarGroup: FC<SubscribesSidebarGroupProps> = (props) => {
  return <SidebarGroup title="Подписки"></SidebarGroup>;
};

export default SubscribesSidebarGroup;
