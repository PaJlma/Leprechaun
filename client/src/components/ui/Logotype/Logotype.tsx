import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Logotype.module.scss";
import { LogotypeProps } from "./Logotype.types";
import LogotypeSVG from "@/assets/svgs/clover.svg?react";

const Logotype: FC<LogotypeProps> = ({ size = "small", className, ...props }) => {
  return (
    <Link {...props} className={`${styles.body} ${className} ${styles[size]}`} to="/">
      <LogotypeSVG className={styles.logotype} />
      <p className={styles.title}>Leprechaun</p>
    </Link>
  );
};

export default Logotype;
