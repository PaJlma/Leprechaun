import { FC } from "react";
import styles from "./SearchInput.module.scss";
import { SearchInputProps } from "./SearchInput.types";
import SearchSVG from "@/assets/svgs/search.svg?react";

const SearchInput: FC<SearchInputProps> = ({
  onSearchButtonClick,
  ...props
}) => {
  return (
    <div className={styles.body}>
      <input type="search" {...props} className={styles["search-input"]} />
      <button onClick={onSearchButtonClick} className={styles["search-button"]}>
        <SearchSVG />
      </button>
    </div>
  );
};

export default SearchInput;
