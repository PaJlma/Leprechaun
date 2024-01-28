import { FC } from "react";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.types";
import Separator from "@/components/ui/Separator/Separator";
import MainSidebarGroup from "./SidebarGroups/MainSidebarGroup/MainSidebarGroup";
import CategoriesSidebarGroup from "./SidebarGroups/CategoriesSidebarGroup/CategoriesSidebarGroup";
import SubscribesSidebarGroup from "./SidebarGroups/SubscribesSidebarGroup/SubscribesSidebarGroup";

const Sidebar: FC<SidebarProps> = ({ ...props }) => {
  const subscribes = {};

  return (
    <aside {...props} className={styles.body}>
      <MainSidebarGroup />

      {Object.keys(subscribes).length !== 0 && (
        <>
          <Separator />
          <SubscribesSidebarGroup />
        </>
      )}
      <Separator />

      <CategoriesSidebarGroup />
    </aside>
  );
};

export default Sidebar;
