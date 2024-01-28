import { FC } from "react";
import { FogProps } from "./Fog.types";
import styles from "./Fog.module.scss";

const Fog: FC<FogProps> = ({ active, onClick, ...props }) => {
  return <div {...props} onClick={onClick} className={`${styles.body} ${active ? styles.active : ""}`} />;
};

export default Fog;
