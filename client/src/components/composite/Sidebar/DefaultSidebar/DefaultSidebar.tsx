import { FC } from "react";
import { DefaultSidebarProps } from "./DefaultSidebar.types";
import styles from "./DefaultSidebar.module.scss";
import Sidebar from "../Sidebar";

const DefaultSidebar: FC<DefaultSidebarProps> = ({ active, ...props }) => {
  return (
    <div {...props} className={active ? styles.active : styles.disabled}>
      <Sidebar />
    </div>
  );
};

export default DefaultSidebar;
