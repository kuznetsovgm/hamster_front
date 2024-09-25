import { useMediaQuery } from "@mui/material";
import { Themes } from "@app/themes/interface";

export const useDefaultAppThemeName = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return prefersDarkMode ? Themes.DARK : Themes.LIGHT;
}
