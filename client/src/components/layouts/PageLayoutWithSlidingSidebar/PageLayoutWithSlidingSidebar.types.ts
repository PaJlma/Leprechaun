import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface PageLayoutWithSlidingSidebarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | ReactElement;
}
