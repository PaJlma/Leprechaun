import { FC } from "react";
import { TabletProps } from "./Tablet.types";
import styles from "./Tablet.module.scss";
import { NavLink } from "react-router-dom";

const Tablet: FC<TabletProps> = ({ icon, children, ...props }) => {
  return (
    <NavLink {...props} className={({ isActive }) => (isActive ? styles.active : styles.disabled)}>
      {icon}
      <p className={styles.text}>{children}</p>
    </NavLink>
  );
};

export default Tablet;
