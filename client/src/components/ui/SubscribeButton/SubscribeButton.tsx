import { FC } from "react";
import { SubscribeButtonProps } from "./SubscribeButton.tupes";
import styles from "./SubscribeButton.module.scss";

const SubscribeButton: FC<SubscribeButtonProps> = ({ active, onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick} className={`${styles.body} ${active && styles.active}`}>
      {active ? "Вы подписаны" : "Подписаться"}
    </button>
  );
};

export default SubscribeButton;
