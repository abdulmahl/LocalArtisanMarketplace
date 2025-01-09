declare module "next-themes" {
  import { ReactNode } from "react";

  export interface ThemeProviderProps {
    children: ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    forcedTheme?: string;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;
  export function useTheme(): {
    theme: string;
    setTheme: (theme: string) => void;
    resolvedTheme: string;
    systemTheme: string;
  };
}
