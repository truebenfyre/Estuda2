import { useEffect } from "react";
import type { Theme } from "../lib/types";

export function useTheme(theme: Theme): void {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
}
