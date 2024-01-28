import { HTMLAttributes, MouseEventHandler } from "react";

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  onBurgerMenuClick?: MouseEventHandler<HTMLButtonElement>;
}
