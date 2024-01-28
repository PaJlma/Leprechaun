import { useState } from "react";
import { Theme, UseTheme } from "./useTheme.types";

const defaultTheme = localStorage.getItem("theme") as Theme ?? "light";
localStorage.setItem("theme", defaultTheme);
document.body.setAttribute("data-theme", defaultTheme);

export const useTheme: UseTheme = () => {
  const [ theme, setTheme ] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme)
    document.body.setAttribute("data-theme", newTheme);
  }

  return { theme, toggleTheme };
}
