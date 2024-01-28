import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface RoundButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode | ReactElement;
}
