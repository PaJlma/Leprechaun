import { FC, MouseEventHandler, useState } from "react";
import { PageLayoutWithSlidingSidebarProps } from "./PageLayoutWithSlidingSidebar.types";
import styles from "./PageLayoutWithSlidingSidebar.module.scss";
import Header from "@/components/composite/Header/Header";
import SlidingSidebar from "@/components/composite/Sidebar/SlidingSidebar/SlidingSidebar";
import Fog from "@/components/ui/Fog/Fog";

const PageLayoutWithSlidingSidebar: FC<PageLayoutWithSlidingSidebarProps> = ({ children, ...props }) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  const onBurgerMenuClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSidebarActive(previous => !previous);
  }

  const onFogCLickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    setSidebarActive(false);
  }

  return (
    <div {...props} className={styles.body}>
      <Header onBurgerMenuClick={onBurgerMenuClickHandler} />
      <div className={`${styles.content} wrapper`}>
        <SlidingSidebar onBurgerMenuClick={onBurgerMenuClickHandler} active={sidebarActive} />
        {children}
      </div>
      <Fog active={sidebarActive} onClick={onFogCLickHandler} />
    </div>
  );
};

export default PageLayoutWithSlidingSidebar;
