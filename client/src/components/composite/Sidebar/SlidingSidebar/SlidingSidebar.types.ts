import { HTMLAttributes, MouseEventHandler } from "react";

export interface SlidingSidebarProps extends HTMLAttributes<HTMLDivElement> {
  onBurgerMenuClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
}
