import { Theme } from "@mui/material";
import { useMemo } from "react";
import { darkTheme, lightTheme } from "@app/themes";
import { Themes } from "@app/themes/interface";

export const useAppTheme = (themeName: Themes) => {
  return useMemo(() => {
    let theme: Theme = lightTheme;
    switch (themeName) {
      case Themes.DARK: theme = darkTheme; break;
      case Themes.LIGHT: theme = lightTheme; break;
      default: const _: never | undefined = themeName; break;
    }
    
    return theme;
  }, [themeName]);
}
