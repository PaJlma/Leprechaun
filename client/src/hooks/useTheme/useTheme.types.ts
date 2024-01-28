export interface UseThemeReturns {
  theme: Theme;
  toggleTheme: () => void;
}

export type UseTheme = () => UseThemeReturns;

export type Theme = "dark" | "light";
