import { FC } from "react";
import styles from "./Separator.module.scss";
import { SeparatorProps } from "./Separator.types";

const Separator: FC<SeparatorProps> = ({ ...props }) => {
  return <div {...props} className={styles.body} />;
};

export default Separator;
