import { FC } from "react";
import styles from "./Header.module.scss";
import { HeaderProps } from "./Header.types";
import Logotype from "@/components/ui/Logotype/Logotype";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import LinkButton from "@/components/ui/LinkButton/LinkButton";
import AccountSVG from "@/assets/svgs/account.svg?react";
import BurgerMenuSVG from "@/assets/svgs/burger-menu.svg?react";
import RoundButton from "@/components/ui/RoundButton/RoundButton";

const Header: FC<HeaderProps> = ({ onBurgerMenuClick, ...props }) => {
  return (
    <header {...props} className={`${styles.body} wrapper`}>
      <div className={styles.group}>
        <div className={styles["round-button-container"]}>
          <RoundButton onClick={onBurgerMenuClick} icon={<BurgerMenuSVG />} />
        </div>
        <Logotype />
      </div>
      <div className={styles["search-input-container"]}>
        <SearchInput placeholder="Поиск" />
      </div>
      <div className={styles["link-button-container"]}>
        <LinkButton to="/login" icon={<AccountSVG />}>
          Войти
        </LinkButton>
      </div>
    </header>
  );
};

export default Header;
