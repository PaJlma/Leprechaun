import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface VideoRowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | ReactElement;
}
