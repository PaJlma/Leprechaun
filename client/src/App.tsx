import { FC } from "react";
import styles from "./App.module.scss";
import { AppProps } from "./App.types";
import AppRouter from "@/components/AppRouter/AppRouter";

const App: FC<AppProps> = () => {
  return <div className={styles.body}>
    <AppRouter />
  </div>;
};

export default App;
