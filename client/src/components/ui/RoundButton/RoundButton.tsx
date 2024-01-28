import { FC } from "react";
import { RoundButtonProps } from "./RoundButton.types";
import styles from "./RoundButton.module.scss";

const RoundButton: FC<RoundButtonProps> = ({ icon, onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick} className={styles.body}>
      {icon}
    </button>
  );
};

export default RoundButton;
