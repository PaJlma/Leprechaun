import { HTMLAttributes, MouseEventHandler } from "react";

export interface FogProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
