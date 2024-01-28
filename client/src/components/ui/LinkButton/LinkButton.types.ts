import { HTMLProps, ReactElement, ReactNode } from "react";
import { LinkProps } from "react-router-dom";

export interface LinkButtonProps extends LinkProps {
  icon?: ReactNode | ReactElement;
  children?: string;
}
