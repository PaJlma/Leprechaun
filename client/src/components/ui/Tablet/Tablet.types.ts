import { ReactElement, ReactNode } from "react";
import { NavLinkProps } from "react-router-dom";

export interface TabletProps extends NavLinkProps {
  icon?: ReactNode | ReactElement;
  children?: string;
}
