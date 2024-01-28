import { FC } from "react";
import styles from "./LinkButton.module.scss";
import { LinkButtonProps } from "./LinkButton.types";
import { Link } from "react-router-dom";

const LinkButton: FC<LinkButtonProps> = ({
  children,
  icon,
  to = "/",
  ...props
}) => {
  return (
    <Link {...props} to={to} className={styles.body}>
      {icon}
      {children}
    </Link>
  );
};

export default LinkButton;
