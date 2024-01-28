import { MouseEventHandler, HTMLProps } from "react";

export interface SearchInputProps extends HTMLProps<HTMLInputElement> {
  onSearchButtonClick?: MouseEventHandler<HTMLButtonElement>
}
