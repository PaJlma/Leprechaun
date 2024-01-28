import { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface DefaultPageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | ReactElement;
}
