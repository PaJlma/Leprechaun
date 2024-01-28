import { Children, FC, MouseEventHandler, useState } from "react";
import styles from "./SidebarGroup.module.scss";
import { SidebarGroupProps } from "./SidebarGroup.types";
import SidebarShowMore from "../SidebarShowMore/SidebarShowMore";

const SidebarGroup: FC<SidebarGroupProps> = ({ title, children, max, ...props }) => {
  const [expanded, setExpanded] = useState(max === undefined);

  const sidebarShowMoreClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    setExpanded(!expanded);
  };

  return (
    <div {...props} className={styles.body}>
      {title && <h6 className={styles.title}>{title}</h6>}
      <div className={styles.content}>
        {max === undefined || expanded
          ? children
          : Children.map(children, (child, index) => {
              if (index >= max) return;
              return child;
            })}
        {max !== undefined && Children.count(children) > max && (
          <SidebarShowMore expanded={expanded} onClick={sidebarShowMoreClickHandler} />
        )}
      </div>
    </div>
  );
};

export default SidebarGroup;
