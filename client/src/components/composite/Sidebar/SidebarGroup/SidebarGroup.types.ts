import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode | ReactElement;
  max?: number;
}
