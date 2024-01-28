import { TSize } from "@/types/sizes.types";
import { LinkProps } from "react-router-dom";

export interface LogotypeProps extends Omit<LinkProps, "to"> {
  size?: Exclude<TSize, "medium">;
}
