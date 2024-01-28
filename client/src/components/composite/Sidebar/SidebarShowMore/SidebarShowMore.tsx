import { FC } from "react";
import { SidebarShowMoreProps } from "./SidebarShowMore.types";
import styles from "./SidebarShowMore.module.scss";
import ArrowUpSVG from "@/assets/svgs/arrow-up.svg?react";
import ArrowDownSVG from "@/assets/svgs/arrow-down.svg?react";

const SidebarShowMore: FC<SidebarShowMoreProps> = ({ onClick, expanded, ...props }) => {
  return (
    <button {...props} onClick={onClick} className={styles.body}>
      {expanded ? (
        <>
          <ArrowDownSVG />
          <p className={styles.text}>Свернуть</p>
        </>
      ) : (
        <>
          <ArrowUpSVG />
          <p className={styles.text}>Показать всё</p>
        </>
      )}
    </button>
  );
};

export default SidebarShowMore;
