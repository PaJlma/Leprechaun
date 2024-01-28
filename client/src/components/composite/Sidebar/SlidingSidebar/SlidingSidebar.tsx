import { FC } from "react";
import { SlidingSidebarProps } from "./SlidingSidebar.types";
import styles from "./SlidingSidebar.module.scss";
import Sidebar from "../Sidebar";
import Logotype from "@/components/ui/Logotype/Logotype";
import RoundButton from "@/components/ui/RoundButton/RoundButton";
import BurgerMenuSVG from "@/assets/svgs/burger-menu.svg?react";

const SlidingSidebar: FC<SlidingSidebarProps> = ({ active, onBurgerMenuClick, ...props }) => {
  return (
    <div {...props} className={`${styles.body} ${active ? styles.active : styles.disabled}`}>
      <div className={styles.header}>
        <RoundButton onClick={onBurgerMenuClick} icon={<BurgerMenuSVG />} />
        <Logotype />
      </div>
      <Sidebar />
    </div>
  );
};

export default SlidingSidebar;
