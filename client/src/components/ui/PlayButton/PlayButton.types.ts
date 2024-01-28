import { HTMLAttributes } from "react";

export interface PlayButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isPlaying?: boolean;
}
