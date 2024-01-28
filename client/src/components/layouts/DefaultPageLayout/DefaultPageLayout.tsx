import { FC, MouseEventHandler, useState } from "react";
import styles from "./DefaultPageLayout.module.scss";
import { DefaultPageLayoutProps } from "./DefaultPageLayout.types";
import Header from "@/components/composite/Header/Header";
import DefaultSidebar from "@/components/composite/Sidebar/DefaultSidebar/DefaultSidebar";

const DefaultPageLayout: FC<DefaultPageLayoutProps> = ({ children, ...props }) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(true);

  const BurgerMenuClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSidebarActive(previous => !previous);
  }
  
  return (
    <div {...props} className={styles.body}>
      <Header onBurgerMenuClick={BurgerMenuClickHandler} />
      <div className={`${styles.content} wrapper`}>
        <div className={styles["sidebar-wrapper"]}>
          <DefaultSidebar active={sidebarActive} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DefaultPageLayout;
