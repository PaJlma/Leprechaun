import { FC } from "react";
import styles from "./App.module.scss";
import { AppProps } from "./App.types";

const App: FC<AppProps> = () => {
  return <div className={styles.body}></div>;
};

export default App;
